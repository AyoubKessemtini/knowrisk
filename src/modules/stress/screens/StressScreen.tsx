import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '@components/Screen';
import {DateSelector} from '@components/DatePicker/DatePicker.tsx';
import {CText} from '@components/CText.tsx';
import {Header} from "@components/Headers/Header.tsx";
import {StressAverageChart} from "@modules/stress/screens/components/StressAverageChart.tsx";
import {Colors} from "@constants/Colors.ts";
import {formatStringDate} from "@hooks/useDateFormatter.ts";
import {StressLevelCard} from "@components/Cards/StressLevelIndicator.tsx";
import {StressDeviceData} from "@core/entities/deviceDataApisEntity/StressDeviceData.ts";
import {core} from "@config/Configuration.ts";
import {fetch} from "@react-native-community/netinfo";

export const StressScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [stressData, setStressData] = useState<StressDeviceData[]>([]);
    const [lowStressData, setLowStressData] = useState<StressDeviceData>(null);
    const [mediumStressData, setMediumStressData] = useState<StressDeviceData>(null);
    const [highStressData, setHighStressData] = useState<StressDeviceData>(null);
    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
    };
    useEffect(() => {
        const fetchStressDailyData = async () => {
            try {
                const fetchedData = await core.getStressDailyData.execute(formatStringDate(selectedDate));
                setStressData(fetchedData);
                console.log('fetched stressData', fetchedData);
                console.log('date', formatStringDate(selectedDate));

                setHighStressData(fetchedData.find(s => s.stress_level === "High") || null);
                setMediumStressData(fetchedData.find(s => s.stress_level === "Medium") || null);
                setLowStressData(fetchedData.find(s => s.stress_level === "Low") || null);
            } catch (error) {
                console.error("Failed to fetch stress data:", error);
            }
        };

        fetchStressDailyData();
    }, [selectedDate]);


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
                    stressQuality={stressData.length>0 ?'1,4' : 'Calcul...'}
                    lastUpdate={formatStringDate(selectedDate)}
                />
                <View style={styles.textContainer}>
                    <CText size={'sm_light'}>
                        Track your daily stress levels on a scale from 0 to 3 for insights into your emotional well-being. Regular check-ins can help you spot patterns and make time for self-care. Let’s take small steps toward better stress management and overall well-being.
                    </CText>
                </View>
                <StressLevelCard
                    date={
                        stressData.length > 0
                            ? formatStringDate(selectedDate)
                            : `${formatStringDate(selectedDate)} (Calculating)`
                    }
                    stressLevels={{
                        low: lowStressData ? lowStressData.time : 'Calculating',
                        good: mediumStressData ? mediumStressData.time : 'Calculating',
                        high: highStressData ? highStressData.time : 'Calculating',
                    }}
                    progress={{
                        low: lowStressData ? Number(lowStressData.percentage) : 0,
                        good: mediumStressData ? Number(mediumStressData.percentage) : 10,
                        high: highStressData ? Number(highStressData.percentage) : 0,
                    }}
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
