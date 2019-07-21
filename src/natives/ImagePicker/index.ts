import { Dimensions, NativeModules } from 'react-native';

const { MDImagePicker } = NativeModules;

interface IMDImagePickerOptions {
  /**
   * 每行图片数
   */
  imageSpanCount?: number;
  /**
   * 最大选择图片数
   */
  imageCount?: number;
  /**
   * 显示 GIF 图片
   */
  showGif?: boolean;
  /**
   * 显示拍照按钮
   */
  showCamera?: boolean;
  /**
   * 是否裁剪
   */
  cropEnable?: boolean;
  /**
   * 裁剪比例宽度
   */
  cropWidth?: number;
  /**
   * 裁剪比例高度
   */
  cropHeight?: number;
  /**
   * 图片质量 0-100
   */
  cropQuality?: number;
  /**
   * 返回base64编码
   */
  enableBase64?: boolean;
  /**
   * 移除已选图片
   */
  removeSelected?: boolean;
}
const width: number = Dimensions.get('window').width;
const DefaultImagePickerOptions: IMDImagePickerOptions = {
  imageSpanCount: 4,
  imageCount: 6,
  showCamera: false,
  cropEnable: false,
  cropWidth: width * 0.6,
  cropHeight: width * 0.6,
  showGif: false,
  cropQuality: 90,
  enableBase64: false,
  removeSelected: true,
};
interface IMDImage {
  width?: number;
  height?: number;
  uri?: string;
  base64?: string;
}
export default class ImagePicker {
  public static showImagePicker (
    options: IMDImagePickerOptions,
    successCallback: (imageList: IMDImage[]) => void,
    errorCallback: (e: string[]) => void
  ) {
    const o = {
      ...DefaultImagePickerOptions,
      ...options,
    };
    MDImagePicker.showImagePicker(o, successCallback, errorCallback);
  }

  public static asyncShowImagePicker (
    options: IMDImagePickerOptions
  ): Promise<IMDImage[]> {
    const o = {
      ...DefaultImagePickerOptions,
      ...options,
    };
    return MDImagePicker.asyncShowImagePicker(o);
  }

  public static openCamera (
    options: IMDImagePickerOptions,
    successCallback: (imageList: IMDImage[]) => void,
    errorCallback: (e: string[]) => void
  ) {
    const o = {
      ...DefaultImagePickerOptions,
      ...options,
    };
    MDImagePicker.openCamera(o, successCallback, errorCallback);
  }

  public static asyncOpenCamera (
    options: IMDImagePickerOptions
  ): Promise<IMDImage[]> {
    const o = {
      ...DefaultImagePickerOptions,
      ...options,
    };
    return MDImagePicker.asyncOpenCamera(o);
  }

  public static removeImage (index: number) {
    MDImagePicker.removeImage(index);
  }

  public static removeAll () {
    MDImagePicker.removeAll();
  }

  public static previewImage (index: number, showTitle: boolean) {
    MDImagePicker.previewImage(index, showTitle);
  }
  public static previewImageList (
    imageList: string[],
    index: number,
    showTitle: boolean
  ) {
    MDImagePicker.previewImageList(imageList, index, showTitle);
  }
}
