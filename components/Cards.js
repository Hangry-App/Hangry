import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
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
  boldBlue,
  containerStyle,
  scroll,
} from './styles';
import Svg, { Path } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;

class Cards extends Component {
  _keyExtractor = (item, index) => item.restaurantId;

  _renderItem = ({ item }) => (
    <View style={styles.cardboard}>
      <TouchableWithoutFeedback>
        <View style={styles.card}>
          <Text style={styles.boldBlue}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.props.update(viewableItems);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <FlatList
            onViewableItemsChanged={this.onViewableItemsChanged}
            style={styles.containerStyle}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={windowWidth}
            snapToAlignment="center"
            alwaysBounceHorizontal={true}
            data={this.props.restaurants}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
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
  boldBlue: boldBlue,
  cardboard: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
});

export default Cards;
