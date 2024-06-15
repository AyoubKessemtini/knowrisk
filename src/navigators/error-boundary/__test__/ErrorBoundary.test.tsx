import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Fallback } from '../Fallback';

const mockedError = {
  message: 'Mocked Error Message',
};
const mockedFn = jest.fn();

describe('[ERROR BOUNDARY]', () => {
  it('renders correctly', () => {
    const tree = render(
      <Fallback error={mockedError} resetErrorBoundary={mockedFn} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('on press calls resetErrorBoundary', () => {
    const { getByText } = render(
      <Fallback error={mockedError} resetErrorBoundary={mockedFn} />,
    );

    const button = getByText('PRESS TO RESET');
    fireEvent.press(button);

    expect(mockedFn).toHaveBeenCalled();
  });
});
