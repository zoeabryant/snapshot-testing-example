import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer'; // renderer used in the react docs, not packaged with React or Jest
import App from './App';

it('renders without crashing', () => {
  const tree = TestRenderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders Apple if user likes Apple and Juice', () => {
    const tree = TestRenderer.create(
    <App likesApple likesJuice />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders Orange if user likes Juice but not Apple', () => {
    const tree = TestRenderer.create(
    <App likesJuice />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders Tea if user does not like Juice, even though they like Apple', () => {
    const tree = TestRenderer.create(
    <App likesApple likesJuice={false} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
