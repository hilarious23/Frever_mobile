import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

import CircleButton from '../elements/CircleButton';

const dateString = (date) => {
  if (date == null) { return ''; }
  const str = date.toISOString();
  return str.split('T')[0];
}


class FriendDetailScreen extends React.Component {
  state = {
    friend: {},
    key: "",
    fav: false,
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    console.log(params);

    const {currentUser} = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/friends`).doc(`${params.friendId}`).get().then((doc) => {
      const friend = doc.data();

      this.setState({
        friend: friend,
        key: params.friendId,
        fav: friend.fav,
      })
    })
  }


  returnFriend(returnedValue) {
    console.log("returned",returnedValue);
    this.setState({
      friend: returnedValue.friend,
      key: returnedValue.key,
      fav: returnedValue.fav
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/friends`).doc(this.state.key).delete()
      .then(() => {
        console.log('Deleted');
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = new Date();

    const updatedFav = !this.state.fav;

    // firebaseのfavの値を更新
    db.collection(`users/${currentUser.uid}/friends`).doc(this.state.key)
      .update({
        fav: updatedFav,
      })
      .catch((error) => {
        console.log('error');
      });

    // stateを更新
    this.setState({
      fav: updatedFav,
    })
  }

  handleBack() {
    this.props.navigation.goBack();
  }


  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>

        <View style={styles.headerBox}>

          <TouchableHighlight
            style={styles.backButton}
            onPress={this.handleBack.bind(this)}
            underlayColor='transparent'>
            <Icon name = {'angle-left'} style={styles.backIcon} />
          </TouchableHighlight>

          <Text style={styles.headerText}>{this.state.friend.name}</Text>
        </View>

        <View style={styles.FriendHeader}>
          <Text style={styles.FriendHeaderTitle}>{this.state.friend.name}</Text>
          <Text style={styles.FriendHeaderUrl}>{this.state.friend.url}</Text>
          <Text style={styles.FriendHeaderDate}>(Last update: {dateString(this.state.friend.createdOn)})</Text>
        </View>

        <CircleButton
          style={styles.funcButton}
          onPress={ this.handlePress.bind(this) }>
          {'trash'}
        </CircleButton>

        <CircleButton
          style={styles.favStar}
          fav={this.state.fav}
          onPress={this.handleClick.bind(this)}>
          {'star'}
        </CircleButton>

        <CircleButton
           style={styles.editButton}
           onPress={() => { this.props.navigation.navigate('FriendEdit',  { friend: this.state.friend, fav: this.state.fav, key: this.state.key ,returnFriend: this.returnFriend.bind(this) }); }}>
           {'pencil'}
         </CircleButton>

        <View style={styles.FriendContent}>
          <Text style={styles.FriendBody}>
            {this.state.friend.body}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  headerBox: {
    paddingTop: 48,
    maxHeight: 72,
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
    top: 24,
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
  FriendHeader: {
    height: 126,
    backgroundColor: '#17313C',
  },
  FriendHeaderTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    fontSize: 24,
  },
  FriendHeaderUrl: {
    color: '#fff',
    marginBottom: 4,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
  },
  FriendHeaderDate: {
    fontSize: 12,
    color: '#fff',
    paddingLeft: 16,
  },
  FriendBody: {
    lineHeight: 24,
    fontSize: 15,
  },
  editButton: {
    position: 'absolute',
    top: -40,
    zIndex: 100,
  },
  FriendContent: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    zIndex: -10,
  },
  funcButton: {
    position: 'absolute',
    width: 32,
    height: 32,
    margin: 8,
    borderRadius: 36,
    zIndex: 20,
    backgroundColor: '#4eacd8',
    top: -172,
    right: -2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 0.0,
  },
  favStar: {
    position: 'absolute',
    top: -132,
    right: -4,
    backgroundColor: '#17313C',
    width: 36,
    height: 36,
    margin: 8,
    borderRadius: 36,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});

export default FriendDetailScreen;
