import React from 'react';
import { render } from '@testing-library/react-native';
import { Screen } from '@components/Screen';
import { TestIDs } from '@constants/TestIDs';

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn().mockReturnValue(50),
}));

describe('[COMPONENTS]: Screen', () => {
  it('renders correctly', () => {
    const tree = render(<Screen />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('correctly sets default edges', () => {
    const { getByTestId } = render(<Screen />);
    const safeAreaView = getByTestId(TestIDs.tests.Screen.SafeAreaView);
    const edges = {
      bottom: 'additive',
      left: 'off',
      right: 'off',
      top: 'additive',
    };

    expect(safeAreaView.props.edges).toEqual(edges);
  });

  it('correctly sets edges with fullscreen', () => {
    const { getByTestId } = render(<Screen fullscreen />);
    const safeAreaView = getByTestId(TestIDs.tests.Screen.SafeAreaView);
    const edges = {
      bottom: 'off',
      left: 'off',
      right: 'off',
      top: 'off',
    };

    expect(safeAreaView.props.edges).toEqual(edges);
  });

  it('correctly sets edges with withoutTopEdge', () => {
    const { getByTestId } = render(<Screen withoutTopEdge />);
    const safeAreaView = getByTestId(TestIDs.tests.Screen.SafeAreaView);
    const edges = {
      bottom: 'additive',
      left: 'off',
      right: 'off',
      top: 'off',
    };

    expect(safeAreaView.props.edges).toEqual(edges);
  });

  it('correctly sets edges with withoutBottomEdge', () => {
    const { getByTestId } = render(<Screen withoutBottomEdge />);
    const safeAreaView = getByTestId(TestIDs.tests.Screen.SafeAreaView);
    const edges = {
      bottom: 'off',
      left: 'off',
      right: 'off',
      top: 'additive',
    };

    expect(safeAreaView.props.edges).toEqual(edges);
  });

  it('correctly handles default padding', () => {
    const { getByTestId } = render(<Screen />);
    const AnimatedView = getByTestId(TestIDs.tests.Screen.AnimatedView);

    expect(AnimatedView).toHaveStyle({ paddingHorizontal: 24 });
  });

  it('correctly handles padding with noHorizontalPadding', () => {
    const { getByTestId } = render(<Screen noHorizontalPadding />);
    const AnimatedView = getByTestId(TestIDs.tests.Screen.AnimatedView);

    expect(AnimatedView).toHaveStyle({ paddingHorizontal: 0 });
  });
});
