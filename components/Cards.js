import React, { Component } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
// react-native imports
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
// style imports
import {
  horizontalCardStrip,
  restaurantCard,
  row,
  foodCard,
  cardHeader,
  cardBody,
  boldWhite,
  foodTitle,
  price,
} from './styles';
// utility function imports
import {
  generateRating,
  generatePrice,
  formatPhoneNumber,
  threeMenuItems,
} from '../utils/getRestaurantInfo';
// MenuItem component import
import { MenuItem } from './index';

const windowWidth = Dimensions.get('window').width;

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cardHeight: 200,
    };
  }

  onSwipeUp() {
    this.setState({ cardHeight: 400 });
    this.props.offset(0.007);
  }

  onSwipeDown() {
    this.setState({ cardHeight: 200 });
    this.props.offset(0);
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    this.props.update(viewableItems);
  };

  _keyExtractor = item => item.restaurantId;

  _renderItem = ({ item }) => {
    return (
      <View style={styles.padCard}>
        <GestureRecognizer
          onSwipeUp={state => this.onSwipeUp(state)}
          onSwipeDown={state => this.onSwipeDown(state)}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
        >
          <View
            style={
              (styles.restaurantCard,
              {
                height: this.state.cardHeight,
                backgroundColor: '#fff',
                shadowColor: '#000',
                borderRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                shadowOpacity: 0.4,
              })
            }
          >
            {/*Top of card - rest name, ratings, etc.*/}
            <View style={styles.cardHeader}>
              <Text style={styles.boldWhite}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.rating}>{generateRating(item)}</Text>
                <Text style={styles.rating}>{generatePrice(item)}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              {/* Check if there's a menu key on the restaurant object, and make sure it's an array*/}
              {item.menu && Array.isArray(item.menu) && item.menu[0] ? (
                threeMenuItems(item.menu).map(menuItem => (
                  <MenuItem key={menuItem.name} food={menuItem} />
                ))
              ) : (
                <View>
                  <Text>Menu not available</Text>
                  {item.phone ? (
                    <Text>Phone: {formatPhoneNumber(item)}</Text>
                  ) : null}
                </View>
              )}
            </View>
          </View>
        </GestureRecognizer>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.horizontalCardStrip}>
        <FlatList
          horizontal
          decelerationRate={0}
          snapToInterval={windowWidth}
          snapToAlignment="center"
          alwaysBounceHorizontal
          onViewableItemsChanged={this.onViewableItemsChanged}
          extraData={this.state}
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
  boldWhite: boldWhite,
  foodCard: foodCard,
  foodTitle: foodTitle,
  cardBody: cardBody,
  price: price,
  rating: {
    color: 'white',
    marginVertical: 0,
    paddingVertical: 0,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
});

export default Cards;
