import React, { Component } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  container,
  interiorContainer,
  horizontalCardStrip,
  restaurantCard,
  row,
  foodCard,
  cardHeader,
  cardBody,
  cardContainer,
  boldWhite,
  boldBlue,
  foodTitle,
  price,
} from './styles';

const windowWidth = Dimensions.get('window').width;

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cardHeight: 200,
    };
  }

  onSwipeUp(gestureState) {
    this.setState({ cardHeight: 400 });
  }

  onSwipeDown(gestureState) {
    this.setState({ cardHeight: 200 });
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    this.props.update(viewableItems);
  };

  _keyExtractor = item => item.restaurantId;

  _renderItem = ({ item }) => (
    <View style={styles.padCard}>
      <GestureRecognizer
        onSwipeUp={state => this.onSwipeUp(state)}
        onSwipeDown={state => this.onSwipeDown(state)}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
      >
        <View style={styles.restaurantCard}>
          {/*Top of card - rest name, ratings, etc.*/}
          <View style={styles.cardHeader}>
            <Text style={styles.boldWhite}>{item.name}</Text>
            <View style={styles.row}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                *****
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                $$$
              </Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            {/* Check if there's a menu key on the restaurant object, and make sure it's an array*/}
            {item.menu && Array.isArray(item.menu) && item.menu[0] ? (
              <View style={styles.foodCard}>
                <Text style={styles.foodTitle}>{item.menu[0].name}</Text>
                <Text>{item.menu[0].description}</Text>
                <Text style={styles.price}>${item.menu[0].price}</Text>
              </View>
            ) : (
              <Text>Menu not available</Text>
            )}
          </View>
        </View>
      </GestureRecognizer>
    </View>
  );

  render() {
    console.log(this.props.restaurants[1].menu[0].name);
    // console.log('STATE: ', this.state);
    return (
      <View style={styles.horizontalCardStrip}>
        <FlatList
          horizontal
          decelerationRate={0}
          snapToInterval={windowWidth}
          snapToAlignment="center"
          alwaysBounceHorizontal
          onViewableItemsChanged={this.onViewableItemsChanged}
          data={this.props.restaurants}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  restaurantCard: restaurantCard,
  horizontalCardStrip: horizontalCardStrip,
  padCard: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  row: row,
  cardHeader: cardHeader,
  container: container,
  interiorContainer: interiorContainer,
  cardContainer: cardContainer,
  boldBlue: boldBlue,
  boldWhite: boldWhite,
  foodCard: foodCard,
  foodTitle: foodTitle,
  cardBody: cardBody,
  price: price,
});

export default Cards;
