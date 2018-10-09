import React from 'react';
import SvgUri from 'react-native-svg-uri';

const AccountIcon = () => {
  // OB/JD: define outside of the function, or even better as a prop
  const size = 50;
  return (
    <SvgUri
      width={size}
      height={size}
      fill="#fff"
      source={require('../assets/baseline-account_circle-24px.svg')}
    />
  );
};

export default AccountIcon;
