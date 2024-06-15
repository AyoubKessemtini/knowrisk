import { CTextInput } from '@components/CTextInput';
import { Colors } from '@constants/Colors';
import { store } from '@store/index';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

describe('[COMPONENTS]: CTextInput', () => {
  it('renders correctly', () => {
    const tree = render(<CTextInput placeholderText="test" />);

    const pressable = tree.getByRole('button');
    fireEvent.press(pressable);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with label text', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CTextInput labelText="test" />
      </Provider>,
    );
    const labelArea = getByText('test');

    expect(labelArea).toBeTruthy();
  });

  it('renders with right accessory', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CTextInput RightAccessory={() => <Text>test</Text>} />
      </Provider>,
    );
    const rightAccessory = getByText('test');

    expect(rightAccessory).toBeTruthy();
  });

  it('renders with correct disabled color', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <CTextInput placeholderText="test" editable={false} />
      </Provider>,
    );

    const pressable = getByRole('button');
    const input = getByPlaceholderText('test');

    fireEvent.press(pressable);

    expect(input).toHaveStyle({ color: Colors.primaryBlack });
  });
});
