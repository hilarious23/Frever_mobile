import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, FlatList } from 'react-native';


class FriendList extends React.Component {
  renderFriend({ item }) {
    return(
      <TouchableHighlight onPress={() => {this.props.navigation.navigate('FriendDetail', {friendId: item.key}); }}>
        <View style={styles.friendListItem}>
          <Text style={styles.friendName}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.friendList}>
        <FlatList data={this.props.friendList} renderItem={this.renderFriend.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendList: {
    width: '100%',
    flex: 1,
    marginTop: 2,
  },
  friendListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  friendName: {
    fontSize: 18,
    marginVertical: 2,
  },
  friendDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default FriendList;
