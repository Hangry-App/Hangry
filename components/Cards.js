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
  card,
  foodCard,
  cardHeader,
  cardBody,
  cardContainer,
  boldWhite,
  boldBlue,
  foodTitle,
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

  _keyExtractor = item => item.restaurantId;

  _renderItem = ({ item }) => (
    <View style={styles.padCard}>
      {/*<TouchableWithoutFeedback>*/}
      <GestureRecognizer
        onSwipeUp={state => this.onSwipeUp(state)}
        onSwipeDown={state => this.onSwipeDown(state)}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
      >
        <View style={styles.restaurantCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.boldWhite}>{item.name}</Text>
          </View>
          <View style={styles.cardBody}>
            {Array.isArray(item.menu) ? (
              <View style={styles.foodCard}>
                <Text style={styles.foodTitle}>{item.menu[0].name}</Text>
                <View>
                  <Text>{item.menu[0].description}</Text>
                  <Text>{item.menu[0].price}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.foodCard}>
                <Text>Menu not available</Text>
              </View>
            )}
          </View>
        </View>
      </GestureRecognizer>
      {/*</TouchableWithoutFeedback>*/}
    </View>
  );

  render() {
    console.log('STATE: ', this.state);
    return (
      <View style={styles.horizontalCardStrip}>
        <FlatList
          horizontal
          decelerationRate={0}
          snapToInterval={windowWidth}
          snapToAlignment="center"
          alwaysBounceHorizontal
          data={this.props.restaurants}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  restaurantCard: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 200,
    // height: 400,
    width: '100%',
    marginVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  horizontalCardStrip: {
    position: 'absolute',
    bottom: 20,
  },
  padCard: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  cardHeader: cardHeader,
  container: container,
  interiorContainer: interiorContainer,
  cardContainer: cardContainer,
  boldBlue: boldBlue,
  boldWhite: boldWhite,
  foodCard: foodCard,
  foodTitle: foodTitle,
  cardBody: cardBody,
});

export default Cards;
