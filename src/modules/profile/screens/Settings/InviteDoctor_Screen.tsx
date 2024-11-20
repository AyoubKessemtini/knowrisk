import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { Colors } from '@constants/Colors';
import { Header } from '@components/Headers/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ControlledInput } from '@components/ControlledInput.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CButton } from '@components/Buttons/CButton.tsx';
import { emailScheme } from '../../../../schemes/email.scheme.ts';
import { core } from '@config/Configuration.ts';

export const InviteDoctor =
  ({}: RootStackScreenProps<'InviteDoctorScreen'>): JSX.Element => {
    const doctors = [
      /*
      {
        name: 'Olivia Rhye',
        email: 'olivia.rhye@gmail.com',
      },
       */
    ];
    const { control, handleSubmit } = useForm<emailScheme>({
      defaultValues: {
        email: '',
      },
      resolver: zodResolver(emailScheme),
    });
    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <Header
          hasBackButton
          text="profile.invite_doctor"
          backgroundColor={Colors.lightPurple}
        />
        <View style={styles.container}>
          <CText mb={15} size="lg_medium" color="purple1">
            Invite doctor
          </CText>
          <ControlledInput
            control={control}
            secureTextEntry={false}
            placeholderText="profile.invite_doctor_by_email"
            borderColor={Colors.grey1}
            placeholderColor={Colors.black}
            name="email"
            backgroundColor={Colors.white}
            textStyle={{
              color: Colors.black,
              fontWeight: 'normal',
              fontSize: 14,
            }}
            RightAccessory={() => (
              <AntDesign name="mail" size={21} color={Colors.deepPurple} />
            )}
          />
          <CButton
            mt={12}
            text="profile.send_invitation"
            textSize="md_medium"
            onPress={handleSubmit(() => {
              core.inviteDoctor
                .execute({ email: control._formValues.email })
                .then((r) => {
                  console.log(r);
                  r
                    ? Alert.alert(
                        'Invitation sent!',
                        `Invitation sent to doctor with email : ${control._formValues.email}`,
                      )
                    : Alert.alert(
                        'Error!',
                        `Send invitation failed, please try again later!`,
                      );
                });

              /*
                            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                                screen: OnboardingStackRoutes.INTRO_QUESTION_SCREEN,
                            });
                             */
            })}
          />
          <CText mb={15} mt={25} size="lg_medium" color="purple1">
            Doctors list
          </CText>
          {doctors.map((item, index) => (
            <View style={styles.profileHeader} key={index}>
              <View
                style={[
                  styles.initialsContainer,
                  { backgroundColor: Colors.cosmos },
                ]}
              >
                <CText size="xl_bold" color="white">
                  {item.name.split(' ')[0][0].toUpperCase() +
                    item.name.split(' ')[1][0].toUpperCase()}
                </CText>
              </View>
              <View style={styles.profileInfo}>
                <CText size="lg_medium" color="purple">
                  {item.name}
                </CText>
                <CText size="sm_medium" color="purpleGrey">
                  {item.email}
                </CText>
              </View>
            </View>
          ))}
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileHeader: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
});
