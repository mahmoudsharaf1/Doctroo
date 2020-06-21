import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import * as Permissions from 'expo-permissions';

import firebase from '../Firebase';

export default class LoadingScreen extends Component {

      constructor(props) {
        super(props);
        this.getLocation();
        // AsyncStorage.removeItem('type')
        // this.startApp();
    }

    async getLocation () {
      try{
          
          const { status } = await Permissions.askAsync(Permissions.LOCATION);
          if (status !== 'granted') {
              console.log(' permisstion denid ');
          }

      } catch (e) {
          console.log(e);
      }
  }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'App' : 'Auth')
      })
    }

    // async startApp() {
    //     try {
    //     const token = await AsyncStorage.getItem('type');
    //         if (token) {
    //             this.props.navigation.navigate('App')
    //         } else {
    //             this.props.navigation.navigate('Auth')    
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };

  render() {
    return (
      <View style={styles.contanier}>
        <Image
          style={{ flex: 1, width: '100%'}} 
          source={require('../images/photoApp/logo.png')}
          // startApp={this.startApp.bind(this)} 
        />
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
