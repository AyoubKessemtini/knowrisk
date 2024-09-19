import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import {
  editProfileScheme,
  EditProfileScheme,
} from '../../../../schemes/editProfile.scheme.ts';
import { BirthDateSelector } from '@components/DatePicker/BirthdayDatePicker';
import { DropdownSelector } from '@components/Dropdowns/DropdownSelector';
import { PhoneNumberInput } from '@components/Inputs/PhoneNumberInput';
import { I18nKeyPath } from '../../../../i18n/types';
import { Header } from '@components/Headers/Header';

export const EditProfileScreen =
  ({}: RootStackScreenProps<'EditProfileScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date()); //fetch profile birthday
    const { control, handleSubmit } = useForm<EditProfileScheme>({
      defaultValues: {
        firstname: '',
        lastname: '',
        birthDate: '',
        email: '',
        sex: '',
        country: '',
        phoneNumber: '',
      },
      resolver: zodResolver(editProfileScheme),
    });
    const countryCodes = ['+33', '+370', '+44', '+91', '+61'];
    const sexOptions: I18nKeyPath[] = [
      'profile.genders.male',
      'profile.genders.female',
      'profile.genders.other',
    ];

    const countryOptions: I18nKeyPath[] = [
      'profile.countries.fr',
      'profile.countries.lt',
    ];

    const handleSelect = (option: string) => {
      console.log('Selected option:', option);
    };

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    const handleDateChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };

    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <Header
          hasBackButton
          text="profile.edit_profile"
          backgroundColor={Colors.lightPurple}
        />
        <View style={styles.line}></View>
        <View style={styles.container}>
          <CText
            mt={10}
            color="grey3"
            size="sm_medium"
            text="onboarding.signup.first_name"
          />
          <ControlledInput
            control={control}
            name="firstname"
            verticalPadding={10}
            borderColor={isFocused.firstname ? Colors.deepPurple : Colors.grey1}
            backgroundColor={Colors.white}
            textStyle={{
              color: Colors.black,
              fontWeight: 'normal',
              fontSize: 14,
            }}
            onFocus={() => handleFocus('firstname')}
            onBlur={() => handleBlur('firstname')}
            RightAccessory={() => (
              <Icon name="person-outline" size={21} color={Colors.deepPurple} />
            )}
          />
          <CText
            color="grey3"
            size="sm_medium"
            mt={10}
            text="onboarding.signup.last_name"
          />

          <ControlledInput
            placeholderText="onboarding.signup.last_name"
            control={control}
            name="lastname"
            verticalPadding={10}
            borderColor={isFocused.lastname ? Colors.deepPurple : Colors.grey1}
            backgroundColor={Colors.white}
            textStyle={{
              color: Colors.black,
              fontWeight: 'normal',
              fontSize: 14,
            }}
            onFocus={() => handleFocus('lastname')}
            onBlur={() => handleBlur('lastname')}
            RightAccessory={() => (
              <Icon name="person-outline" size={21} color={Colors.deepPurple} />
            )}
          />

          <CText
            color="grey3"
            size="sm_medium"
            mt={10}
            text="onboarding.signup.birth_date"
          />
          <BirthDateSelector
            initialDate={selectedDate}
            onDateChange={handleDateChange}
          />

          <CText color="grey3" size="sm_medium" mt={10} text="common.mail" />
          <ControlledInput
            control={control}
            name="email"
            verticalPadding={10}
            borderColor={isFocused.email ? Colors.deepPurple : Colors.grey1}
            backgroundColor={Colors.white}
            textStyle={{
              color: Colors.black,
              fontWeight: 'normal',
              fontSize: 14,
            }}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            RightAccessory={() => (
              <Icon name="mail-outline" size={21} color={Colors.deepPurple} />
            )}
          />

          <CText
            color="grey3"
            size="sm_medium"
            mt={10}
            text="onboarding.signup.sex"
          />
          <DropdownSelector options={sexOptions} onSelect={handleSelect} />
          <CText
            color="grey3"
            size="sm_medium"
            mt={10}
            text="onboarding.signup.country"
          />
          <DropdownSelector options={countryOptions} onSelect={handleSelect} />

          <CText
            color="grey3"
            size="sm_medium"
            mt={10}
            text="onboarding.signup.phone_number"
          />
          <View style={{ zIndex: 1000 }}>
            <PhoneNumberInput
              control={control}
              name="phoneNumber"
              options={countryCodes}
              verticalPadding={10}
              borderColor={Colors.grey1}
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => console.log('Input Focused')}
              onBlur={() => console.log('Input Blurred')}
            />
          </View>

          <CButton
            mt={25}
            style={{ zIndex: 1 }}
            text="profile.save_changes"
            textSize="md_medium"
            onPress={handleSubmit(() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.INTRO_QUESTION_SCREEN,
              });
            })}
          />
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderColor: Colors.fog,
  },
});
