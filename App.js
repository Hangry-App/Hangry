import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map, UserLogin } from './components';
import * as firebase from 'firebase';
import { firebaseConfig } from './secrets'

export default class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  const testFieldResponse = firebase.database().ref('collection/testDoc/');
  firebase.database().ref('collection/testDoc/').set({
    testField: true,
  });
}

  render() {
    return (
      <View style={styles.container}>
        <UserLogin />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'rgb(220, 220, 220)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
