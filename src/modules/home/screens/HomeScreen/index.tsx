import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { ControlledInput } from '@components/ControlledInput';
import { Screen } from '@components/Screen';
import { Toggle } from '@components/Toggle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCTheme } from '@hooks/useCTheme';
import { FooStackRoutes, RootStackRoutes } from '@navigators/routes';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { useAppDispatch } from '@store/index';
import { LocaleActions } from '@store/localeSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { Languages } from 'src/i18n/types';
import { SheetsTypes } from 'src/lib/sheets';
import { HomeScheme, homeScheme } from './home.scheme';

export const Home = ({
  navigation,
}: TabStackScreenProps<'home'>): JSX.Element => {
  const { isLightTheme, toggleTheme } = useCTheme();
  const dispatch = useAppDispatch();

  const onPressHandler = () => {
    navigation.navigate(RootStackRoutes.FOO_STACK, {
      screen: FooStackRoutes.FOO_SCREEN,
    });
  };

  const { control, handleSubmit } = useForm<HomeScheme>({
    defaultValues: { username: undefined },
    resolver: zodResolver(homeScheme),
  });

  const onSubmit = (formData: HomeScheme) => {
    console.log(formData);
  };

  const handleChangeLocale = (locale: Languages) => {
    dispatch(LocaleActions.setLocale(locale));
  };

  const actionSheetHandler = async () => {
    const callback = await SheetManager.show(SheetsTypes.GOOD_SHEET, {
      payload: { text: 'Wow, text payload' },
    });

    if (callback?.text) {
      return console.log(callback.text);
    }

    if (callback?.shouldNavigate) {
      return navigation.navigate(RootStackRoutes.FOO_STACK, {
        screen: FooStackRoutes.FOO_SCREEN,
      });
    }
  };

  return (
    <Screen withoutBottomEdge containerStyles={styles.container}>
      <CText size="xl_bold" isCentered text="home.foo" />

      <ControlledInput control={control} name="username" />
      <CButton
        buttonType="success"
        text="common.apply"
        onPress={handleSubmit(onSubmit)}
      />
      <CButton
        mt={16}
        buttonType="primary"
        text="common.continue"
        onPress={onPressHandler}
      />
      <CButton
        buttonType="danger"
        text="common.showsheet"
        onPress={actionSheetHandler}
      />

      <CButton
        mt={16}
        buttonType="secondary"
        text="language.english"
        onPress={() => handleChangeLocale(Languages.EN)}
      />
      <CButton
        buttonType="secondary"
        text="language.french"
        onPress={() => handleChangeLocale(Languages.FR)}
      />

      <Toggle activated={isLightTheme} onPressHandler={toggleTheme} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
