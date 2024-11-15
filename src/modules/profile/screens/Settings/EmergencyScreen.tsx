import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from "@constants/Colors.ts";
import {Header} from "@components/Headers/Header.tsx";
import {CText} from "@components/CText.tsx";
import {Screen} from "@components/Screen.tsx";
import EmergencyButton from "@modules/profile/Components /EmergencyButton.tsx";
import Icon from "react-native-easy-icon";
import {core} from "@config/Configuration.ts";

const emergencyData = [
    {
        "country": "+93",
        "ambulance": "112",
        "fire": "119",
        "police": "119"
    },
    {
        "country": "+355",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+213",
        "ambulance": "14",
        "fire": "14",
        "police": "18"
    },
    {
        "country": "+376",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+244",
        "ambulance": "69",
        "fire": "69",
        "police": "69"
    },
    {
        "country": "+1",
        "ambulance": "911",
        "fire": "911",
        "police": "911"
    },
    {
        "country": "+213",
        "ambulance": "14",
        "fire": "14",
        "police": "18"
    },
    {
        "country": "+376",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+244",
        "ambulance": "69",
        "fire": "69",
        "police": "69"
    },
    {
        "country": "+33",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+1",
        "ambulance": "911",
        "fire": "911",
        "police": "911"
    },
    {
        "country": "+34",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+32",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+216",
        "ambulance": "190",
        "fire": "198",
        "police": "197"
    },
    {
        "country": "+91",
        "ambulance": "102",
        "fire": "101",
        "police": "100"
    },
    {
        "country": "+44",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+49",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+86",
        "ambulance": "120",
        "fire": "119",
        "police": "110"
    },
    {
        "country": "+1",
        "ambulance": "911",
        "fire": "911",
        "police": "911"
    },
    {
        "country": "+34",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    },
    {
        "country": "+81",
        "ambulance": "119",
        "fire": "119",
        "police": "110"
    },
    {
        "country": "+55",
        "ambulance": "192",
        "fire": "193",
        "police": "190"
    },
    {
        "country": "+52",
        "ambulance": "066",
        "fire": "066",
        "police": "066"
    },
    {
        "country": "+971",
        "ambulance": "112",
        "fire": "112",
        "police": "112"
    }
];


const getUserPhoneNumber = async (): Promise<string> => {
    const fetchedData = await core.getPatientData.execute();
    return new Promise((resolve) => {
        resolve(fetchedData?.phone);
    });
};

const EmergencyScreen = () => {
    const [emergency, setEmergency] = useState<Record<string, string | null> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmergencyDetails = async () => {
            try {
                const phoneNumber = await getUserPhoneNumber();
                const emergencyObject = emergencyData.find((entry) =>
                    phoneNumber.startsWith(entry.country)
                );
                setEmergency(emergencyObject || null);
            } catch (error) {
                console.error("Error fetching phone number:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmergencyDetails();
    }, []);

    return (
    <Screen withoutTopEdge noHorizontalPadding>
        <Header
            hasBackButton
            text="profile.invite_doctor"
            backgroundColor={Colors.lightPurple}
        />
        {emergency ? (
            <View style={styles.container}>
                <EmergencyButton number={emergency.ambulance ?? 'N/A'} title={'Ambulance'} icon={<Icon
                    type="ionicon"
                    name="car-outline"
                    size={21}
                    color={Colors.fog}
                />} onPress={()=>console.log('haha')}/>
                <EmergencyButton number={emergency.police ?? 'N/A'} title={'Police'} icon={<Icon
                    type="ionicon"
                    name="shield-half-outline"
                    size={21}
                    color={Colors.fog}
                />} onPress={()=>console.log('haha')}/>
                <EmergencyButton number={emergency.fire ?? 'N/A'} title={'Fire'} icon={<Icon
                    type="ionicon"
                    name="bonfire-outline"
                    size={21}
                    color={Colors.fog}
                />} onPress={()=>console.log('haha')}/>
            </View>
        ) : (
            <CText mt={20} size={'sm_light'}>No emergency details found for you please update your number or your country.</CText>
        )}
    </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap:10
    },
});

export default EmergencyScreen;
