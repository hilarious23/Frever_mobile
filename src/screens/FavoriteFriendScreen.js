import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

import FriendList from '../components/FriendList';
import CircleButton from '../elements/CircleButton';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


class FavoriteFriendScreen extends React.Component {
  state = {
    friendList: [],
    fav: true,
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/friends`)
      .orderBy('fav')
      .where('fav','>=',true)
      .orderBy('createdOn', 'desc')
      .onSnapshot((snapshot) => {
        const friendList = [];
        snapshot.forEach((doc) => {
          friendList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ friendList: friendList });
      });
  }

  handlePress() {
    this.props.navigation.navigate('NewFriend');
  }

  handleClick() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleBack() {
    this.props.navigation.goBack();
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.appBar}>
          <TouchableHighlight
            style={styles.backButton}
            onPress={this.handleBack.bind(this)}
            underlayColor='transparent'>
            <Icon name = {'angle-left'} style={styles.backIcon} />
          </TouchableHighlight>

          <Text style={styles.headerText}>Favorite</Text>

          <CircleButton
            style={styles.favStar}
            fav={this.state.fav}
            onPress={this.handleClick.bind(this)}>
            {'star'}
          </CircleButton>
        </View>

        <FriendList friendList={this.state.friendList} navigation={this.props.navigation} />
        <CircleButton onPress={this.handlePress.bind(this)}>
          {'user-plus'}
        </CircleButton>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      backgroundColor: '#FFFDF6',
  },
  appBar: {
    paddingTop: 48,
    width: '100%',
    backgroundColor: '#4eacd8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    zIndex: -100,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    top: -12,
    fontWeight: 'bold',
  },
  backButton: {
    top: 20,
    left: 0,
    position: 'absolute',
    width: 32,
    height: 32,
    margin: 8,
    borderRadius: 36,
    zIndex: 20,
    backgroundColor: '#4eacd8',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 0.0,
  },
  backIcon: {
    fontSize: 36,
    color: '#fff',
  },
  favStar: {
    top: -48,
    right: -4,
    width: 36,
    height: 36,
    margin: 8,
    borderRadius: 36,
    zIndex: 20,
    backgroundColor: '#4eacd8',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 0.0,
  },
});

export default FavoriteFriendScreen;
