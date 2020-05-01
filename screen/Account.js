import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import firebase from '../Firebase';

export default class Account extends Component {



  logout = async () => {
    firebase.auth().signOut()
  }


  render() {

    return (
      <View style={styles.contanier}>
        <Text onPress={this.logout}>Logout</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
