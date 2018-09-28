import React, { Component } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";

const Marker = MapView.Marker

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
