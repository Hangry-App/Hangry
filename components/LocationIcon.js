import React from 'react';
import SvgUri from 'react-native-svg-uri';

const LocationIcon = () => {
  const size = 30;
  return (
    <SvgUri
      width={size}
      height={size}
      fill="#fff"
      source={require('../assets/LocationIcon.svg')}
    />
  );
};

export default LocationIcon;
