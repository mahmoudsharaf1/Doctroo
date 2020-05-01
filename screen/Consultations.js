import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Consultations extends Component {

  state = {
    active: 'Chats'
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;
    
    return (
    <TouchableOpacity 
      key={`tab${tab}`}
      onPress={() => this.setState({ active: tab })}
      style={[ styles.tab, isActive ? styles.active : null]}
    >
      <Text>{tab}</Text>
    </TouchableOpacity>
    )
  }
  render() {
    const tabs = ['Chats', 'Calls']
    return (
      <View style={styles.contanier}>
        <View style={{marginHorizontal: 13, top: 32}}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name='ios-arrow-back' size={30} onPress={() => this.props.getback()} />
          <View style={styles.iconSearch}>
            <Ionicons name='ios-search' size={30} style={styles.iconSearch} />
          </View>
        </View>
          <Text style={{top: 23, fontSize: 25, fontWeight: 'bold'}}>Consultations</Text>
        <View style={styles.tabs}>
            {tabs.map(tab => this.renderTab(tab))}
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  iconSearch: {
    flex: 1,
    textAlign: 'right'
  },
  tabs: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 38 ,
    flexDirection: 'row'
  },
  tab: {
    marginRight: 25,
    paddingBottom: 18
  },
  active: {
    borderBottomColor: '#006fff',
    borderBottomWidth: 3
  },
  isActive: {
    color: '#006fff'
  }
})
