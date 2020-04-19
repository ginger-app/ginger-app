import React from 'react';
import { shallow } from 'enzyme';
import Icon, { ICON_NAMES, COLORS } from './index';

describe('Icon component', () => {
  it('renders correct icon using `name` prop', () => {
    Object.keys(ICON_NAMES).forEach(iconName => {
      const wrapper = shallow(<Icon name={iconName} />);
      expect(wrapper.find('svg').length).toBe(1);
      expect(wrapper.find('svg').prop('data-test')).toBe(iconName);
    });
  });

  it('renders correct icon color using `color` prop', () => {
    Object.keys(COLORS).forEach(color => {
      const wrapper = shallow(
        <Icon name={Object.keys(ICON_NAMES)[0]} color={color} />,
      );

      const pathFirst = wrapper.find('path').at(0);
      const pathSecond = wrapper.find('path').at(1);

      const hasCorrectColor =
        pathFirst.prop('fill') === COLORS[color] ||
        pathFirst.prop('stroke') === COLORS[color] ||
        pathSecond.prop('fill') === COLORS[color] ||
        pathSecond.prop('stroke') === COLORS[color];

      expect(hasCorrectColor).toBe(true);
    });
  });
});
