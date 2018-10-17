import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log('success', user);

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);;
        console.log('login success!')
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
/*
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }
*/
  handlePress() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/Login.v1.jpg')}
        style={styles.photo}>
        <View style={styles.container}>
          <Text style={styles.title1}>Welcome Back!</Text>
          <Text style={styles.title2}>Frever</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(text) => { this.setState({ email: text }); }}
            placeholder='Email Address'
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid='transparent'
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }); }}
            placeholder='Password'
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            underlineColorAndroid='transparent'
          />
          <TouchableHighlight
           style={styles.button}
           onPress={this.handleSubmit.bind(this)}
           underlayColor='#e25a00'
          >
           <Text style={styles.buttonText}> Login </Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.createAccount}
            onPress={this.handlePress.bind(this)}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    flex: 1,
    alignItems: 'stretch',
    opacity: 0.72,
  },
  title1: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 4,
    height: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  title2: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 12,
    height: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  container: {
    padding: 24,
    justifyContent: 'center',
    marginTop: '50%',
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
  },
  button: {
    backgroundColor: '#ff6600',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '67%',
    alignSelf: 'center',
    marginBottom: 12,
    opacity: 0.92,
  },
  buttonText: {
    color: '#fff',
    fontSize:18,
    fontWeight: 'bold',
  },
  createAccount: {
    alignSelf: 'center',
  },
  createAccountText: {
    fontSize: 16,
  },
});

export default LoginScreen;
