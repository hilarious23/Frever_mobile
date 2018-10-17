import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';
import Icon from 'react-native-vector-icons/FontAwesome';

class FriendEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      url: '',
      key: '',
      fav: false,
    }
  }

  componentWillMount() {
    // const { params } = this.props;
    // console.log("edit内", params)
    const params = this.props.navigation.state.params;
    console.log("this,props", params);
    this.setState({
      body: params.friend.body,
      name: params.friend.name,
      url: params.friend.url,
      key: params.key,
      fav: params.fav,
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = new Date();
    db.collection(`users/${currentUser.uid}/friends`).doc(this.state.key)
      .update({
        body: this.state.body,
        name: this.state.name,
        url: this.state.url,
        createdOn: newDate,
        fav: this.state.fav,
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnFriend({
          friend: {
            body: this.state.body,
            name: this.state.name,
            url: this.state.url,
            createdOn: newDate,
          },
          key: this.state.key,
          fav: this.state.fav,
        });
        //navigation.goBack();
      })
      .catch((error) => {
        console.log('error');
      });
    
    this.props.navigation.navigate("FriendDetail", { friendId: this.state.key })
  }

  handlePressFav() {
    const updatedFav = !this.state.fav;
    console.log(updatedFav)
    this.setState({ fav : updatedFav })
  }

  render() {
    console.log("friend screen", this.state)
    return (
      <View style={styles.container}>

        <View style={styles.appBar}>

          <TouchableHighlight
            style={styles.backButton}
            onPress={this.handlePress.bind(this)}
            underlayColor='transparent'>
            <Icon name = {'angle-left'} style={styles.backIcon} />
          </TouchableHighlight>

          <Text style={styles.headerText}>Frever</Text>

        </View>

        <TextInput
          style={styles.FriendEditName}
          multiline
          blurOnSubmit={false}
          placeholder='Name'
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.name}
          onChangeText={(text) => { this.setState({ name: text }); }}
          underlineColorAndroid="transparent"
        />

        <CircleButton
          onPress= {this.handlePressFav.bind(this)}
          fav={this.state.fav}
          style={styles.favStar}>
          { 'star' }
        </CircleButton>

        <TextInput
          style={styles.FriendEditUrl}
          multiline
          blurOnSubmit={false}
          placeholder='Facebook URL'
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.url}
          onChangeText={(text) => { this.setState({ url: text }); }}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.FriendEditBody}
          multiline
          blurOnSubmit={false}
          placeholder='Personal Infomation'
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body: text }); }}
          underlineColorAndroid="transparent"
        />

        <CircleButton onPress= {this.handlePress.bind(this)}>
          { 'check' }
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
  },
  appBar: {
    paddingTop: 48,
    maxHeight: 82,
    width: '100%',
    backgroundColor: '#4eacd8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    zIndex: 10,
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
  FriendEditName: {
    backgroundColor: '#ddd',
    textAlignVertical: 'top',
    flex: 0.4,
    paddingTop: 28,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 24,
  },
  FriendEditUrl: {
    backgroundColor: '#9fa1a3',
    textAlignVertical: 'top',
    flex: 0.2,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
  FriendEditBody: {
    textAlignVertical: 'top',
    flex: 6,
    lineHeight: 24,
    fontSize: 15,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  favStar: {
    top: -80,
    right: -4,
    backgroundColor: '#ddd',
    width: 36,
    height: 36,
    margin: 8,
    borderRadius: 36,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  CircleButton: {
    backgroundColor: '#ddd',
    width: 36,
    height: 36,
    margin: 8,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  CircleIcon: {
    fontSize: 20,
    color: '#333333',
    lineHeight: 28,
  },
});

export default FriendEditScreen;
