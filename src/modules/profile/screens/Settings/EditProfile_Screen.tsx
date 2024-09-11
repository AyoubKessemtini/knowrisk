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
import Icon from 'react-native-vector-icons/Ionicons'; // Example icon library
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { BackButton } from '@components/BackButton';
import { RootStackScreenProps } from '../../../../navigators/stacks/RootNavigator';
import {
  editProfileScheme,
  EditProfileScheme,
} from '../../../../schemes/editProfile.scheme.ts';
import { DateSelector } from '@components/DatePicker/BirthdayDatePicker';

export const EditProfileScreen =
  ({}: RootStackScreenProps<'EditProfileScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
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
      <Screen fullscreen containerStyles={styles.container}>
        <View style={{ width: 35 }}>
          <BackButton />
        </View>
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
        <DateSelector
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
        <ControlledInput
          control={control}
          name="sex"
          verticalPadding={10}
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.white}
          textStyle={{
            color: Colors.black,
            fontWeight: 'normal',
            fontSize: 14,
          }}
          onFocus={() => handleFocus('sex')}
          onBlur={() => handleBlur('sex')}
          RightAccessory={() => (
            <Icon name="call-outline" size={21} color={Colors.deepPurple} />
          )}
        />

        <CText
          color="grey3"
          size="sm_medium"
          mt={10}
          text="onboarding.signup.country"
        />
        <ControlledInput
          control={control}
          name="country"
          verticalPadding={10}
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.white}
          textStyle={{
            color: Colors.black,
            fontWeight: 'normal',
            fontSize: 14,
          }}
          onFocus={() => handleFocus('country')}
          onBlur={() => handleBlur('country')}
          RightAccessory={() => (
            <Icon name="call-outline" size={21} color={Colors.deepPurple} />
          )}
        />
        <CText
          color="grey3"
          size="sm_medium"
          mt={10}
          text="onboarding.signup.phone_number"
        />
        <ControlledInput
          control={control}
          name="phoneNumber"
          verticalPadding={10}
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.white}
          textStyle={{
            color: Colors.black,
            fontWeight: 'normal',
            fontSize: 14,
          }}
          onFocus={() => handleFocus('phoneNumber')}
          onBlur={() => handleBlur('phoneNumber')}
          RightAccessory={() => (
            <Icon name="call-outline" size={21} color={Colors.deepPurple} />
          )}
        />

        <CButton
          mt={25}
          text="profile.save_changes"
          textSize="md_medium"
          onPress={handleSubmit(() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.INTRO_QUESTION_SCREEN,
            });
          })}
        />
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingVertical: 50,
  },
});
