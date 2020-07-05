//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from "react-native-elements";
import _ from 'lodash';

import firebase from '../Firebase';

// create a component
class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fullData: [],
      loading: false,
      error: null,
      query: ""
    }
  }

  componentDidMount() {
    this.getDataSearch();
  }

  getDataSearch = _.debounce(() => {
    this.setState({ loading: true })
    const users = firebase.database().ref('specialty').on('child_added', (res) => {

      res.forEach((snapVal) => {
        let data = snapVal.val();
        let fullData = snapVal.val();
        console.log(users)
        this.setState((prevState) => {
          return {
            data: [...prevState.data, data],
            fullData: [...prevState.fullData, fullData],
          }
        })
      })

    });

    fetch(users).then((res) => res.json())
      .then((resJson) => {
        this.setState({
          loading: false,
          data: resJson,
          fullData: resJson
        })
      }).catch(error => {
        this.setState({ error, loading: false })
      })

  }, 250)


  _renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} onPress={() => this.props.navigation.navigate('Profile01', item)}>
        <ListItem
          key={index}
          leftAvatar={{ source: { uri: item.photoURL } }}
        />
        <View>
          <Text>{item.displayName}</Text>
          <Text style={{ color: '#999' }}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  renderFooter = () => {
    if (this.state.loading) return null
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  }


  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();

    const data = _.filter(this.state.fullData, uid => {
      if (uid.displayName.includes(formattedQuery)) {
        return true
      }
      return false
    })
    this.setState({ data, query: text })
  };



  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 30, marginHorizontal: 15}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <TextInput
              placeholderTextColor='#888'
              placeholder='  Search ...'
              style={styles.searchInput}
              onChangeText={this.handleSearch}
            />

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ marginLeft: 5, color: '#999' }}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            // keyExtractor={(item, index) => index.toString}
            ListFooterComponent={this.renderFooter}
          />


        </View>

      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchInput: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 6,
    width: 280
  },
});

//make this component available to the app
export default Search;
