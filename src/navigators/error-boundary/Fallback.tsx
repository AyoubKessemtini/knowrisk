import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <SafeAreaView>
    <Text>YOU GOT AN ERROR, HORRAY</Text>
    <Text style={{ color: 'red' }}>{error.message}</Text>
    <Button title="PRESS TO RESET" onPress={resetErrorBoundary} />
  </SafeAreaView>
);
