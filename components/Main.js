import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import * as firebase from 'firebase';
import { Cards } from './index';
import { dummyData } from '../utils/restaurantDummyData';
const Marker = MapView.Marker;

class Main extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: '',
      currentUser: null,
      restaurant: {
        restaurantId: 0,
        name: '',
        distance: 0,
        lat: 0,
        long: 0,
        categoryId: 0,
        categoryShortName: '',
        price: {
          tier: 0,
          message: '',
          currency: '$',
        },
        rating: 0,
      },
    };
  }

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'OS Error',
      });
    } else {
      const { currentUser } = await firebase.auth();
      this.setState({ currentUser });
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permmisions Error',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
  };

  render() {
    let text = 'Waiting..';
    let locationFound = false;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      locationFound = true;
    }

    return (
      <View style={styles.container}>
        {locationFound ? (
          <View style={{ width: '100%', height: '100%' }}>
            <MapView
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={MapView.PROVIDER_GOOGLE}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: dummyData[5].lat,
                  longitude: dummyData[5].long,
                }}
                title={dummyData[5].name}
                description={dummyData[5].categoryShortName}
              />
            </MapView>
          </View>
        ) : (
          <Text style={styles.paragraph}>{text}</Text>
        )}
        <Cards />
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
});

export default Main;
