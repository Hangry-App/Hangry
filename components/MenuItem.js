import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { foodCard, foodTitle, price } from './styles';
import formatPhoneNumber from '../utils/getRestaurantInfo';

const MenuItem = props => {
  const { food } = props;
  return (
    <View style={styles.foodCard}>
      <Text style={styles.foodTitle}>{food.name}</Text>
      {food.description ? <Text>{food.description}</Text> : null}

      {food.description && food.price ? (
        <Text style={styles.price}>${food.price}</Text>
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
