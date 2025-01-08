import React from 'react';
import { Image, Platform } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const isSvg = (uri) => uri.split('?')[0].match(/\.svg$/);
const isWebp = (uri) => uri.split('?')[0].match(/\.webp$/);

const UniversalImage = ({ uri, style }) => {
  if (isSvg(uri)) {
    return <SvgUri width={style.width} height={style.height} source={{ uri }} />;
  } else if (isWebp(uri) && Platform.OS === 'ios') {
    // Handle WebP for iOS specifically if needed
    return <Image source={{ uri }} style={style} />;
  } else {
    return <Image source={{ uri }} style={style} />;
  }
};

export default UniversalImage;
