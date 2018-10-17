/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';

import FriendListScreen from './src/screens/FriendListScreen';
import FriendDetailScreen from './src/screens/FriendDetailScreen';
import FriendEditScreen from './src/screens/FriendEditScreen';
import NewFriendScreen from './src/screens/NewFriendScreen';
import FavoriteFriendScreen from './src/screens/FavoriteFriendScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

require("firebase/firestore");
import ENV from './env.json';

const config = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRO_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);
/*
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
*/

const App = createStackNavigator({
  Login: {screen: LoginScreen },
  Signup: {screen: SignupScreen },
  Home: { screen: FriendListScreen },
  NewFriend: {screen: NewFriendScreen },
  FavFriend: {screen: FavoriteFriendScreen },
  FriendDetail: { screen: FriendDetailScreen },
  FriendEdit: {screen: FriendEditScreen },
},{
  navigationOptions: {
    header: null,
  },
});

export default App;
