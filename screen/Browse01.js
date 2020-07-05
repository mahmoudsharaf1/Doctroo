import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Icon, Divider } from 'react-native-elements';

import firebase from '../Firebase';
import { specialty } from '../contacts';
import Favorites from '../contacts/Favorites';



const { height, width } = Dimensions.get('window')



class Browse01 extends Component {



  state = {
    users: [],
    error: null,
    loading: false,
    specialty: []
  }


  componentDidMount() {


    firebase.database().ref('specialty').on('child_added', (val) => {
      val.forEach((snapVal) => {
        let users = snapVal.toJSON();
        // users.uid = val.key
        console.log(users)
        this.setState((prevState) => {
          return {
            users: [...prevState.users, users]
          }
        })
      })
     
    })

    
    firebase.database().ref('specialty').on('child_added', (val) => {
      let specialty = val.val();
      specialty.id = val.key;

      this.setState((prevState) => {
        return {
          specialty: [...prevState.specialty, specialty]
        }
      })
    })
  }


  renderRowusers = ({ item }) => {
    return (
      <View>
        <View>
          <TouchableOpacity
            style={{ borderRadius: 5 }}
            onPress={() => this.props.navigation.navigate('Profile01', { item })}
          >
          <View style={{marginRight: 10}}>
            <Favorites />
          </View>

            <Image
              source={{ uri: item.photoURL }}
              style={{ flex: 1, width: width / 1.1, height: height / 2.6, resizeMode: 'cover', borderRadius: 10, marginRight: 5, marginTop: 10 }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>{item.displayName}</Text>
            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>${item.hourlyRate}/hr</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Icon name='ios-pin' type='ionicon' size={15} color='#999' />
            <Text style={{ color: '#777' }}> {item.address} ,</Text>
            <Text style={{ color: '#777' }}> {item.specialty}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text> {item.experience}
              <Text style={{ color: '#999' }}> Years Experience</Text>
            </Text>
          </View>
          <Divider />
        </View>
      </View>
    )
  };


  renderItem = ({ item, index }) => {


    return (
      <TouchableOpacity style={{ marginLeft: 10 }}  onPress={() => this.props.navigation.navigate('Specialty', { item })}>

        <View style={{  backgroundColor: '#1590f0', width: 100, height: 100, borderRadius: 7 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: item.image}} 
               style={{  flex: 1, width: width / 4.1, height: height / 1, resizeMode: 'cover', borderRadius: 10, marginTop: 10 }}
            />
          </View>

        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{item.id}</Text>
        </View>
      </TouchableOpacity>
    )
  };



  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.logout}>
        <View style={{ marginHorizontal: 10, top: 32 }}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name='ios-pin' type='ionicon' />
              <Text style={styles.location}>Location</Text>
            </View>
            <TouchableOpacity style={styles.search} onPress={() => navigation.navigate('Search')}>
              <Ionicons name='ios-search' size={25} style={styles.search} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 22 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Browse</Text>
          </View>

          <View style={{ marginTop: 20 }}>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Categories')} >
              <Text style={styles.seeAll}>{`See all >`}</Text>
            </TouchableOpacity>

          </View>


          <View style={{ flexDirection: 'row' }}>
            <ScrollView style={{ marginTop: 20, flex: 1, marginRight: 10 }} horizontal showsHorizontalScrollIndicator={false}>

              <View style={styles.categories}>
                <FlatList
                  horizontal
                  data={this.state.specialty}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.uid}
                />
              </View>
            </ScrollView>
          </View>


          <View style={styles.filter}>

            <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={{ borderRightWidth: .5, marginLeft: 5 }}>
              <Text style={{ marginLeft: 10, marginRight: 10 }}>Top Rated    -  </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Map')} style={{ flexDirection: 'row', borderRightWidth: .5 }}>
              <Icon name='ios-map' type='ionicon' size={20} />
              <Text style={{ marginRight: 30 }}>  Map</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('TopRated')} style={{ flexDirection: 'row' }}>
              <Icon name='ios-funnel' type='ionicon' size={20} />
              <Text style={{ marginRight: 15 }}>  Filter</Text>
            </TouchableOpacity>

          </View>
        </View>

        <ScrollView style={{ marginTop: 40, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
          <FlatList
            data={this.state.users}
            renderItem={this.renderRowusers}
            keyExtractor={(item) => item.uid}
          />
        </ScrollView>

      </View>
    )
  }
}

Browse01.defaultProps = {

  categories: specialty.categories,

}

export default Browse01;


const styles = StyleSheet.create({
  logout: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  search: {
    flex: 1,
    textAlign: 'right',
  },
  location: {
    flexDirection: 'row',
    textAlign: 'left',
    fontSize: 16,
    marginLeft: 4
  },
  tab: {
    backgroundColor: 'rgb(243, 240, 240)',
    paddingVertical: 7,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginRight: 7,
  },
  seeAll: {
    textAlign: 'right',
    color: '#1590f0'
  },
  filter: {
    flexDirection: 'row',
    borderWidth: .5,
    marginTop: 15,
    height: 38,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  chield: {
    marginRight: 20,
    textAlign: 'center',
    borderRightWidth: .2
  },
  feed: {
    marginHorizontal: 16,
    marginTop: 40
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  like: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 15,
    flexDirection: 'row',
    marginRight: 10
  }
})