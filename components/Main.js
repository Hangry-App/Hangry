import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import * as firebase from 'firebase';
import { Cards } from './index';
//import { dummyData } from '../utils/restaurantDummyData';
import { name } from '../secrets';
import * as dummyData from '../routes/johnTestData.json';
const Marker = MapView.Marker;

class Main extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          return 'Cannot get GPS data on Android emulator';
        } else {
          return null;
        }
      },
      restaurant: {
        index: 0,
        item: {
          categoryId: 0,
          categoryShortName: '',
          distance: 0,
          lat: 0,
          long: 0,
          name: '',
          price: 0,
          rating: 0,
          restaurantId: 0
        }
      }
    };

    this.updateCurrentRestaurant = this.updateCurentRestaurant.bind(this);
  }

  updateCurentRestaurant = restaurant => {
    this.setState({
      restaurant: restaurant[0]
    });
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Cannot show location without GPS'
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
  };

  render() {
    let text = 'Waiting..';
    let locationFound = false;

    if (this.state.errorMessage()) {
      text = this.state.errorMessage();
    } else if (this.state.location) {
      locationFound = true;
    }

    return (
      <View style={styles.container}>
        {!locationFound ? (
          <Text style={styles.paragraph}>{text}</Text>
        ) : (
          <View style={styles.fullscreen}>
            <MapView
              style={styles.fullscreen}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              provider={MapView.PROVIDER_GOOGLE}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: this.state.restaurant.item.lat,
                  longitude: this.state.restaurant.item.long
                }}
                title={this.state.restaurant.item.name}
                description={this.state.restaurant.item.categoryShortName}
              />
            </MapView>
          </View>
        )}
        <Cards restaurants={dummyData} update={this.updateCurentRestaurant} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  },
  fullscreen: {
    width: '100%',
    height: '100%'
  }
});

export default Main;
