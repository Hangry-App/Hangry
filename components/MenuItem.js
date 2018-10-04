import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { foodCard, foodTitle, price } from './styles';
import formatPhoneNumber from '../utils/getRestaurantInfo';

const MenuItem = props => {
  const { restaurant } = props;
  return (
    <View style={styles.foodCard}>
      <Text style={styles.foodTitle}>{restaurant.menu[0].name}</Text>
      {restaurant.menu[0].description ? (
        <Text>{restaurant.menu[0].description}</Text>
      ) : null}

      {restaurant.menu[0].description && restaurant.menu[0].price ? (
        <Text style={styles.price}>${restaurant.menu[0].price}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  foodCard: foodCard,
  foodTitle: foodTitle,
  prie: price,
});

export default MenuItem;
