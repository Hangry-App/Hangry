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
  boldBlue,
  containerStyle,
  scroll,
} from './styles';
import Svg, { Path } from 'react-native-svg';
import { dummyData } from '../utils/restaurantDummyData';

// OB/JD: is it possible for this get out-of-sync? maybe switching orientation?
const windowWidth = Dimensions.get('window').width;

class Cards extends Component {
  _keyExtractor = (item, index) => item.restaurantId;

  _renderItem = ({ item }) => (
    <View style={styles.cardboard}>
      <TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.boldBlue}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    // console.log('Visible items are', viewableItems);
    this.props.update(viewableItems);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <FlatList
            onViewableItemsChanged={this.onViewableItemsChanged}
            style={styles.containerStyle}
            horizontal={true /* OB/JD: can delete =true and it will simply be set to true by default */}
            decelerationRate={0}
            snapToInterval={windowWidth}
            snapToAlignment={'center' /* OB/JD: no need for these surrounding curly braces */}
            alwaysBounceHorizontal={true}
            data={dummyData}
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
