import { useLayoutEffect, useState } from 'react';
import { Image } from 'react-native';

interface ScaleHeightProps {
  imgSource: string | number;
  maxWidth: number;
}

export const useScaledHeight = ({
  imgSource,
  maxWidth,
}: ScaleHeightProps): [height: number, aspectRatio: number] => {
  const [[imageWidth, imageHeight], setImageDimensions] = useState([0, 0]);
  const imageAspectRatio = imageWidth / imageHeight;

  useLayoutEffect(() => {
    if (typeof imgSource === 'string') {
      Image.getSize(imgSource, (w, h) => setImageDimensions([w, h]));
    } else {
      const { width: w, height: h } = Image.resolveAssetSource(imgSource);
      setImageDimensions([w, h]);
    }
  }, [imgSource]);

  if (Number.isNaN(imageAspectRatio)) return [0, 0];

  return [(maxWidth / imageWidth) * imageHeight, imageAspectRatio];
};
