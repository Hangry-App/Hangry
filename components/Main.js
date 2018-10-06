import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import * as firebase from 'firebase';
import { Cards, TestIcon, AccountIcon } from './index';
require('firebase/functions');
const dummyData = require('../testData.json');
const Marker = MapView.Marker;
import axios from 'axios';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      offset: 0,
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
          lat: 43.065005,
          long: -89.391037,
          name: '',
          price: 0,
          rating: 0,
          restaurantId: 0,
          menu: [],
        },
      },
      recommendedRestaurants: [],
    };

    this.updateCurrentRestaurant = this.updateCurrentRestaurant.bind(this);
  }

  updateCurrentRestaurant = restaurant => {
    this.setState({
      restaurant: restaurant[0],
    });
  };

  navToUserPrefs = () => {
    this.props.navigation.navigate('UserPref');
  };

  async componentDidMount() {
    await this.getLocationAsync();
    const latitude = this.state.location.coords.latitude.toFixed(4).toString();
    const longitude = this.state.location.coords.longitude
      .toFixed(4)
      .toString();
    const { data: receiveAllVenues } = await axios.get(
      `https://us-central1-hangry-1e919.cloudfunctions.net/returnVenues?lat=${latitude}&long=${longitude}`
    );
    this.setState({ recommendedRestaurants: receiveAllVenues });
  }

  offsetMap = num => {
    this.setState({ offset: num });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Cannot show location without GPS',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
  };

  render() {
    let text = 'Waiting ...';
    let locationFound = false;

    if (this.state.errorMessage()) {
      text = this.state.errorMessage();
    } else if (this.state.location) {
      locationFound = true;
    }

    const userId = firebase.auth().currentUser.uid;
    console.log('-----------------------------------');
    console.log('Firebase Auth');
    const getUserData = async () => {
      const db = firebase.database();
      const ref = await db
        .ref('userPreferences')
        .child(userId)
        .limitToFirst(5)
        .on('value', snapshot => {
          console.log(snapshot);
        });
    };
    getUserData();

    return (
      <View style={styles.container}>
        {!locationFound ? (
          <Text style={styles.paragraph}>{text}</Text>
        ) : (
          <View style={styles.fullscreen}>
            <TouchableWithoutFeedback onPress={this.navToUserPrefs}>
              <View style={styles.homeIcon}>
                <AccountIcon />
              </View>
            </TouchableWithoutFeedback>
            <MapView
              style={styles.fullscreen}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={{
                latitude: this.state.restaurant.item.lat - this.state.offset,
                longitude: this.state.restaurant.item.long,
                latitudeDelta: 0.09,
                longitudeDelta: 0.05,
              }}
              provider={MapView.PROVIDER_GOOGLE}
              showsUserLocation
            >
              <Marker
                coordinate={{
                  latitude: this.state.restaurant.item.lat,
                  longitude: this.state.restaurant.item.long,
                }}
                title={this.state.restaurant.item.name}
                description={this.state.restaurant.item.categoryShortName}
              />
            </MapView>
          </View>
        )}
        {this.state.recommendedRestaurants.length ? (
          <Cards
            restaurants={this.state.recommendedRestaurants}
            update={this.updateCurrentRestaurant}
            offset={this.offsetMap}
          />
        ) : null}
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
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  homeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
});

export default Main;
