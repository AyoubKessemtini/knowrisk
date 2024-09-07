import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Switch, Pressable } from 'react-native';
import { registerScheme, RegisterScheme } from 'src/schemes/register.scheme';
import Icon from 'react-native-vector-icons/Ionicons'; // Example icon library
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';

export const RegisterScreen =
  ({}: OnboardingStackScreenProps<'SignUpScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<RegisterScheme>({
      defaultValues: {
        firstname: 'd',
        lastname: 'd',
        email: 'd@dd.com',
        phoneNumber: '2',
        medicalEntity: '2',
        referenceMedicalAssociationId: '2',
        isHospitalOrClinic: false,
        hospitalClinicName: '',
      },
      resolver: zodResolver(registerScheme),
    });

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
    const [isHospitalOrClinic, setIsHospitalOrClinic] = useState(false);

    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    return (
      <Screen fullscreen containerStyles={styles.container}>
        <CText
          text="onboarding.signup.register_account"
          size="xl_medium"
          color="darkPurple"
        />
        <CText
          text="onboarding.signup.register_account"
          size="lg_medium"
          color="grey3"
        />

        <ControlledInput
          placeholderText="onboarding.signup.first_name"
          control={control}
          name="firstname"
          borderColor={isFocused.firstname ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('firstname')}
          onBlur={() => handleBlur('firstname')}
          RightAccessory={() => (
            <Icon name="person-outline" size={20} color={Colors.deepPurple} />
          )}
        />

        <ControlledInput
          placeholderText="onboarding.signup.last_name"
          control={control}
          name="lastname"
          borderColor={isFocused.lastname ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('lastname')}
          onBlur={() => handleBlur('lastname')}
          RightAccessory={() => (
            <Icon name="person-outline" size={20} color={Colors.deepPurple} />
          )}
        />

        <ControlledInput
          placeholderText="onboarding.signup.email_placeholder"
          control={control}
          name="email"
          borderColor={isFocused.email ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
          RightAccessory={() => (
            <Icon name="mail-outline" size={20} color={Colors.deepPurple} />
          )}
        />

        <ControlledInput
          placeholderText="onboarding.signup.phone_number"
          control={control}
          name="phoneNumber"
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('phoneNumber')}
          onBlur={() => handleBlur('phoneNumber')}
          RightAccessory={() => (
            <Icon name="call-outline" size={20} color={Colors.deepPurple} />
          )}
        />

        <ControlledInput
          placeholderText="onboarding.signup.medical_entity"
          control={control}
          name="medicalEntity"
          borderColor={
            isFocused.medicalEntity ? Colors.deepPurple : Colors.grey1
          }
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('medicalEntity')}
          onBlur={() => handleBlur('medicalEntity')}
          RightAccessory={() => (
            <Icon name="business-outline" size={20} color={Colors.deepPurple} />
          )}
        />

        <ControlledInput
          placeholderText="onboarding.signup.reference_medical_association_id"
          control={control}
          name="referenceMedicalAssociationId"
          borderColor={
            isFocused.referenceMedicalAssociationId
              ? Colors.deepPurple
              : Colors.grey1
          }
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('referenceMedicalAssociationId')}
          onBlur={() => handleBlur('referenceMedicalAssociationId')}
          RightAccessory={() => (
            <Icon name="card-outline" size={20} color={Colors.deepPurple} />
          )}
        />

        <View style={styles.switchContainer}>
          <CText
            text="onboarding.signup.hospital_clinic_name"
            size="lg_medium"
            color="grey3"
          />
          <Switch
            value={isHospitalOrClinic}
            onValueChange={(value) => setIsHospitalOrClinic(value)}
            thumbColor={isHospitalOrClinic ? Colors.deepPurple : Colors.grey1}
            trackColor={{ false: Colors.grey1, true: Colors.lightPurple }}
          />
        </View>

        {isHospitalOrClinic && (
          <ControlledInput
            placeholderText="onboarding.signup.hospital_clinic_name"
            control={control}
            name="hospitalClinicName"
            borderColor={
              isFocused.hospitalClinicName ? Colors.deepPurple : Colors.grey1
            }
            backgroundColor={Colors.lightPink}
            textStyle={{ color: Colors.deepPurple }}
            onFocus={() => handleFocus('hospitalClinicName')}
            onBlur={() => handleBlur('hospitalClinicName')}
            RightAccessory={() => (
              <Icon name="home-outline" size={20} color={Colors.deepPurple} />
            )}
          />
        )}

        <CButton
          mt={50}
          text="common.continue"
          onPress={handleSubmit(() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.INTRO_QUESTION_SCREEN,
            });
          })}
        />
        <CText isCentered size="md">
          <CText
            text="onboarding.signup.already_have_account"
            color="black"
            size="md"
            mb={30}
          />

          <Pressable
            onPress={() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.LOGIN_SCREEN,
              });
            }}
          >
            <CText size="md_bold" color="deepPurple" text="onboarding.login" />
          </Pressable>
          {/* <CText text='onboarding.login' color='deepPurple' size='md'/> */}
        </CText>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingVertical: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
