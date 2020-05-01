import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class OverView extends Component {
  render() {
    return (
      <View style={styles.contanier}>
        <Text onPress={() => this.props.navigation.navigate('Browse01')} > go  </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
