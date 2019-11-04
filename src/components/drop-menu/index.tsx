import * as React from 'react';
import {
  Animated,
  Easing,
  findNodeHandle,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';

import { dropMenu } from '../../_styles/themes/default.components';
import { screenH, screenW } from '../../_styles/themes/device';
import { innerScaleSize } from '../../_styles/themes/responsive';
import guid from '../../_utils/guid';
import MDIcon from '../icon/index';
import MDRadioList from '../radio-list/index';
import RootView from '../root-view';

import { IMDOptionSet } from '../types';

export interface IMDDropMenuProps {
  isShow?: boolean;
  style?: ViewStyle;
  data?: DropMenuData[];
  alignCenter?: boolean; // item内容是否居中  todo 默认为true
  defaultValue?: boolean[] | number[] | string[]; // 默认值，如[1],[1,2]
  optionRender?: (listItem: IMDOptionSet) => React.ReactNode; // 自定义item项
  /**
   * 数据变化时通知用户
   * @param dropMenuData 菜单项的所有数据
   * @param selectOption 选中项的数据
   */
  onChange?: (dropMenuData: DropMenuData, selectOption: IMDOptionSet) => void;
  onShow?: () => void; // 展开时通知用户
  onHide?: () => void; // 收起时通知用户
}

// 单个DropMenu对象
export interface DropMenuData {
  text: string; // 下拉列表Menu的文案
  options: IMDOptionSet[]; // 下拉列表数据
  disabled?: boolean; // 下拉列表Menu是否可用
  selectedOption?: IMDOptionSet;
}

// 状态
interface IMDDropMenuState {
  isShow: boolean; // true表示展示  false表示隐藏
  dropMenuIndex: number; // 最近展示/使用的dropMenu的索引
  values?: boolean[] | number[] | string[];
  contentTop: number; // 内容区的Top坐标
}

// 样式
interface IMDDropMenuStyle {
  // style?: StyleProp<ViewStyle>|undefined;
  // dropMenu文案和图片的组合样式
  dropMenuStyle: ViewStyle;
  dropMenuTextStyle: ViewStyle | TextStyle;
  radioListContentShowStyle: ViewStyle;
  radioListContentHideStyle: ViewStyle;
  radioListShowStyle: ViewStyle;
  radioListHideStyle: ViewStyle;
  disableStyle: ViewStyle;
  checkedOrSelectedStyle: TextStyle;
}

// 样式实现
export const MDDropMenuStyles: IMDDropMenuStyle = {
  // scrollView内容样式
  radioListContentShowStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
  },

  radioListContentHideStyle: {
    display: 'none',
  },

  // 列表显示
  radioListShowStyle: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    zIndex: 99,
    borderWidth: 0,
    position: 'absolute',
  },

  // 列表隐藏
  radioListHideStyle: {
    display: 'none',
  },

  dropMenuStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: innerScaleSize(20),
    flexDirection: 'row',
    zIndex: 99,
  },

  dropMenuTextStyle: {
    fontSize: dropMenu.fontSize,
    fontWeight: dropMenu.fontWeight,
    color: dropMenu.normalColor,
    textAlign: 'center',
    padding: innerScaleSize(10),
  },
  // disable时的样式
  disableStyle: {
    opacity: 0.3,
  },
  // 选中或checked时的样式
  checkedOrSelectedStyle: {
    // todo 改名 highLightColor
    color: dropMenu.highLightColor,
  },
};

const styles = StyleSheet.create<IMDDropMenuStyle>(MDDropMenuStyles);

export default class MDDropMenu extends React.Component<
  IMDDropMenuProps,
  IMDDropMenuState
> {
  constructor (props: IMDDropMenuProps) {
    super(props);
    if (!props.data) {
      // todo throw err
      throw new Error('data not empty!');
    }
    // styles.style = props.style;
    // 默认的dropMenu的索引
    const dropMenuIndex = 0;

    this.animValues = props.data!.map((index) => {
      const value = new Animated.Value(0);
      // todo 需要移除Listener
      value.addListener((state) => {
        if (state.value === 0) {
          if (this.state.isShow) {
            this.setState({
              isShow: false,
            });
          }
          if (this.isApp()) {
            this.removeContentLayout();
          }
        }
      });
      return value;
    });
    this.state = {
      isShow: props.isShow ? props.isShow : false,
      dropMenuIndex,
      values: props.defaultValue ? props.defaultValue : [],
      contentTop: 0,
    };
    // 展开动画
    this.expandAnim = this.animValues.map((animValue) => {
      return Animated.timing(animValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
      });
    });
    this.unExpandAnim = this.animValues.map((animValue) => {
      return Animated.timing(animValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
      });
    });

    if (props.defaultValue) {
      for (let i = 0; i < props.defaultValue.length; i++) {
        this.changeValue(props.defaultValue[i], i);
      }
    }
  }
  // 动画值
  private animValues: Animated.Value[];
  // 展开动画
  private expandAnim: Animated.CompositeAnimation[];
  // 收起动画
  private unExpandAnim: Animated.CompositeAnimation[];

  // dropMenu引用
  private dropMenuLayoutRef: any = null;
  // 菜单的总宽度
  private dropMenusLayoutWidth: number = 0;
  // 菜单距离左边的距离
  private dropMenusLayoutLeft: number = 0;
  public render () {
    // todo
    if (!this.props.data) {
      return null;
    }
    // data是DropMenusData
    const { data, style } = this.props;

    // menu数据集合数组
    const dropMenuDataArray = data!;
    // dropMenu集合
    const dropMenus = this.dropMenus(dropMenuDataArray);
    if (this.isApp()) {
      return (
        /*
         *****重要！重要！重要！
         onLayout={this.onLayoutDropMenuLayout.bind(this)}
         这里的this.onLayoutDropMenuLayout 虽然是空实现，但是如果去掉的话，
         在toggle时调用UIManange.measure测量不出来这个View的尺寸，返回值会成为undefined
        */
        <View
          ref={(e) => (this.dropMenuLayoutRef = e)}
          style={[{ flexDirection: 'row' }, style]}
          onLayout={this.onLayoutDropMenuLayout.bind(this)}
        >
          {dropMenus}
        </View>
      );
    } else {
      // 定义DropMenuView
      return (
        /*
         *****重要！重要！重要！
         onLayout={this.onLayoutDropMenuLayout.bind(this)}
         这里的this.onLayoutDropMenuLayout 虽然是空实现，但是如果去掉的话，
         在toggle时调用UIManange.measure测量不出来这个View的尺寸，返回值会成为undefined
        */
        <View style={[{ flexDirection: 'column', zIndex: 99 }, style]}>
          <View
            ref={(e) => (this.dropMenuLayoutRef = e)}
            style={{ flexDirection: 'row' }}
            onLayout={this.onLayoutDropMenuLayout.bind(this)}
          >
            {dropMenus}
          </View>
          {this.webExpandContentLayout(
            dropMenuDataArray[this.state.dropMenuIndex!],
            this.state.isShow,
            this.state.contentTop,
            this.state.dropMenuIndex!
          )}
        </View>
      );
    }
  }

  public componentWillUnmount () {
    this.hide(this.state.dropMenuIndex!);
    this.animValues.forEach((value) => {
      value.removeAllListeners();
    });
    if (this.isApp()) {
      this.removeContentLayout();
    }
  }

  /**
   * 获取某菜单项选中值
   * @param index 要获取的菜单索;引，返回的内容:
   * @returns @see IMDOptionSet
   */
  public getSelectedValue (index: number) {
    if (!this.props.data) {
      return undefined;
    }
    if (index >= 0 && index < this.props.data!.length) {
      return this.props.data![index].selectedOption;
    } else {
      return undefined;
    }
  }
  /**
   * 获值
   * @return IMDOptionSet[]
   */
  public getSelectedValues () {
    const selecteValues = new Array();
    if (this.props.data) {
      const dropMenuDataArr = this.props.data;
      dropMenuDataArr.forEach((dropMenuData) => {
        if (dropMenuData.selectedOption) {
          selecteValues.push(dropMenuData.selectedOption);
        }
      });
      return selecteValues.length === 0 ? undefined : selecteValues;
    } else {
      return undefined;
    }
  }

  /**
   * 当某个DropMenu点击时，触发
   * @param clicked;Index 点击的dropMenu的索引
   */
  private onAppToggle (clickedIndex: number) {
    if (!this.props.data) {
      return;
    }
    const curIndex = this.state.isShow ? this.state.dropMenuIndex : clickedIndex;
    const isShow = !this.state.isShow;

    const handle = findNodeHandle(this.dropMenuLayoutRef);
    UIManager.measureInWindow(handle!, (x, y, width, height) => {
      this.onMeasuredInApp(x, y, width, height, curIndex, isShow);
    });
  }

  private onMeasuredInApp (
    x: number,
    y: number,
    width: number,
    height: number,
    curIndex: number,
    isShow: boolean
  ) {
    const contentLayout = this.appExpandContentLayout(
      this.props.data![curIndex!],
      isShow,
      y + height,
      curIndex!
    );
    this.setState({
      dropMenuIndex: curIndex ? curIndex : 0,
      contentTop: y + height,
      isShow,
    });
    this.addContentLayout(contentLayout);
    if (isShow) {
      this.show(curIndex!);
    } else {
      this.hide(curIndex!);
    }
  }
  /**
   * 当某个DropMenu点击时，触发
   * @param clickedIndex 点击的dropMenu的索引
   */
  private onWebToggle (clickedIndex: number) {
    const curIndex = this.state.isShow ? this.state.dropMenuIndex : clickedIndex;
    const isShow = !this.state.isShow;
    const handle = findNodeHandle(this.dropMenuLayoutRef);
    UIManager.measureInWindow(handle!, (x, y, width, height) => {
      this.onMeasuredInWeb(x, y, width, height, curIndex, isShow);
    });
  }
  private onMeasuredInWeb (
    x: number,
    y: number,
    width: number,
    height: number,
    curIndex: number,
    isShow: boolean
  ) {
    this.setState({
      dropMenuIndex: curIndex ? curIndex : 0,
      contentTop: height,
      isShow,
    });
    if (isShow) {
      this.show(curIndex!);
    } else {
      this.hide(curIndex!);
    }
  }
  private addContentLayout (contentLayout: any) {
    RootView.add(contentLayout);
  }

  private removeContentLayout () {
    // todo 只remove自己
    RootView.removeAll();
  }

  // 定义DropMenu集合
  private dropMenus (dropMenuDataArray: DropMenuData[]) {
    return dropMenuDataArray!.map(
      (dropMenuData: DropMenuData, index: number) => {
        return (
          <TouchableHighlight
            key={index}
            style={[
              { borderWidth: 0, flexGrow: 1 },
              dropMenuData.disabled ? styles.disableStyle : {},
            ]}
            activeOpacity={1}
            underlayColor='#FFF'
            onPress={() => {
              if (!dropMenuData.disabled) {
                if (this.isApp()) {
                  this.onAppToggle(index);
                } else {
                  this.onWebToggle(index);
                }
              }
            }}
          >
            <View style={styles.dropMenuStyle}>
              <Text
                style={[
                  styles.dropMenuTextStyle,
                  dropMenuData.selectedOption ||
                  (this.state.isShow && index === this.state.dropMenuIndex)
                    ? styles.checkedOrSelectedStyle
                    : {},
                ]}
              >
                {dropMenuData.selectedOption
                  ? dropMenuData.selectedOption.label
                  : dropMenuData.text}
              </Text>
              <Animated.View
                key={index}
                style={{
                  transform: [
                    {
                      rotateZ: this.animValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}
              >
                <MDIcon name='arrow-down' color='black' />
              </Animated.View>
            </View>
          </TouchableHighlight>
        );
      }
    );
  }

  /**
   * 重要！重要！重要！不可删除
   * onLayout={this.onLayoutDropMenuLayout.bind(this)}
   * 这里的this.onLayoutDropMenuLayout 虽然是空实现，但是如果去掉的话，
   * 在toggle时调用UIManange.measure测量不出来相关View的尺寸，返回值会成为undefined
   * @param event
   */
  private onLayoutDropMenuLayout (event: any) {
    setTimeout(() => {
      this.measureWidthAndLeft();
    }, 1000);
  }
  /**
   * 测量下拉列表的左侧和宽度
   */
  private measureWidthAndLeft () {
    this.dropMenuLayoutRef.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        console.log('pageX=', pageX);
        this.dropMenusLayoutWidth = width;
        this.dropMenusLayoutLeft = pageX;
      }
    );
  }
  /**
   * 点击DropMenu时，展开的View
   * @param currentDropMenuData zh
   * @param styles
   * @param isShow true展开  false收起
   * @param contentTop top所处于屏幕的y坐标
   * @param dropMenuIndex 点击的是哪个DropMenu,索引从0开始
   */
  private appExpandContentLayout (
    currentDropMenuData: DropMenuData,
    isShow: boolean,
    contentTop: number,
    dropMenuIndex: number
  ) {
    return (
      <ScrollView
        onTouchEnd={() => {
          if (this.state.isShow) {
            this.hide(this.state.dropMenuIndex!);
          }
        }}
        key={'content_layout_key' + guid()}
        style={[
          isShow ? styles.radioListShowStyle : styles.radioListHideStyle,
          {
            top: contentTop,
            backgroundColor: 'rgba(0,0,0,0.2)',
            flexDirection: 'column',
          },
          {
            height: screenH - contentTop,
            width: this.dropMenusLayoutWidth,
            left: this.dropMenusLayoutLeft,
          },
        ]}
        contentContainerStyle={
          isShow
            ? styles.radioListContentShowStyle
            : styles.radioListContentHideStyle
        }
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: this.animValues[dropMenuIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-screenH + contentTop, 0], // 0 : 150, 0.5 : 75, 1 : 0
                  }),
                },
              ],
            },
            { backgroundColor: '#FFF' },
          ]}
        >
          <MDRadioList
            options={currentDropMenuData.options}
            defaultValue={this.state.values![dropMenuIndex]}
            onChange={(value, index) => {
              this.onChange(value, index);
            }}
            alignCenter={this.props.alignCenter}
            optionRender={this.props.optionRender}
          />
        </Animated.View>
      </ScrollView>
    );
  }

  /**
   * 点击DropMenu时，展开的View
   * @param currentDropMenuData zh
   * @param styles
   * @param isShow true展开  false收起
   * @param contentTop top所处于屏幕的y坐标
   * @param dropMenuIndex 点击的是哪个DropMenu,索引从0开始
   */
  private webExpandContentLayout (
    currentDropMenuData: DropMenuData,
    isShow: boolean,
    contentTop: number,
    dropMenuIndex: number
  ) {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={'rgba(0,0,0,0.2)'}
        onPress={() => {
          if (this.state.isShow) {
            this.hide(this.state.dropMenuIndex!);
          }
        }}
        key={'content_layout_key' + guid()}
        style={[
          isShow ? styles.radioListShowStyle : styles.radioListHideStyle,
          {
            top: contentTop,
            backgroundColor: 'rgba(0,0,0,0.2)',
            flexDirection: 'column',
          },
          { height: screenH - contentTop },
        ]}
      >
        <ScrollView
          contentContainerStyle={
            isShow
              ? styles.radioListContentShowStyle
              : styles.radioListContentHideStyle
          }
        >
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: this.animValues[dropMenuIndex].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-screenH + contentTop, 0], // 0 : 150, 0.5 ;: 75, 1 : 0
                    }),
                  },
                ],
              },
              { backgroundColor: '#FFF' },
            ]}
          >
            <MDRadioList
              options={currentDropMenuData.options}
              onChange={(value, index) => {
                this.onChange(value, index);
              }}
              alignCenter={this.props.alignCenter}
              defaultValue={this.state.values![dropMenuIndex]}
              optionRender={this.props.optionRender}
            />
          </Animated.View>
        </ScrollView>
      </TouchableHighlight>
    );
  }
  /**
   * 展开内容区
   * @param index dropMenu 的索引，以0开始
   */
  private show (index: number) {
    if (!index) {
      index = this.state.dropMenuIndex!;
    }
    this.startExpandAnim(index);
    if (this.props.onShow) {
      this.props.onShow();
    }
  }
  /**
   * 收起内容区
   * @param index dropMenu 的索引，以0开始
   */
  private hide (index: number) {
    if (!index) {
      index = this.state.dropMenuIndex!;
    }
    this.startUnexpandAnim(index);
    if (this.props.onHide) {
      this.props.onHide();
    }
  }
  /**
   * @@param value 选中项的值
   * @param optionIndex 选中项的index
   */
  private onChange (
    value: boolean | string | number,
    optionIndex: number
  ): void {
    const mergeResult = this.mergeValueToState(
      value,
      this.props.data![this.state.dropMenuIndex!].options
    );
    if (mergeResult != null && mergeResult.selectedOption != null) {
      this.props.data![this.state.dropMenuIndex!] = Object.assign(
        {},
        { ...this.props.data![this.state.dropMenuIndex!] },
        { selectedOption: mergeResult.selectedOption }
      );
    }
    // const mergeResult = this.changeValue(value, index);
    if (this.state.isShow && !this.isApp()) {
      this.hide(this.state.dropMenuIndex!);
    }
    //  通知用户
    if (
      this.props.onChange &&
      mergeResult != null &&
      mergeResult.selectedOption != null
    ) {
      this.props.onChange(
        this.props.data![this.state.dropMenuIndex!],
        mergeResult.selectedOption
      );
    }
    this.setState((preState) => {
      const { values } = preState;
      // defaultValue![this.state.index!] = vallet
      values![this.state.dropMenuIndex!] = value;
      return {
        values,
      };
    });
  }
  /**
   *
   * @param value 选中项的值
   * @param menuIndex 菜单的序号
   */
  private changeValue (value: boolean | string | number, menuIndex: number) {
    const mergeResult = this.mergeValueToState(
      value,
      this.props.data![menuIndex].options
    );
    if (mergeResult != null && mergeResult.selectedOption != null) {
      this.props.data![menuIndex] = Object.assign(
        {},
        { ...this.props.data![menuIndex] },
        { selectedOption: mergeResult.selectedOption }
      );
    } else {
      this.props.data![menuIndex] = Object.assign(
        {},
        { ...this.props.data![menuIndex] },
        { selectedOption: null }
      );
    }
    if (this.state.isShow && !this.isApp()) {
      this.hide(menuIndex);
    }
    //  通知用户
    if (
      this.props.onChange &&
      mergeResult != null &&
      mergeResult.selectedOption != null
    ) {
      this.props.onChange(
        this.props.data![menuIndex],
        mergeResult.selectedOption
      );
    }
    return mergeResult;
  }
  /**
   * 开始展开动画
   */
  private startExpandAnim (index: number) {
    this.expandAnim[index].start();
  }
  /**;
   * 开始收起动画
   */
  private startUnexpandAnim (index: number) {
    this.unExpandAnim[index].start();
  }

  /**
   * 设置选择项的check 状态
   * @param value 选中项的值
   * @param optionIndex 选中项的索引
   * @param options 选择数据的集合
   */
  private mergeValueToState (
    value: boolean | number | string,
    options: IMDOptionSet[]
  ): { options: IMDOptionSet[]; selectedOption?: IMDOptionSet } {
    let matchOption: IMDOptionSet | undefined;
    const items = options.map((option, iteratorIndex) => {
      if (value === option.value) {
        matchOption = Object.assign({}, { ...option }, { checked: true });
        return matchOption;
      }
      return Object.assign({}, { ...option }, { checked: false });
    });
    return {
      options: items,
      selectedOption: matchOption,
    };
  }

  /**
   * return true表示在app中，否则在web中
   */
  private isApp () {
    return Platform.OS === 'ios' || Platform.OS === 'android';
  }
}
