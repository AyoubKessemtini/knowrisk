import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Toggle } from '@components/Toggle';

describe('[COMPONENTS]: Toggle', () => {
  const mockOnPressHandler = jest.fn();

  it('renders correctly', () => {
    const tree = render(
      <Toggle activated={false} onPressHandler={mockOnPressHandler} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with active state', () => {
    const tree = render(
      <Toggle activated={true} onPressHandler={mockOnPressHandler} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPressHandler when pressed', () => {
    const { getByRole } = render(
      <Toggle activated={false} onPressHandler={mockOnPressHandler} />,
    );
    const button = getByRole('togglebutton');
    fireEvent.press(button);
    expect(mockOnPressHandler).toHaveBeenCalled();
  });
});
