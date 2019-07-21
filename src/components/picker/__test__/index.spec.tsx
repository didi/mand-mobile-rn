import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import MDPicker from '../index';

configure({ adapter: new Adapter() });
beforeEach(() => {
  jest.useFakeTimers();
});

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDPicker
        data={Sample}
        cols={1}
        isView={true}
        pickerHeight={200}
        pickerWidth={350}
        defaultIndex={[0]}
        invalidIndex={[[4, 2, 3]]}
        onChange={(columnIndex: number, itemIndex: number, value: any) => {}}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with not icon', () => {
  const component = renderer
    .create(
      <MDPicker
        data={Sample}
        cols={3}
        isView={true}
        isCascade={true}
        pickerHeight={200}
        pickerWidth={350}
        itemHeight={40}
        invalidIndex={[[1], [3], [3]]}
        // defaultIndex={[1, 0, 1]}
        defaultValue={['北京', '北京', '朝阳区']}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with tab', () => {
  const component = renderer
    .create(
      <MDPicker
        data={Sample}
        cols={3}
        isView={false}
        isCascade={true}
        pickerHeight={200}
        pickerWidth={350}
        itemHeight={40}
        defaultIndex={[1, 0, 1]}
        title='选择省市区/县'
        onConfirm={(activeValues: any) => {
          // this.updateText(activeValues);
        }}
        onCancel={() => {}}
        onShow={() => {}}
        onHide={() => {}}
        isVisible={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with tab action', () => {
  const mockFn = jest.fn(() => {
    console.log('------aaa----fn(1)');
  });
  const component = shallow(
    <MDPicker
      data={Sample}
      cols={3}
      isView={false}
      isCascade={true}
      pickerHeight={200}
      pickerWidth={350}
      itemHeight={40}
      defaultIndex={[1, 0, 1]}
      title='选择省市区/县'
      onConfirm={mockFn}
      onCancel={mockFn}
      onShow={mockFn}
      onHide={mockFn}
      isVisible={true}
    />
  );
  // component.setProps({ isVisible: false });
  // component.setProps({ isVisible: true });
  const titleBar = component.find('MDPopupTitleBar');
  const barComponent = titleBar.shallow();
  barComponent.find('TouchableWithoutFeedback').forEach((btn: any) => {
    btn.simulate('press');
  });

  expect(mockFn).toBeCalledTimes(2);
  // expect(mockFn).toHaveBeenCalled();
});

it('renders correctly with not icon', () => {
  const mockFn = jest.fn(() => {
    console.log('------aaa----fn(2)');
  });
  const component = renderer.create(
    <MDPicker
      ref={(e) => {
        // @ts-ignore
        this._picker = e;
      }}
      data={Sample}
      cols={3}
      isView={true}
      isCascade={true}
      pickerHeight={200}
      pickerWidth={350}
      itemHeight={40}
      invalidIndex={[[1], [3], [3]]}
      defaultIndex={[1, 0, 1]}
      // defaultValue={['北京', '北京', '朝阳区']}
    />
  );
  // @ts-ignore
  const picker = this._picker;
  expect(picker.getCurIndexs().length).toBe(3);
  expect(picker.getCurValues().length).toBe(3);
  expect(picker.getColumnValue(1).label).toBe('北海市');
  expect(picker.getColumnValues().length).toBe(3);
  expect(picker.getColumnIndex(1)).toBe(0);
  expect(picker.getColumnIndexs().length).toBe(3);
  picker.setColumnValues(
    1,
    [{ text: 'aa' }, { text: 'bb' }, { text: 'cc' }],
    mockFn
  );
  expect(mockFn).toBeCalled();
  picker.refresh(mockFn);
  expect(mockFn).toBeCalledTimes(2);
});

const Sample = [
  [
    {
      value: '110000',
      label: '北京',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            {
              value: '110114',
              label: '昌平区',
              children: [],
            },
            {
              value: '110105',
              label: '朝阳区',
              children: [],
            },
            {
              value: '110103',
              label: '崇文区',
              children: [],
            },
            {
              value: '110115',
              label: '大兴区',
              children: [],
            },
            {
              value: '110101',
              label: '东城区',
              children: [],
            },
            {
              value: '110111',
              label: '房山区',
              children: [],
            },
            {
              value: '110106',
              label: '丰台区',
              children: [],
            },
            {
              value: '110108',
              label: '海淀区',
              children: [],
            },
            {
              value: '110116',
              label: '怀柔区',
              children: [],
            },
            {
              value: '110109',
              label: '门头沟区',
              children: [],
            },
            {
              value: '110228',
              label: '密云县',
              children: [],
            },
            {
              value: '110117',
              label: '平谷区',
              children: [],
            },
            {
              value: '110230',
              label: '其它区',
              children: [],
            },
            {
              value: '110107',
              label: '石景山区',
              children: [],
            },
            {
              value: '110113',
              label: '顺义区',
              children: [],
            },
            {
              value: '110112',
              label: '通州区',
              children: [],
            },
            {
              value: '110102',
              label: '西城区',
              children: [],
            },
            {
              value: '110104',
              label: '宣武区',
              children: [],
            },
            {
              value: '110229',
              label: '延庆县',
              children: [],
            },
          ],
        },
      ],
    },
    {
      value: '450000',
      label: '广西壮族自治区',
      children: [
        {
          value: '450500',
          label: '北海市',
          children: [
            {
              value: '450502',
              label: '海城区',
              children: [],
            },
            {
              value: '450521',
              label: '合浦县',
              children: [],
            },
            {
              value: '450522',
              label: '其它区',
              children: [],
            },
            {
              value: '450512',
              label: '铁山港区',
              children: [],
            },
            {
              value: '450503',
              label: '银海区',
              children: [],
            },
          ],
        },
        {
          value: '451000',
          label: '百色市',
          children: [
            {
              value: '451024',
              label: '德保县',
              children: [],
            },
            {
              value: '451025',
              label: '靖西县',
              children: [],
            },
            {
              value: '451028',
              label: '乐业县',
              children: [],
            },
            {
              value: '451027',
              label: '凌云县',
              children: [],
            },
            {
              value: '451031',
              label: '隆林各族自治县',
              children: [],
            },
            {
              value: '451026',
              label: '那坡县',
              children: [],
            },
            {
              value: '451023',
              label: '平果县',
              children: [],
            },
            {
              value: '451032',
              label: '其它区',
              children: [],
            },
            {
              value: '451022',
              label: '田东县',
              children: [],
            },
            {
              value: '451029',
              label: '田林县',
              children: [],
            },
            {
              value: '451021',
              label: '田阳县',
              children: [],
            },
            {
              value: '451030',
              label: '西林县',
              children: [],
            },
            {
              value: '451002',
              label: '右江区',
              children: [],
            },
          ],
        },
        {
          value: '451400',
          label: '崇左市',
          children: [
            {
              value: '451424',
              label: '大新县',
              children: [],
            },
            {
              value: '451421',
              label: '扶绥县',
              children: [],
            },
            {
              value: '451402',
              label: '江州区',
              children: [],
            },
            {
              value: '451423',
              label: '龙州县',
              children: [],
            },
            {
              value: '451422',
              label: '宁明县',
              children: [],
            },
            {
              value: '451481',
              label: '凭祥市',
              children: [],
            },
            {
              value: '451482',
              label: '其它区',
              children: [],
            },
            {
              value: '451425',
              label: '天等县',
              children: [],
            },
          ],
        },
        {
          value: '450600',
          label: '防城港市',
          children: [
            {
              value: '450681',
              label: '东兴市',
              children: [],
            },
            {
              value: '450603',
              label: '防城区',
              children: [],
            },
            {
              value: '450602',
              label: '港口区',
              children: [],
            },
            {
              value: '450682',
              label: '其它区',
              children: [],
            },
            {
              value: '450621',
              label: '上思县',
              children: [],
            },
          ],
        },
        {
          value: '450800',
          label: '贵港市',
          children: [
            {
              value: '450802',
              label: '港北区',
              children: [],
            },
            {
              value: '450803',
              label: '港南区',
              children: [],
            },
            {
              value: '450881',
              label: '桂平市',
              children: [],
            },
            {
              value: '450821',
              label: '平南县',
              children: [],
            },
            {
              value: '450882',
              label: '其它区',
              children: [],
            },
            {
              value: '450804',
              label: '覃塘区',
              children: [],
            },
          ],
        },
        {
          value: '450300',
          label: '桂林市',
          children: [
            {
              value: '450303',
              label: '叠彩区',
              children: [],
            },
            {
              value: '450332',
              label: '恭城瑶族自治县',
              children: [],
            },
            {
              value: '450327',
              label: '灌阳县',
              children: [],
            },
            {
              value: '450331',
              label: '荔浦县',
              children: [],
            },
            {
              value: '450322',
              label: '临桂区',
              children: [],
            },
            {
              value: '450323',
              label: '灵川县',
              children: [],
            },
            {
              value: '450328',
              label: '龙胜各族自治县',
              children: [],
            },
            {
              value: '450330',
              label: '平乐县',
              children: [],
            },
            {
              value: '450333',
              label: '其它区',
              children: [],
            },
            {
              value: '450305',
              label: '七星区',
              children: [],
            },
            {
              value: '450324',
              label: '全州县',
              children: [],
            },
            {
              value: '450304',
              label: '象山区',
              children: [],
            },
            {
              value: '450325',
              label: '兴安县',
              children: [],
            },
            {
              value: '450302',
              label: '秀峰区',
              children: [],
            },
            {
              value: '450311',
              label: '雁山区',
              children: [],
            },
            {
              value: '450321',
              label: '阳朔县',
              children: [],
            },
            {
              value: '450326',
              label: '永福县',
              children: [],
            },
            {
              value: '450329',
              label: '资源县',
              children: [],
            },
          ],
        },
        {
          value: '451200',
          label: '河池市',
          children: [
            {
              value: '451227',
              label: '巴马瑶族自治县',
              children: [],
            },
            {
              value: '451229',
              label: '大化瑶族自治县',
              children: [],
            },
            {
              value: '451224',
              label: '东兰县',
              children: [],
            },
            {
              value: '451228',
              label: '都安瑶族自治县',
              children: [],
            },
            {
              value: '451223',
              label: '凤山县',
              children: [],
            },
            {
              value: '451226',
              label: '环江毛南族自治县',
              children: [],
            },
            {
              value: '451202',
              label: '金城江区',
              children: [],
            },
            {
              value: '451225',
              label: '罗城仫佬族自治县',
              children: [],
            },
            {
              value: '451221',
              label: '南丹县',
              children: [],
            },
            {
              value: '451282',
              label: '其它区',
              children: [],
            },
            {
              value: '451222',
              label: '天峨县',
              children: [],
            },
            {
              value: '451281',
              label: '宜州市',
              children: [],
            },
          ],
        },
        {
          value: '451100',
          label: '贺州市',
          children: [
            {
              value: '451102',
              label: '八步区',
              children: [],
            },
            {
              value: '451123',
              label: '富川瑶族自治县',
              children: [],
            },
            {
              value: '451119',
              label: '平桂管理区',
              children: [],
            },
            {
              value: '451124',
              label: '其它区',
              children: [],
            },
            {
              value: '451121',
              label: '昭平县',
              children: [],
            },
            {
              value: '451122',
              label: '钟山县',
              children: [],
            },
          ],
        },
        {
          value: '451300',
          label: '来宾市',
          children: [
            {
              value: '451381',
              label: '合山市',
              children: [],
            },
            {
              value: '451324',
              label: '金秀瑶族自治县',
              children: [],
            },
            {
              value: '451382',
              label: '其它区',
              children: [],
            },
            {
              value: '451323',
              label: '武宣县',
              children: [],
            },
            {
              value: '451322',
              label: '象州县',
              children: [],
            },
            {
              value: '451321',
              label: '忻城县',
              children: [],
            },
            {
              value: '451302',
              label: '兴宾区',
              children: [],
            },
          ],
        },
        {
          value: '450200',
          label: '柳州市',
          children: [
            {
              value: '450202',
              label: '城中区',
              children: [],
            },
            {
              value: '450205',
              label: '柳北区',
              children: [],
            },
            {
              value: '450222',
              label: '柳城县',
              children: [],
            },
            {
              value: '450221',
              label: '柳江县',
              children: [],
            },
            {
              value: '450204',
              label: '柳南区',
              children: [],
            },
            {
              value: '450223',
              label: '鹿寨县',
              children: [],
            },
            {
              value: '450227',
              label: '其它区',
              children: [],
            },
            {
              value: '450224',
              label: '融安县',
              children: [],
            },
            {
              value: '450225',
              label: '融水苗族自治县',
              children: [],
            },
            {
              value: '450226',
              label: '三江侗族自治县',
              children: [],
            },
            {
              value: '450203',
              label: '鱼峰区',
              children: [],
            },
          ],
        },
        {
          value: '450100',
          label: '南宁市',
          children: [
            {
              value: '450126',
              label: '宾阳县',
              children: [],
            },
            {
              value: '450127',
              label: '横县',
              children: [],
            },
            {
              value: '450105',
              label: '江南区',
              children: [],
            },
            {
              value: '450108',
              label: '良庆区',
              children: [],
            },
            {
              value: '450123',
              label: '隆安县',
              children: [],
            },
            {
              value: '450124',
              label: '马山县',
              children: [],
            },
            {
              value: '450128',
              label: '其它区',
              children: [],
            },
            {
              value: '450103',
              label: '青秀区',
              children: [],
            },
            {
              value: '450125',
              label: '上林县',
              children: [],
            },
            {
              value: '450122',
              label: '武鸣区',
              children: [],
            },
            {
              value: '450107',
              label: '西乡塘区',
              children: [],
            },
            {
              value: '450102',
              label: '兴宁区',
              children: [],
            },
            {
              value: '450109',
              label: '邕宁区',
              children: [],
            },
          ],
        },
        {
          value: '450700',
          label: '钦州市',
          children: [
            {
              value: '450721',
              label: '灵山县',
              children: [],
            },
            {
              value: '450722',
              label: '浦北县',
              children: [],
            },
            {
              value: '450723',
              label: '其它区',
              children: [],
            },
            {
              value: '450703',
              label: '钦北区',
              children: [],
            },
            {
              value: '450702',
              label: '钦南区',
              children: [],
            },
          ],
        },
        {
          value: '450400',
          label: '梧州市',
          children: [
            {
              value: '450421',
              label: '苍梧县',
              children: [],
            },
            {
              value: '450481',
              label: '岑溪市',
              children: [],
            },
            {
              value: '450405',
              label: '长洲区',
              children: [],
            },
            {
              value: '450404',
              label: '蝶山区',
              children: [],
            },
            {
              value: '450406',
              label: '龙圩区',
              children: [],
            },
            {
              value: '450423',
              label: '蒙山县',
              children: [],
            },
            {
              value: '450482',
              label: '其它区',
              children: [],
            },
            {
              value: '450422',
              label: '藤县',
              children: [],
            },
            {
              value: '450403',
              label: '万秀区',
              children: [],
            },
          ],
        },
        {
          value: '450900',
          label: '玉林市',
          children: [
            {
              value: '450981',
              label: '北流市',
              children: [],
            },
            {
              value: '450923',
              label: '博白县',
              children: [],
            },
            {
              value: '450903',
              label: '福绵区',
              children: [],
            },
            {
              value: '450922',
              label: '陆川县',
              children: [],
            },
            {
              value: '450982',
              label: '其它区',
              children: [],
            },
            {
              value: '450921',
              label: '容县',
              children: [],
            },
            {
              value: '450924',
              label: '兴业县',
              children: [],
            },
            {
              value: '450902',
              label: '玉州区',
              children: [],
            },
          ],
        },
      ],
    },
  ],
];
