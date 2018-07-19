import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Orange from './Orange';

it('renders without crashing', () => {
  const tree = shallow(<Orange />);
  expect(toJson(tree)).toMatchSnapshot();
});
