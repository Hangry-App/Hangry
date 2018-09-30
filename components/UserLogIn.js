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
        <LinearGradient
          colors={['#59DFF8', '#0ED2F7']}
          style={styles.container}
        >
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.form}
            defaultValue={'email@email.com'}
            clearTextOnFocus={true}
            autoCapitalize={'none'}
            onChangeText={text => this.setState({ email: text })}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.form}
            defaultValue={'password'}
            clearTextOnFocus={true}
            secureTextEntry={true}
            autoCapitalize={'none'}
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            onPress={this._onPressButton}
            style={styles.button}
            title="Log In"
          />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2699FB',
  },
  form: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginVertical: 6,
    width: '70%',
    borderRadius: 5,
  },
  button: {
    width: '60%',
    height: 20,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#2699FB',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'left',
  },
});

export default UserLogin;
