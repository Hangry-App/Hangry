import React from 'react';
import SvgUri from 'react-native-svg-uri';

const TestIcon = () => {
  const size = 30;
  return (
    <SvgUri
      width={size}
      height={size}
      fill="#fff"
      source={require('../assets/homer-simpson.svg')}
    />
  );
};

export default TestIcon;
