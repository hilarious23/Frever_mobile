import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Appbar extends React.Component {
  render() {
    return (
     <View style={styles.appbar}>
       <View>
         <Text style={styles.appbarTitle}>Frever</Text>
       </View>

     </View>
   );
  }
}

const styles = StyleSheet.create({
  appbar: {
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 30,
    backgroundColor: '#4eacd8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 10,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Appbar;
