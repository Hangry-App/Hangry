import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  container,
  interiorContainer,
  colors,
  card,
  cardHeader,
  cardContainer,
  boldWhite,
  containerStyle,
  scroll,
} from './styles';
import Svg, { Path } from 'react-native-svg';
import { dummyData } from '../utils/restaurantDummyData';

const windowWidth = Dimensions.get('window').width;

class Cards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <ScrollView
            style={styles.containerStyle}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={windowWidth}
            snapToAlignment={'center'}
            alwaysBounceHorizontal={true}
          >
            {dummyData.map(restaurant => (
              <View key={restaurant.foodId} style={styles.cardboard}>
                <TouchableOpacity>
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.boldWhite}>{restaurant.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: card,
  cardHeader: cardHeader,
  container: container,
  interiorContainer: interiorContainer,
  cardContainer: cardContainer,
  boldWhite: boldWhite,
  cardboard: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
});

export default Cards;
