import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity, ImageBackground  } from 'react-native';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';

class SignupScreen extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePress() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/Login.v1.jpg')}
        style={styles.photo}>
        <View style={styles.container}>
          <Text style={styles.title1}>Friends Forever</Text>
          <Text style={styles.title2}>Welcome Frever!</Text>
          <TextInput
          style={styles.input}
            onChangeText={(text) => { this.setState({ email:text }); }}
            value = {this.state.email}
            placeholder='Email Address'
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid='transparent'
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => { this.setState({ password:text }); }}
            value = {this.state.password}
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
           <Text style={styles.buttonText}> Signup! </Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.createAccount}
            onPress={this.handlePress.bind(this)}>
            <Text style={styles.createAccountText}>Login</Text>
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

export default SignupScreen;
