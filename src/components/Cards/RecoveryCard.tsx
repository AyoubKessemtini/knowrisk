import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CText } from '@components/CText';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '@constants/Colors';

type RecoveryComponentProps = {
  title: string;
  value: number; // Current value
  maxValue?: number; // Maximum value to calculate percentage
  description: string; // Description text
  onPress?: () => void; // Callback for touch action
  activeStrokeColor?: string; // Color for active progress
  inActiveStrokeColor?: string; // Color for inactive progress
};

export const RecoveryComponent = ({
                                    title,
                                    value,
                                    maxValue = 100,
                                    description,
                                    onPress,
                                    activeStrokeColor = Colors.orange,
                                    inActiveStrokeColor = Colors.purple,
                                  }: RecoveryComponentProps) => {
  // Calculate percentage value
  const percentage = (value / maxValue) * 100;

  return (
      <View style={styles.container}>
        <CText mb={5} size="md_medium" color="black">
          {title}
        </CText>
        <View style={styles.progressContainer}>
          <CircularProgress
              value={percentage} // Value to reflect as progress
              maxValue={100} // maxValue set to 100 as it's now in percentage
              radius={45} // Size of the circle
              showProgressValue={false} // Hide progress number inside
              activeStrokeColor={activeStrokeColor} // Active progress color
              inActiveStrokeColor={inActiveStrokeColor} // Inactive progress color
              inActiveStrokeOpacity={0.3} // Opacity for inactive stroke
              activeStrokeWidth={10} // Width of active stroke
              inActiveStrokeWidth={10} // Width of inactive stroke
              duration={1500} // Animation duration
              title={value!=-1 ? `${Math.round(percentage)}%` : 'Calculating'} // Title displaying percentage
              titleColor={Colors.yellow2} // Color for title
              titleStyle={styles.progressTitle} // Title text styling
          />
          <TouchableOpacity
              style={styles.descriptionContainer}
              onPress={onPress}
              activeOpacity={0.8}
          >
            <View style={styles.textContainer}>
              <CText size="xs" color="black" mb={5}>
                last updated at :
              </CText>
              <CText size="xm" color={'deepPurple'} mb={5} numberOfLines={2}>
                {description}
              </CText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    width: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: Colors.lightPurple,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 1,
    shadowColor: Colors.deepPurple,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
