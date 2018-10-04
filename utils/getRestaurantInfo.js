import React, { Component } from 'react';
import { Text } from 'react-native';

export const generateRating = item => {
  let rating = '';
  for (let i = 0; i < Math.floor(item.rating); i++) {
    rating += '*';
  }
  return <Text>{rating}</Text>;
};

export const generatePrice = item => {
  let price = '';
  for (let i = 0; i < Math.floor(item.price.tier); i++) {
    price += '$';
  }
  return <Text>{price}</Text>;
};

export const formatPhoneNumber = item => {
  const { phone } = item;
  let arr = phone.split('');
  arr.unshift('(');
  arr.splice(4, 0, ')-');
  arr.splice(8, 0, '-');
  return arr.join('');
};
