import { BaseActionSheet } from '@components/Sheets/BaseActionSheet';
import * as ThemeHook from '@hooks/useCTheme';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

describe('[COMPONENTS]: BaseActionSheet', () => {
  it('renders correctly with light theme', () => {
    const tree = render(
      <BaseActionSheet sheetId="1">
        <Text>MockedText</Text>
      </BaseActionSheet>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with dark theme', () => {
    jest.spyOn(ThemeHook, 'useCTheme').mockImplementation(() => ({
      isLightTheme: false,
      toggleTheme: () => null,
    }));

    const tree = render(
      <BaseActionSheet sheetId="1">
        <Text>MockedText</Text>
      </BaseActionSheet>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
