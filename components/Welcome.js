import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button } from 'react-native';

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
