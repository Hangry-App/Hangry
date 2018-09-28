import React, { Component } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Constants, Location, Permissions, MapView} from "expo";

const Marker = MapView.Marker

const mapStyle = [
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 100
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#8c8c8c"
        },
        {
          "lightness": 70
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#5f5f5f"
        },
        {
          "lightness": 75
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#5f5f5f"
        },
        {
          "lightness": 100
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "lightness": 100
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#d2d2d2"
        },
        {
          "lightness": 80
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#10b1c1"
        }
      ]
    }
  ]

export class Map extends Component {
  state = {
    location: null,
    errorMessage: null
  };
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "OS Error"
      });
    } else {
      this.getLocationAsync();
    }
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permmisions Error"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
  }
  render() {
    let text = "Waiting..";
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
            customMapStyle={mapStyle}
            showsUserLocation
            showsMyLocationButton
          />
          </View>
        ) : (
          <Text style={styles.paragraph}>{text}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
