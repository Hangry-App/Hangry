import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from '../secrets';

class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordValidate: '',
    };
    this.attemptSignUp = this.attemptSignUp.bind(this);
    this.navToWelcome = this.navToWelcome.bind(this);
  }

  async attemptSignUp() {
    if (this.state.email && this.state.password) {
      if (
        this.state.password === this.state.passwordValidate &&
        this.state.email.includes('@', '.com')
      ) {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            );
          this.props.navigation.navigate('Main');
        } catch (err) {
          Alert.alert(err.toString());
        }
      } else if (!this.state.email.includes('@', '.com')) {
        Alert.alert('Please enter a valid email');
      } else if (this.state.password !== this.state.passwordValidate) {
        Alert.alert('Please check password matches');
      }
    } else {
      Alert.alert('Please fill out all fields');
    }
  }
  navToWelcome() {
    this.props.navigation.navigate('Welcome');
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
              placeholder="email@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ email: text })}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.form}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ password: text })}
            />
            <Text style={styles.text}>Password Validate</Text>
            <TextInput
              style={styles.form}
              placeholder="password validate"
              secureTextEntry={true}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ passwordValidate: text })}
            />
            <Button
              onPress={this.attemptSignUp}
              color={lightBlue}
              title="Log In"
            />
          </View>
        </View>
        <View style={styles.nav}>
          <TouchableWithoutFeedback onPress={this.navToWelcome}>
            <View>
              <Text style={styles.navButton}>{`<`}</Text>
            </View>
          </TouchableWithoutFeedback>
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
  nav: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  navButton: {
    fontSize: 40,
    color: white,
  },
});

export default UserSignUp;
