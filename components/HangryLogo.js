import React from 'react';
import SvgUri from 'react-native-svg-uri';

const HangryLogo = () => {
  const size = 100;
  return (
    <SvgUri
      width={size}
      height={size}
      fill="#fff"
      source={require('../assets/hangry-logo-02.svg')}
    />
  );
};

export default HangryLogo;
