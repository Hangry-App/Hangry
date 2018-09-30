import React, { Component } from 'react';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo';

class UserLogin extends Component {
  constructor() {
    super();
    let state = {
      email: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#59DFF8', '#0ED2F7']}
          style={styles.container}
        >
          <FormLabel labelStyle={styles.text}>Email</FormLabel>
          <FormInput
            containerStyle={styles.form}
            defaultValue={'email@email.com'}
          />
          <FormLabel labelStyle={styles.text}>Password</FormLabel>
          <FormInput containerStyle={styles.form} defaultValue={'password'} />
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
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
