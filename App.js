import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map, UserLogin } from './components';

export default class App extends React.Component {
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
