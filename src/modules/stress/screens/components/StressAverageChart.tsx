import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pallete, PalleteColors } from '@constants/Colors';
import { SleepCircleChart } from '@assets/svg/sleepCircleChart';
import { CText } from '@components/CText.tsx';

interface StressAverageChartProps {
    color?: PalleteColors;
    stressQuality?: string;
    lastUpdate?: string;
}

export const StressAverageChart: React.FC<StressAverageChartProps> = ({
                                                                        color = 'white',
                                                                        stressQuality = '1,4',
                                                                        lastUpdate = '12:43',
                                                                    }) => {
    const backgroundColor = pallete[color];

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.chartContainer}>
                <SleepCircleChart width={160} height={160} />
            </View>
            <CText size={'lg_light'} style={{fontSize:32}} mt={-80} color={'deepPurple'}>
                {stressQuality}
            </CText>
            <CText size={'xs'} mt={30} color={'grey4'}>
                Last update {lastUpdate}
            </CText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 15,
        width: '100%',
    },
    chartContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
