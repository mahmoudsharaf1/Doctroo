import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';

import firebase from '../Firebase';

export default class LoadingScreen extends Component {

      constructor(props) {
        super(props);
        // AsyncStorage.removeItem('fb_token')
        this.startApp();
    }


    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'App' : 'Auth')
      })
    }

    async startApp() {
        try {
        const token = await AsyncStorage.getItem('fb_token');
            if (token) {
                this.props.navigation.navigate('App')
            } else {
                this.props.navigation.navigate('Auth')    
            }
        } catch (e) {
            console.log(e)
        }
    };

  render() {
    return (
      <View style={styles.contanier}>
        <Text> Loading ... </Text>
        <ActivityIndicator  size='large' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
