// src/components/GifDisplay.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const { height, width } = Dimensions.get('window');

interface GifDisplayProps {
  source: any;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const GifDisplay: React.FC<GifDisplayProps> = ({
  source,
  style,
  imageStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={styles.image}
        source={source}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
  },
});

export default GifDisplay;
