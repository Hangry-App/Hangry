import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Slider
} from 'react-native';
import * as firebase from 'firebase';
import _set from 'lodash/set';

const lightBlue = '#7FC4FD';
const darkBlue = '#2699FB';
const white = '#fff';

const foodTypes = [
  ['PIZZA', '4bf58dd8d48988d1ca941735'],
  ['AMERICAN', '4bf58dd8d48988d14e941735'],
  ['CHINESE ', '4bf58dd8d48988d145941735'],
  ['SUSHI', '4bf58dd8d48988d1d2941735'],
  ['MEXICAN ', '4bf58dd8d48988d1c1941735'],
  ['SALAD', '4bf58dd8d48988d1bd941735'],
  ['INDIAN', '4bf58dd8d48988d10f941735'],
  ['PERUVIAN', '4eb1bfa43b7b52c0e1adc2e8'],
  ['THAI', '4bf58dd8d48988d149941735']
];

const styles = StyleSheet.create({
  body: {
    backgroundColor: lightBlue,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  headerOne: {
    alignSelf: 'center',
    color: white,
    fontSize: 50
  },
  sliders: {
    paddingTop: 20
  },
  slideContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  slideLabelContainer: {
    paddingRight: 10,
    maxWidth: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  slideLabel: {
    fontSize: 20,
    color: white
  },
  slideSlider: {
    flexGrow: 1,
    maxWidth: '60%'
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
    height: 50,
    backgroundColor: darkBlue,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  centerText: {
    fontSize: 20,
    color: white,
    textAlign: 'center'
  },
  categories: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  category: {
    backgroundColor: 'red',
    width: 125,
    height: 125,
    margin: 5
  },
  distances: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  distance: {
    backgroundColor: 'yellow',
    flexGrow: 1,
    height: 200,
    margin: 10,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
});

class UserPref extends Component {
  constructor() {
    super();
    this.state = {
      weights: {
        categories: 5,
        priceRange: 5,
        rating: 5,
        range: 5
      },
      categories: {
        '4d4b7105d754a06374d81259': 0.5 // Note, this is the food general category in foursquare -- setting as initial state in case there are no food preferences
      },
      priceTier: 2,
      rating: 4,
      distance: 5000
    };
  }
  async savePreferences() {
    const db = firebase.database();
    const user = await firebase.auth();
    const userId = user.currentUser.uid;
    db.ref('userPreferences/' + userId).set(this.state);
  }

  render() {
    return (
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.headerOne}>Preferences</Text>
          <View style={styles.sliders}>
            <View style={styles.slideContainer}>
              <View style={styles.slideLabelContainer}>
                <Text style={styles.slideLabel}>Categories</Text>
              </View>
              <Slider
                maximumValue={10}
                minimumValue={0}
                value={5}
                step={0.5}
                onValueChange={value => {
                  _set(this.state, 'weights.categories', value);
                }}
                style={styles.slideSlider}
              />
            </View>
            <View style={styles.slideContainer}>
              <View style={styles.slideLabelContainer}>
                <Text style={styles.slideLabel}>Price Range</Text>
              </View>
              <Slider
                maximumValue={10}
                minimumValue={0}
                value={5}
                step={0.5}
                onValueChange={value => {
                  _set(this.state, 'weights.priceRange', value);
                }}
                style={styles.slideSlider}
              />
            </View>
            <View style={styles.slideContainer}>
              <View style={styles.slideLabelContainer}>
                <Text style={styles.slideLabel}>Rating</Text>
              </View>
              <Slider
                maximumValue={10}
                minimumValue={0}
                value={5}
                step={0.5}
                onValueChange={value => {
                  _set(this.state, 'weights.rating', value);
                }}
                style={styles.slideSlider}
              />
            </View>
            <View style={styles.slideContainer}>
              <View style={styles.slideLabelContainer}>
                <Text style={styles.slideLabel}>Range</Text>
              </View>
              <Slider
                maximumValue={10}
                minimumValue={0}
                value={5}
                step={0.5}
                onValueChange={value => {
                  _set(this.state, 'weights.range', value);
                }}
                style={styles.slideSlider}
              />
            </View>
          </View>
          <View style={styles.distances}>
            <TouchableWithoutFeedback
              style={styles.distance}
              onPressIn={() => this.setState({ distance: 1000 })}
            >
              <View style={styles.distance}>
                <Text>Walk</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.distance}
              onPressIn={() => this.setState({ distance: 5000 })}
            >
              <View style={styles.distance}>
                <Text>Bike</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.distance}
              onPressIn={() => this.setState({ distance: 10000 })}
            >
              <View style={styles.distance}>
                <Text>Drive</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <View style={styles.sliders}>
              <View style={styles.slideContainer}>
                <View style={styles.slideLabelContainer}>
                  <Text style={styles.slideLabel}>Price Tier</Text>
                </View>
                <Slider
                  maximumValue={4}
                  minimumValue={1}
                  value={2}
                  step={1}
                  onValueChange={value => {
                    _set(this.state, 'priceTier', value);
                  }}
                  style={styles.slideSlider}
                />
              </View>
            </View>
            <View style={styles.slideContainer}>
              <View style={styles.slideLabelContainer}>
                <Text style={styles.slideLabel}>Rating</Text>
              </View>
              <Slider
                maximumValue={10}
                minimumValue={1}
                value={4}
                step={0.5}
                onValueChange={value => {
                  _set(this.state, 'rating', value);
                }}
                style={styles.slideSlider}
              />
            </View>
          </View>
          <View style={styles.categories}>
            {foodTypes.map(foodType => {
              return (
                <TouchableWithoutFeedback
                  key={foodType[1]}
                  onPressIn={() => {
                    const categoryState = () => this.state.categories
                    let currentCategories = categoryState();
                    if (currentCategories[foodType[1]] && currentCategories[foodType[1]] === 0.5){
                      currentCategories[foodType[1]] = 0.0
                      if (Object.values(currentCategories).reduce((a, b) => a + b) === 0) {
                        currentCategories['4d4b7105d754a06374d81259'] = 0.5;
                      }
                      } else {
                        currentCategories[foodType[1]] = 0.5;
                        currentCategories['4d4b7105d754a06374d81259'] = 0;
                      }
                    this.setState({categories: currentCategories});
                  }}
                >
                  <View style={styles.category}>
                    <Text>{foodType[0]}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ); 
            })}
          </View>
          <TouchableWithoutFeedback
            onPressIn={() => {
              styles.submitButton = {
                marginTop: 20,
                width: '100%',
                height: 50,
                backgroundColor: '#33658E',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              };
              this.setState(prevState => prevState);
            }}
            onPressOut={async () => {
              styles.submitButton = {
                marginTop: 20,
                width: '100%',
                height: 50,
                backgroundColor: darkBlue,
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              };
              console.log(this.state);
              this.setState(prevState => prevState);
              await this.savePreferences();
              this.props.navigation.navigate('Main');
            }}
          >
            <View style={styles.submitButton}>
              <Text style={styles.centerText}>Submit</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}

export default UserPref;
