import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { RootStackScreenProps } from '../../../../navigators/stacks/RootNavigator';
import {
  changePasswordScheme,
  ChangePasswordScheme,
} from '../../../../schemes/password.scheme';

import { ProfileHeader } from '../../../../components/Headers/ProfileHeader';

export const ChangePasswordScreen =
  ({}: RootStackScreenProps<'ChangePasswordScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<ChangePasswordScheme>({
      defaultValues: {
        newPassword: '',
        confirmPassword: '',
      },
      resolver: zodResolver(changePasswordScheme),
    });
    const [isSecureEnabled] = useState(true);

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <ProfileHeader
          hasBackButton
          text="profile.change_password"
          backgroundColor={Colors.magnolia}
        />
        <View style={styles.line}></View>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <ControlledInput
              control={control}
              secureTextEntry={isSecureEnabled}
              placeholderText="onboarding.password"
              placeholderColor={Colors.black}
              name="password"
              borderColor={
                isFocused.firstname ? Colors.deepPurple : Colors.grey1
              }
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              RightAccessory={() => (
                <AntDesign name="lock1" size={21} color={Colors.deepPurple} />
              )}
            />
            <ControlledInput
              control={control}
              secureTextEntry={isSecureEnabled}
              placeholderText="profile.new_password"
              placeholderColor={Colors.black}
              name="newPassword"
              borderColor={
                isFocused.firstname ? Colors.deepPurple : Colors.grey1
              }
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => handleFocus('newPassword')}
              onBlur={() => handleBlur('newPassword')}
              RightAccessory={() => (
                <AntDesign name="lock1" size={21} color={Colors.deepPurple} />
              )}
            />
            <ControlledInput
              control={control}
              secureTextEntry={isSecureEnabled}
              placeholderText="profile.confirm_password"
              placeholderColor={Colors.black}
              name="confirmPassword"
              borderColor={
                isFocused.firstname ? Colors.deepPurple : Colors.grey1
              }
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              RightAccessory={() => (
                <AntDesign name="lock1" size={21} color={Colors.deepPurple} />
              )}
            />

            <CButton
              mt={12}
              text="profile.save_changes"
              textSize="md_medium"
              onPress={handleSubmit(() => {
                navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                  screen: OnboardingStackRoutes.INTRO_QUESTION_SCREEN,
                });
              })}
            />
          </View>
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    gap: 15,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderColor: Colors.fog,
  },
});
