import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export const TermsAndConditionsScreen = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleClose = () => {
    // Use navigation.dismiss() if the screen is presented modally
    // navigation.dismiss();

    // If navigation.dismiss() doesn't work, use navigation.goBack()
    navigation.goBack(); // Retourne à l’écran précédent
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

    <View style={{ flex: 1 }}>
      {/* En-tête personnalisé */}
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      {/* Indicateur de chargement */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.activityIndicator}
        />
      )}

      {/* WebView */}
      <WebView
        source={{ uri: 'https://www.knowlepsy.com/personal-data-policy' }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 4, // Pour une ombre sur Android
    shadowColor: '#000', // Pour une ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold', // Make the text bold
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25, // Pour centrer l’indicateur
    marginTop: -25,
  },
});
