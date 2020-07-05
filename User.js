//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Dimensions } from 'react-native';
import { Icon, Divider, Avatar } from 'react-native-elements';

import firebase from '../Firebase';
// create a component
class ChatScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: this.props.navigation.getParam('chat'),
      profile: this.props.navigation.getParam('user'),
      textMessags: '',
      messageList: [],
      dbRef: firebase.database().ref('users')
    }
  }

  componentWillMount() {
    firebase.database().ref('messages').child(this.state.profile.uid)
      .on('child_added', (value) => {
        this.setState((prevState) => {
          return {
            messageList: [...prevState.messageList, value.val()]
          }
        })
      })
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  sendMessage = async () => {
    if (this.state.textMessags.length > 0) {
      let msgId = firebase.database().ref('messages').child(this.state.profile.uid).push().key;
      let updates = {};
      let message = {
        message: this.state.textMessags,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: this.state.profile.uid
      }
      updates['messages/' + '/' + this.state.profile.uid + '/' + msgId] = message
      firebase.database().ref().update(updates)
      this.setState({ textMessags: '' })
    }
  }

  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    // get Month and Day

    // if(c.getDay !== d.getDay()) {
    //     result = d.getDay() + ' ' + d.getMonth() + ' ' + result     
    // }
    return result;
  }

  renderRow = ({ item }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: '60%',
            alignSelf: item.from === this.state.profile.uid ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === this.state.profile.uid ? '#1590f9' : '#eee',
            borderRadius: 15,
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>  {item.message}  </Text>
        </View>
        <View>
          <Text style={{ color: 'gray', fontSize: 10, textAlign: 'right' }}>{this.convertTime(item.time)}  </Text>
        </View>
      </View>
    )
  }

  render() {
    let { height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: 15, flex: 1, marginTop: 30 }}>

          <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity>
                <Icon name='chevron-left' type='fontawesom' size={50} onPress={() => this.props.navigation.goBack()} />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                  size={30}
                  rounded
                  source={{ uri: this.state.person.photoURL }}

                />
                <Text style={{ fontWeight: 'bold' }}>{this.state.person.displayName}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: 15 }} >
                <Icon name='ios-videocam' type='ionicon' size={23} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='ios-call' type='ionicon' size={23} />
              </TouchableOpacity>
            </View>
          </View>
          <Divider />


          <SafeAreaView style={styles.messageList}>

            <FlatList
              ref={ref => this.flatList = ref}
              onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
              onLayout={() => this.flatList.scrollToEnd({ animated: true })}
              style={{ padding: 10, height: height * 0.8 }}
              data={this.state.messageList}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <TextInput
                style={styles.input}
                placeholder='Type message...'
                placeholderTextColor='#999'
                value={this.state.textMessags}
                onChangeText={this.handleChange('textMessags')}
              />

              <TouchableOpacity onPress={this.sendMessage}
                style={styles.btnSend}>
                <Icon
                  name='ios-paper-plane'
                  type='ionicon'
                  color='#1590f0'
                  size={40}
                />
              </TouchableOpacity>

            </View>

          </SafeAreaView>

        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    width: '85%',
    marginBottom: 10,
    borderRadius: 10,
    marginRight: 7,
    backgroundColor: '#eee'
  },
  btnSend: {
    marginBottom: 10,
    marginLeft: 5,
    // borderRadius: 30,
    // padding: 10,
    // paddingTop: 7,
    // paddingBottom: 7,
    // backgroundColor: '#1590f9',
    borderRadius: 20
  }
});

//make this component available to the app
export default ChatScreen;






















import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Icon, Divider } from 'react-native-elements';

import firebase from '../Firebase';
import { specialty } from '../contacts';
import Favorites from '../contacts/Favorites';

const { height, width } = Dimensions.get('window')

class Browse01 extends Component {


  constructor(props) {
    super(props);
    this.state = {
      addedToFavorite: false,
      users: [],
      categories: [],
      error: null,
      loading: false,
      uid: null
    };

    this.addToFavorite = this.addToFavorite.bind(this);
  };

  addToFavorite() {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref(`users/doctors/` + this.state.uid).child('favorit').child(uid).set(this.state.addedToFavorite)
    this.setState({
      addedToFavorite: !this.state.addedToFavorite
    });

  }


  componentDidMount() {

    this.handleItem();

    firebase.database().ref('users/doctors/').on('child_added', (val) => {
      let users = val.val();
      users.uid = val.key;

      this.setState({
        uid: users.uid
      })

      this.setState((prevState) => {
        return {
          users: [...prevState.users, users]
        }
      })
    })
    this.setState({ categories: this.props.categories });


  }



  handleItem = () => {
    const { categories } = this.props;

    this.setState({ loading: true })

    const doctor = categories;
    fetch(doctor).then((res) => res.toString())
      .then((resJson) => {
        this.setState({
          loading: false,
          categories: resJson
        })

      }).catch(error => {
        this.setState({ error, loading: false })
      })

  }



renderRowusers = ({ item }) => {
  const { addedToFavorite } = this.state;
  const uid = firebase.auth().currentUser.uid

  return (
    <View>
      <View>
        <TouchableOpacity
          style={{ borderRadius: 5 }}
          onPress={() => this.props.navigation.navigate('Profile01', { item })}
        >
          <TouchableOpacity style={styles.like} onPress={this.addToFavorite}>
            <FontAwesome name='heart' size={32} accessibilityValue={this.state.users} style={{ color: addedToFavorite ? '#ff0000' : '#fff', textAlign: 'right', flex: 1 }} />
          </TouchableOpacity>

          <Image
            source={{ uri: item.photoURL }}
            style={{ flex: 1, width: width / 1.1, height: height / 3, resizeMode: 'cover', borderRadius: 10, marginRight: 5, marginTop: 10 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginTop: 10 }}>{item.displayName}</Text>
          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginTop: 10 }}>${item.hourlyRate}/hr</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Icon name='ios-pin' type='ionicon' size={15} color='#999' />
          <Text style={{ color: '#777' }}> {item.address} ,</Text>
          <Text style={{ color: '#777' }}> {item.specialty}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {/* <Text>{item.specialty} - </Text> */}
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

  const { navigation } = this.props;

  return (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Expoler', { item })}>

      <View style={{ backgroundColor: '#1590f0', width: 100, height: 100, borderRadius: 7 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={item.images} />
        </View>

      </View>

      <View>
        <Text style={{ fontWeight: '700' }}>{item.name}</Text>
        <Text style={{ color: '#999' }}>{item.count} doctors</Text>
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
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Map')}>
            <Icon name='ios-pin' type='ionicon' />
            <Text style={styles.location}>Location</Text>
          </TouchableOpacity>
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
                data={this.state.categories}
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
    color: '#006fff'
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

























import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';


import firebase from '../Firebase';
import { fetchSpecialty } from '../actions';


const { height, width } = Dimensions.get('window')


const photo = [
    {
        id: 'Plants',
        name: 'order',
        tags: ['products', 'inspirations'],
        count: 147,
        images: require('../images/heart.png')
    },
    {
        id: 'seeds',
        name: 'Seeds',
        tags: ['products', 'shop'],
        count: 16,
        images: require('../images/heart.png')
    },
    {
        id: 'flowers',
        name: 'Flowers',
        tags: ['products', 'inspirations'],
        count: 68,
        images: require('../images/heart.png')
    },
    {
        id: 'sprayers',
        name: 'Sprayers',
        tags: ['products', 'shop'],
        count: 17,
        images: require('../images/heart.png')
    },
    {
        id: 'pots',
        name: 'Pots',
        tags: ['products', 'shop'],
        count: 47,
        images: require('../images/heart.png')
    },
    {
        id: 'fertilizers',
        name: 'Fertilizers',
        tags: ['products', 'shop'],
        count: 9,
        images: require('../images/heart.png')
    },

]; 
class Categories extends Component {


    state = {
        error: null,
        loading: false,
        specialty: []
    }


    componentDidMount() {
        // this.props.fetchSpecialty()

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



    renderItem = ({ item }) => {


        return (
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.props.navigation.navigate('Specialty', { item })} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ backgroundColor: '#1590f0', width: 100, height: 100, borderRadius: 7 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                            <Image source={photo.images}
                                style={{ flex: 1, width: width / 4.1, height: height / 1, resizeMode: 'cover', borderRadius: 10, marginTop: 10 }}
                            />
                        </View>
                    </View>

                    <View style={{ marginLeft: 13 }}>
                        <Text style={{ fontWeight: '700' }}>{item.id}</Text>
                        <Text style={{ color: '#999', marginTop: 5 }}>{} doctors</Text>
                    </View>

                </View>
                <View  style={{ alignItems: 'flex-end' }}>
                    <Divider style={{ width: width / 1.66 }} />
                </View>
            </TouchableOpacity>
        )
    };



    render() {
        // if(this.props.fetching) return <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} size='large' />

        // console.log(this.props.result);

        return (
            <View style={styles.logout}>
                <View style={{ marginHorizontal: 15 }}>

                    <View style={{ flexDirection: 'row', marginTop: 32 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} style={styles.location} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Categories</Text>
                    </View>

                </View>

                <ScrollView style={{ marginTop: 40, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.specialty}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                    />
                </ScrollView>

            </View>
        )
    }
}


const mapStateToProps = ({ specialty }) => {
    return {
        fetching: specialty.fetching,
        result: specialty.result
    }
}


export default connect(mapStateToProps, { fetchSpecialty })(Categories);


const styles = StyleSheet.create({
    logout: {
        flex: 1,
        backgroundColor: '#fff'
    },
    search: {
        flex: 1,
        textAlign: 'right',
    },
    location: {
        flexDirection: 'row',
        textAlign: 'left',
    },
})