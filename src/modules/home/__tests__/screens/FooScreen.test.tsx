import { FooScreen } from '@modules/home/screens/FooScreen';
import { store } from '@store/index';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

const createTestProps = () => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  route: {},
});

describe('[MODULE: HOME] | FooScreen', () => {
  let props: any;

  beforeEach(() => {
    props = createTestProps();
  });

  it('renders correctly', () => {
    const foo = render(
      <Provider store={store}>
        <FooScreen {...props} />
      </Provider>,
    );
    expect(foo).toMatchSnapshot();
  });
});
