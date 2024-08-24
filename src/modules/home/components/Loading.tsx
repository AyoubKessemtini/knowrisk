import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CText } from '@components/CText';

interface LoadingAndErrorProps {
  loading: boolean;
  error: string | null;
}

export const LoadingAndError: React.FC<LoadingAndErrorProps> = ({
  loading,
  error,
}) => (
  <View style={styles.loadingContainer}>
    {loading && <ActivityIndicator size="large" color="#0000ff" />}
    {error && <CText>Error: {error}</CText>}
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    marginVertical: 20,
  },
});
