### Snapshot testing example

The basic concept of snapshot tests is that you save a 'snapshot' of what a component looks like, and then compare future iterations of the component against the snapshot. If you make a change you want to keep, you update the snapshot. A snapshot, in this example, is a DOM rendering of a react component:

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders without crashing 1`] = `
<h2>
  Have Orange Juice!
</h2>
`;
```

Snapshot tests are cheap. They can be created quickly with `expect(myComponent).toMatchSnapshot()`, and easily updated in the jest test runner by pressing `u`. The snapshot files are committed and reviewed as part of your standard git pull request process.

Gone are the days where you need to write and maintain multiple lines of expectations to ensure that the right bit of text ended up in the right place.


### Explore this repository

* run the test suite with `yarn test` to see the snapshot tests

* run tests with `yarn test -- --watch` to see all the options that jest test runner gives you

* try adding a snapshot test for the `Tea` component

* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

* uses Jest and Enzyme to run and write snapshot tests

### Handy Resources

* [Blog post: Snapshot testing React Components with Jest](https://hackernoon.com/snapshot-testing-react-components-with-jest-744a1e980366)

* [Jest's official documentation on Snapshot testing](https://jestjs.io/docs/en/snapshot-testing)

* [Enzyme's shallow rendering API](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md)


### Questions my team asked

#### Is it better to snapshot test an entire Page component or each and every component?
both, but use enzyme's _shallow_ rendering.

`shallow` means you only make a DOM render one level deep, so any child react components are not rendered. It look like this:

```
<div
  className="App-intro"
>
  <Tea />
</div>
```

`mount` means you render the DOM fully, so all child components are rendered, like so:

```
<div
  className="App-intro"
>
  <Tea>
    <h2>
      Have Tea!
    </h2>
  </Tea>
</div>
```

If you decided to change `Have Tea!` to something else, it would affect not only the snapshot tests for `Tea` component, but for any components that `Tea` happens to render in. This quickly becomes a nightmare if you have many many levels of child components, you change something insignificant and then have that change noticed by loads of tests. If you have tests for each component, when you test the parent component, you can _trust_ that each child renders as expected.

#### How do snapshot tests work with redux?
You can export and test the component directly, and give the props that `connect` would provide to it. For example:

```
// component

export const Tea = ({ getUserPreference }) => (
  <h2>Have Tea!</h2>
);

export default connect({
  drinkPreference: selectors.getDrinkPreferences()
}, {
  changeUserPreference: actions.requestChangeUserPreference
})(Tea);

```


```
// Snapshot
import { Tea } from './Tea'; // this is importing the `Tea` component directly, not redux connect(Tea)

it('renders without crashing', () => {
  const tree = shallow(
    <Tea
      drinkPreference='Tea' // usually given by mapStateToProps
      changeUserPreference={jest.fn()} // usually given by mapDispatchToProps
    />
  );
  expect(toJson(tree)).toMatchSnapshot();
});

```

This means you don't need to stub out `connect`, `selectors.getDrinkPreferences` and `actions.requestChangeUserPreference`. Less stubs = less headaches tbh. You should add additional unit tests for these functions directly.


#### How do I test user interactions, e.g. things that appear onClick?
Enzyme has an API that allows you to interact with the rendered component, so you can write a test like so:

```
it('Renders the right thing when clicked', () => {
  const initialState = shallow(<MyComponent />);
  expect(toJson(initialState)).toMatchSnapshot();
  const clickedState = initialState.find(button).simulate('click');
  expect(toJson(clickedState)).toMatchSnapshot();
});

```

#### Do we need to change our mocha/chai/whatever test setup to jest now?
No, although jest has [very good tools to help you migrate](https://jestjs.io/docs/en/migration-guide) if you want to. On our team we now have our snapshot tests setup as a separate `npm run test:snapshot` which is run alongside `npm run test` in our precommit hook. We can decide later on if we want to migrate over to jest.
