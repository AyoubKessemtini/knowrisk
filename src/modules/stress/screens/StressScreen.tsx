import React, { useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '@components/Screen';
import {DateSelector} from '@components/DatePicker/DatePicker.tsx';
import {CText} from '@components/CText.tsx';
import {Header} from "@components/Headers/Header.tsx";
import {StressAverageChart} from "@modules/stress/screens/components/StressAverageChart.tsx";
import {Colors} from "@constants/Colors.ts";
import {formatStringDate} from "@hooks/useDateFormatter.ts";
import {StressLevelCard} from "@components/Cards/StressLevelIndicator.tsx";

export const StressScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
    };

    return (
        <Screen
            fullscreen
            withoutTopEdge
            noHorizontalPadding
            containerStyles={styles.container}
        >
            <Header
                hasBackButton
                useCustomBackButton
                text="common.stress"
                textColor="black"
            />
            <View style={styles.wrapper}>
                <DateSelector
                    initialDate={selectedDate}
                    onDateChange={handleDateChange}
                />
                <StressAverageChart
                    stressQuality={'1,4'}
                    lastUpdate={'12:45'}
                />
                <View style={styles.textContainer}>
                    <CText size={'sm_light'}>
                        Track your daily stress levels on a scale from 0 to 3 for insights into your emotional well-being. Regular check-ins can help you spot patterns and make time for self-care. Let’s take small steps toward better stress management and overall well-being.
                    </CText>
                </View>
                <StressLevelCard
                    date={formatStringDate(selectedDate)}
                    stressLevels={{ low: '10h', good: '7h', high: '5h' }}
                    progress={{ low: 42, good: 33, high: 25 }}
                    comparison={{ low: 30, good: 40, high: 30 }}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 12,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    wrapper: {
        justifyContent: 'center',
        width: '100%',
        gap: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    textContainer:{
        backgroundColor: Colors.lightPurple,
        borderRadius: 12,
        padding: 15,
        width: '100%',
    }
});
