import { Separator } from '@components/Separator';
import { Colors } from '@constants/Colors';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('[COMPONENTS]: Separator', () => {
  it('renders correctly', () => {
    const tree = render(<Separator size={10} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly as a vertical separator', () => {
    const { getByTestId } = render(
      <Separator size={10} depth={3} direction="vertical" />,
    );
    const button = getByTestId('separator');
    expect(button.props.style).toEqual({
      backgroundColor: Colors.primaryBlack,
      height: 10,
      width: 3,
    });
  });
  it('renders correctly as a horizontal separator', () => {
    const customColor = Colors.primaryBlack;

    const { getByTestId } = render(
      <Separator
        size={8}
        depth={2}
        color={customColor}
        direction="horizontal"
      />,
    );
    const button = getByTestId('separator');
    expect(button.props.style).toEqual({
      backgroundColor: customColor,
      height: 2,
      width: 8,
    });
  });
});
