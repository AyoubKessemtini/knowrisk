import { FasterImageView } from '@candlefinance/faster-image';
import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
interface CustomImageProps {
  source: string;
  height: number | `${number}%`;
  width?: number | `${number}%`;
  resizeMode?: 'contain' | 'cover';
  containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Image component
 * @param source pass string uri for remote images
 * @example
 * source={"example.com"}
 */
export const CImage = ({
  source,
  height,
  width = '100%',
  resizeMode = 'cover',
  containerStyle,
}: CustomImageProps): JSX.Element => {
  return (
    <View style={[styles.imageContainer, containerStyle, { width, height }]}>
      {typeof source === 'string' ? (
        <FasterImageView
          source={{
            cachePolicy: 'discWithCacheControl',
            url: source,
            resizeMode,
            transitionDuration: 0.25,
            progressiveLoadingEnabled: true,
          }}
          style={styles.image}
        />
      ) : (
        <Image source={source} resizeMode={resizeMode} style={styles.image} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: { alignSelf: 'center', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
});
