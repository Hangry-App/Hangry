import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map, UserLogin, UserSignUp, Welcome } from './components';
import * as firebase from 'firebase';
import { firebaseConfig } from './secrets';
import { createSwitchNavigator } from 'react-navigation';



const App = createSwitchNavigator(
  {
    Welcome,
    UserLogin,
    UserSignUp,
    Map
  }, {
    initialRouteName: 'Welcome'
  }
)

export default App
