import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map } from './components'
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
      <Map />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
