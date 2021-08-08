import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import * as Permissions from 'expo-permissions';

import firebase from '../Firebase';

export default class LoadingScreen extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
    })
    // this.getLocation();
  };


  // getLocation = async () => {
  //   try {

  //     await navigator.geolocation.getCurrentPosition((position) => {

  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null,
  //       });

  //       console.log(position.coords.latitude)
  //       console.log(position.coords.longitude)
  //     },
  //       (error) => this.setState({ error: error.message }),
  //       { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 }
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
          style={{ flex: 1, width: '100%' }}
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
