import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CText } from '@components/CText';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RecoveryComponentProps = {
  title: string;
  value: number;
  maxValue?: number;
  description: string;
  onPress?: () => void;
  activeStrokeColor?: string;
  inActiveStrokeColor?: string;
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
  return (
    <View style={styles.container}>
      <CText size="sm_semiBold" color={'deepPurple'} numberOfLines={1}>
        {title}
      </CText>
      <View style={styles.progressContainer}>
        <CircularProgress
          value={value}
          maxValue={maxValue}
          radius={45}
          showProgressValue={false}
          activeStrokeColor={activeStrokeColor}
          inActiveStrokeColor={inActiveStrokeColor}
          inActiveStrokeOpacity={0.3}
          activeStrokeWidth={10}
          inActiveStrokeWidth={10}
          duration={1500}
          title={`${value}%`}
          titleColor={Colors.yellow2}
          titleStyle={styles.progressTitle}
        />
        <TouchableOpacity
          style={styles.descriptionContainer}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <View style={styles.textContainer}>
            <CText size="xm" color={'deepPurple'} mb={5} numberOfLines={2}>
              {description}
            </CText>
          </View>
          <Icon name="chevron-right" size={29} color={Colors.deepPurple} />
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
