import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDSwiperItem from '../../swiper-item/index';
import MDSwiper from '../swiper';

configure({ adapter: new Adapter() });

jest.useRealTimers();

const colors = [
  {
    color: '#4390EE',
    text: '给时光以生命，给岁月以文明。',
  },
  {
    color: '#364d79',
    text: '你的无畏来源于无知。',
  },
  {
    color: '#CA4040',
    text: '一切都将逝去，只有死神永生。',
  },
];

it('renders correctly with defaults', () => {
  const items = colors.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text>{item.text}</Text>
      </MDSwiperItem>
    );
  });

  const component = renderer.create(
    <MDSwiper width={300} height={200}>
      {items}
    </MDSwiper>
  );
  expect(component.toJSON()).toMatchSnapshot();
  component.unmount(); // call unmount to stop timer
});

it('renders correctly with one item', () => {
  const component = renderer.create(
    <MDSwiper width={300} height={200}>
      <MDSwiperItem>
        <Text>Blank</Text>
      </MDSwiperItem>
    </MDSwiper>
  );
  expect(component.toJSON()).toMatchSnapshot();
  component.unmount(); // call unmount to stop timer
});

it('renders correctly with empty children', () => {
  const component = renderer
    .create(<MDSwiper width={300} height={200} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with Vertical mode', () => {
  const items = colors.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text>{item.text}</Text>
      </MDSwiperItem>
    );
  });

  const component = renderer.create(
    <MDSwiper
      transition='slideY'
      width={300}
      height={200}
      autoplay={0}
      defaultIndex={2}
      hasDots={false}
      isLoop={false}
      dragable={false}
    >
      {items}
    </MDSwiper>
  );
  expect(component.toJSON()).toMatchSnapshot();
  component.unmount(); // call unmount to stop timer
});

it('renders correctly with Fade mode', () => {
  const items = colors.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text>{item.text}</Text>
      </MDSwiperItem>
    );
  });

  const component = renderer.create(
    <MDSwiper transition='slideY' width={300} height={200}>
      {items}
    </MDSwiper>
  );
  expect(component.toJSON()).toMatchSnapshot();
  component.unmount(); // call unmount to stop timer
});

it('test autoplay', async () => {
  const mockBeforeCallBack = jest.fn();
  const mockAfterCallBack = jest.fn();
  const items = colors.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text>{item.text}</Text>
      </MDSwiperItem>
    );
  });

  const component = shallow(
    <MDSwiper
      width={300}
      height={200}
      autoplay={1000}
      onBeforeChange={mockBeforeCallBack}
      onAfterChange={mockAfterCallBack}
    >
      {items}
    </MDSwiper>
  );

  const calls: any = await new Promise((resolve) =>
    setTimeout(() => {
      const instance: any = component.instance();
      instance.stop();
      // onMomentumScrollEnd not be called in jest
      // so onAfterChange not be emitted
      resolve(mockBeforeCallBack.mock.calls.length === 3);
    }, 4000)
  );

  expect(calls).toEqual(true);
});

it('test autoplay with Fade mode', async () => {
  const mockBeforeCallBack = jest.fn();
  const mockAfterCallBack = jest.fn();
  const items = colors.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text>{item.text}</Text>
      </MDSwiperItem>
    );
  });

  const component = shallow(
    <MDSwiper
      width={300}
      height={200}
      autoplay={1000}
      transition='fade'
      onBeforeChange={mockBeforeCallBack}
      onAfterChange={mockAfterCallBack}
    >
      {items}
    </MDSwiper>
  );
  const calls: any = await new Promise((resolve) =>
    setTimeout(() => {
      console.log(mockBeforeCallBack.mock.calls);
      console.log(mockAfterCallBack.mock.calls);
      const instance: any = component.instance();
      instance.stop();
      resolve(
        mockBeforeCallBack.mock.calls.length === 3 &&
          mockAfterCallBack.mock.calls.length === 3
      );
    }, 4000)
  );

  expect(calls).toEqual(true);
});

it('test public method', () => {
  const items = colors.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text>{item.text}</Text>
      </MDSwiperItem>
    );
  });

  const component = shallow(
    <MDSwiper width={300} height={200} autoplay={0}>
      {items}
    </MDSwiper>
  );

  const instance: any = component.instance();
  expect(instance.state.index).toEqual(1); // real item index
  instance.next();
  expect(instance.state.index).toEqual(2); // real item index
  instance.next();
  expect(instance.state.index).toEqual(3); // real item index
  instance.next();
  expect(instance.state.index).toEqual(4); // real item index
  instance.next();
  expect(instance.state.index).toEqual(1); // real item index

  instance.prev();
  expect(instance.state.index).toEqual(0); // real item index
  instance.prev();
  expect(instance.state.index).toEqual(4); // real item index
  instance.prev();
  expect(instance.state.index).toEqual(3); // real item index
  instance.prev();
  expect(instance.state.index).toEqual(2); // real item index
  instance.prev();
  expect(instance.state.index).toEqual(1); // real item index

  instance.goto(2);
  expect(instance.state.index).toEqual(3); // real item index
  instance.goto(4);
  expect(instance.state.index).toEqual(3); // real item index
  instance.goto('a');
  expect(instance.state.index).toEqual(3); // real item index
  instance.goto(-2);
  expect(instance.state.index).toEqual(3); // real item index

  expect(instance.getIndex()).toEqual(2); // original item index

  instance.stop();
  expect(instance.state.timer).toEqual(null);
  instance.play(300);
  expect(instance.state.timer).toEqual(null);
  instance.play(5000);
  expect(instance.state.autoplay).toEqual(5000);
  instance.stop();
});
