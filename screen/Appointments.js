import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { fetchMeeting } from '../actions';
import firebase from '../Firebase';

const { width } = Dimensions.get("window");

class Appointments extends Component {



  state = {
    users: [],
    active: 'Upcoming',
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    translateY: -1000
  }

  componentWillMount() {
    const {profile} = this.props
    firebase.database().ref('meeting').child(profile.uid).on('child_added', (val) => {
      let person = val.val();
      person.uid = val.key;

      this.setState((prevState) => {
        return {
          users: [...prevState.users, person]
        }
      })
    })
  }

  renderRow = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Details', { item })}
        style={{ flexDirection: 'row', marginTop: 15 }}>
        <Image
          source={item.profileDoctor ? { uri: item.profileDoctor.photoURL } : { uri: item.profile.photoURL }}
          style={{ width: 75, height: 75, resizeMode: 'cover', borderRadius: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>{item.profileDoctor ? item.profileDoctor.displayName : item.profile.displayName}</Text>
          <Text style={{ fontSize: 15, color: '#000' }}>{item.meeting.selected}</Text>
          <Text style={{ fontSize: 13, color: '#999' }}>{item.meeting.time}</Text>
        </View>

      </TouchableOpacity>
    )
  };

  componentDidMount() {
    this.props.fetchMeeting()
  }

  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver: true
        }).start()
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }).start()
      ]);
    }
  };



  render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateY
    } = this.state;

    console.log(this.state.users)
    return (
      <View style={styles.contanier}>
        <View style={{ top: 32 }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 13 }}>
            <Ionicons name='ios-arrow-back' size={30} />
            <View style={styles.iconSearch}>
              <Ionicons name='ios-search' size={30} style={styles.iconSearch} />
            </View>
          </View>

            <Text style={{ top: 23, fontSize: 32, fontWeight: 'bold', marginHorizontal: 13 }}>Appointments</Text>
          <View>
            <View style={styles.tabs}>
              <Animated.View
                style={{
                  position: "absolute",
                  width: "16%",
                  height: "100%",
                  top: 0,
                  left: 5,
                  borderBottomWidth: 3,
                  borderBottomColor: '#1590f0',
                  transform: [{ translateX }],
                }}
              />

              <TouchableOpacity style={styles.tab}
                onLayout={event => this.setState({ xTabOne: event.nativeEvent.layout.x })}
                onPress={() => this.setState({ active: 0 }, () => this.handleSlide(xTabOne))}
              >

                <Text style={{ color: '#000' }}>Upcoming</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tab}
                onLayout={event => this.setState({ xTabTwo: event.nativeEvent.layout.x })}
                onPress={() => this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))}
              >
                <Text style={{ color: '#000' }}>Previous</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <ScrollView style={{ marginTop: 40, marginHorizontal: 15, marginBottom: 20 }} showsVerticalScrollIndicator={false} >
          <Animated.View
            style={{ transform: [{ translateX: translateXTabOne }] }}
            onLayout={event => this.setState({ translateY: event.nativeEvent.layout.height })}
          >
            <FlatList
              data={this.state.users}
              renderItem={this.renderRow}
              keyExtractor={(item) => item.uid}
            />
          </Animated.View>
        </ScrollView>

        <Animated.View style={{ transform: [{ translateX: translateXTabTwo }, { translateY: -translateY }] }}>

        </Animated.View>

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
    marginTop: 38,
    flexDirection: 'row',
    marginHorizontal: 13
  },
  tab: {
    marginRight: 21,
    paddingBottom: 18
  },

})

const mapStateToProps = ({ meetings, authProfile }) => {
  return {
    fetching: meetings.fetching,
    result: meetings.result,
    profile: authProfile.profile
  }
}


export default connect(mapStateToProps, { fetchMeeting })(Appointments);