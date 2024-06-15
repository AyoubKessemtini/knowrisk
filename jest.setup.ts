import '@testing-library/react-native/extend-expect';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import 'react-native-gesture-handler/jestSetup';
import '__mocks__/svgMock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn(),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  };
});

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@hooks/useAutoScroll', () => ({
  useAutoScroll: () => ({
    scrollEnabled: true,
    onContentSizeChange: jest.fn(),
    onLayoutChange: jest.fn(),
  }),
}));
