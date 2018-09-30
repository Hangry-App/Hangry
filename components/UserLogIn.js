import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    if (this.state.email && this.state.password) {
      Alert.alert(
        'Email: ' + this.state.email + ' ' + 'Password: ' + this.state.password
      );
    } else {
      Alert.alert('Please enter email and password to log in');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.circleLogo} />
        </View>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={[styles.text, styles.firstEl]}>Email</Text>
            <TextInput
              style={styles.form}
              placeholder={'email@email.com'}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ email: text })}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.form}
              placeholder={'password'}
              secureTextEntry={true}
              autoCapitalize={'none'}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ password: text })}
            />
            <Button
              onPress={this._onPressButton}
              color={lightBlue}
              title="Log In"
            />
          </View>
        </View>
      </View>
    );
  }
}

const lightBlue = '#7FC4FD';
const darkBlue = '#2699FB';
const white = '#fff';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,

    alignItems: 'center',
    backgroundColor: darkBlue,
  },
  header: {
    width: '100%',
    display: 'flex',
    paddingTop: 60,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightBlue,
  },
  circleLogo: {
    width: 120,
    height: 120,
    borderRadius: 75,
    backgroundColor: white,
  },
  firstEl: {
    marginTop: 60,
  },
  formContainer: {
    width: '70%',
  },
  form: {
    backgroundColor: white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 6,
    width: '100%',
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 10,
    backgroundColor: white,
  },
  buttonText: {
    color: darkBlue,
    backgroundColor: white,
    textAlign: 'center',
  },
  text: {
    color: white,
    fontSize: 20,
    textAlign: 'left',
  },
});

export default UserLogin;
