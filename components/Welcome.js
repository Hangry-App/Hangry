import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from '../secrets'

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordValidate: '',
    };
    this._onPressButton = this._onPressButton.bind(this);
  }
  async componentDidMount() {
    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig);
    }
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user);
    //     this.props.navigation.navigate('Main');
    //   }
    // });
  }
  _onPressButton(direct) {
    if (direct === 'signup') {
        this.props.navigation.navigate('UserSignUp');
    } else {
        this.props.navigation.navigate('UserLogin');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HANGRY</Text>
        <View style={styles.buttonContainer}>
            <Button 
                onPress={() => this._onPressButton('login')}
                color={lightBlue}
                title="Log In"/>
            <Button 
                onPress={() => this._onPressButton('signup')}
                color={lightBlue}
                title="Sign Up"/>
        </View>
      </View>
    );
  }
}

const lightBlue = '#bfe2ff';
const darkBlue = '#2699FB';
const white = '#fff';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
    padding: 50,
    alignItems: 'center',
    backgroundColor: darkBlue,
  },
  text: {
    color: white,
    fontSize: 50,
    textAlign: 'left',
  },
  buttonContainer: {
      position: 'absolute',
      bottom: 50,
  }
});

export default Welcome;
