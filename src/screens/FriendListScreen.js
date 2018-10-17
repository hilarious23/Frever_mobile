import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';

import FriendList from '../components/FriendList';
import CircleButton from '../elements/CircleButton';


class FriendListScreen extends React.Component {
  state = {
    friendList: [],
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/friends`)
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
    this.props.navigation.navigate('FavFriend');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.searchBox}>
          <TextInput
             style={styles.search}
             placeholder='Search...'
             value={this.state.text}
             underlineColorAndroid="transparent"
           />
        </View>

        <FriendList friendList={this.state.friendList} navigation={this.props.navigation} />

        <CircleButton
          onPress={this.handlePress.bind(this)}>
          { "user-plus" }
        </CircleButton>

        <CircleButton
          style={styles.favStar}
          onPress={this.handleClick.bind(this)}>
          {'star'}
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
  searchBox: {
    paddingTop: 48,
    maxHeight: 70,
    width: '100%',
    backgroundColor: '#4eacd8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    zIndex: -100,
  },
  search: {
    top: -16,
    height: 36,
    fontSize: 18,
    marginHorizontal: 10,
    backgroundColor: '#4eacd8',
    borderBottomWidth: 0.5,
    borderBottomColor: '#99aac6',
    borderBottomEndRadius: 100,
  },
  favStar: {
    top: -644,
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
  favStarText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 24,
    paddingRight: 4,
    paddingVertical: 4,
  },
});

export default FriendListScreen;
