import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Apple from './Apple';

it('renders without crashing', () => {
  const tree = shallow(<Apple />);
  expect(toJson(tree)).toMatchSnapshot();
});
