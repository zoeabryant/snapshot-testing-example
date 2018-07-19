import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

it('renders without crashing', () => {
  const tree = mount(<App />);
  expect(toJson(tree)).toMatchSnapshot();
});


it('renders Apple if user likes Apple and Juice', () => {
    const tree = shallow(<App likesApple likesJuice />);
  expect(toJson(tree)).toMatchSnapshot();
})

it('renders Orange if user likes Juice but not Apple', () => {
    const tree = shallow(<App likesJuice />);
  expect(toJson(tree)).toMatchSnapshot();
})

it('renders Tea if user does not like Juice, even though they like Apple', () => {
    const tree = shallow(<App likesApple likesJuice={false} />);
  expect(toJson(tree)).toMatchSnapshot();
})
