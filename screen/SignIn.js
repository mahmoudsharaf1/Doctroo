import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../Firebase';

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handelLogin = () => {
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error=> this.setState({errorMessage: error.message}))
  }
  render() {
    return (
      <View style={styles.contanier}>
        <Text style={styles.greeting}>{`Hello again.\nWelcome Back`}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput 
                style={styles.input} 
                autoCapitalize= 'none'
                keyboardType='email-address'
                onChangeText={email => this.setState({email})} 
                value={this.state.email}
                />
            </View>

            <View style={{marginTop:15}}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput style={styles.input} autoCapitalize= 'none'
                  secureTextEntry
                  onChangeText={password => this.setState({password})} 
                  value={this.state.password}
                  />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handelLogin}>
            <Text style={{color: '#FFF', fontWeight: '500'}}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => this.props.navigation.navigate('CreateAccount')}>
            <Text style={{color: 'gray', fontSize: 13 }}>
              New To SocialApp? <Text style={{color: '#E9446A', fontSize: 15}}> Sign Up</Text>
            </Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: 'white'
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    fontWeight: '500'
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: 'gray',
    fontSize: 10,
    textTransform: 'uppercase'
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 80,
    fontSize: 15,
    color: 'blue'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
