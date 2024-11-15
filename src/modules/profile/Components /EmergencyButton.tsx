import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { CText } from '@components/CText';

interface EmergencyButtonProps {
    title:string,
    number:string,
    icon : React.ReactNode,
    onPress: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = (
  emergencyButtonProps,
) => {
    return (
        <TouchableOpacity style={styles.container} onPress={emergencyButtonProps.onPress}>
            <View>
                <CText size={'md_medium'} color="black">{emergencyButtonProps.number}</CText>
                <CText
                    size={'xm_medium'}
                    color="fadedPurple"
                >
                    {emergencyButtonProps.title}
                </CText>
            </View>
            {emergencyButtonProps.icon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 10,
        backgroundColor: Colors.magnolia,
    },
});

export default EmergencyButton;
