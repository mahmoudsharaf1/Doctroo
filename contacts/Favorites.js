//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import firebase from '../Firebase';


const { width, height } = Dimensions.get('window')

// create a component
class Favorites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      uid: null,
      fav: false
    };
  };

  componentDidMount() {

    this.dataDoctors()
  };



  componentWillReceiveProps() {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref('users/profiles/' + this.state.uid).child('favorit').child(uid).on('value', snap => {
      console.log(snap)
      this.setState({
        fav: snap
      })
    })
  }


  likeImage = async () => {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref(`users/profiles/${this.state.uid}`)
      .child('favorit').child(uid).set(!this.state.liked);

    const likeState = await !this.state.liked
    this.setState({ liked: likeState })
  };



  dataDoctors() {
    firebase.database().ref('users/profiles/').on('child_added', (val) => {
      let users = val.val();
      users.uid = val.key;

      this.setState({
        uid: users.uid
      })
    })
  }




  render() {

    const { icon, liked } = this.state
    const colorValue = !liked ? '#ccd1d1' : '#fb7777'
    const iconVAlue = icon ? '1' : '0'


    return (
        <TouchableOpacity style={styles.like} onPress={this.likeImage}>
          <FontAwesome name='heart' size={32} style={{ color: colorValue, textAlign: 'right', flex: 1 }} />
        </TouchableOpacity>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  like: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    zIndex: 1,
    marginTop: 15,
    marginRight: 10,
    width: 35,
  }
});

//make this component available to the app
export default Favorites;