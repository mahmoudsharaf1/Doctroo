//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import firebase from '../Firebase';


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

  likeImage = async () => {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref(`users/doctors/${this.state.uid}`)
    .child('favorit').child(uid).set(!this.state.liked);
    
    const likeState = await !this.state.liked
    this.setState({ liked: likeState })
  }

  componentDidMount() {

    this.dataDoctors()
  }


  dataDoctors() {
    firebase.database().ref('users/doctors/').on('child_added', (val) => {
      let users = val.val();
      users.uid = val.key;

      this.setState({
        uid: users.uid
      })

      // this.setState((prevState) => {
      //   return {
      //     users: [...prevState.users, users]
      //   }
      // })
    })
  }




  componentWillReceiveProps() {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref('users/doctors/' + this.state.uid).child('favorit').child(uid).on('value', snap => {
        console.log(snap)
        this.setState({
          fav: snap
        })
    })
  }


  render() {

    const { fav, liked } = this.state
    const colorValue = !liked ? '#fff' : '#fb7777'
    const likeValue = liked ? '1' : '0'

    // console.log(favorite.uid)
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
    position: 'absolute',
    zIndex: 1,
    marginTop: 15,
    flexDirection: 'row',
    marginRight: 10
  }
});

//make this component available to the app
export default Favorites;










// import React from 'react'
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
// import { Ionicons } from '@expo/vector-icons';

// export default class LikeButton extends React.Component {
// 	state = {
// 		liked: false,
// 	}
// 	likeImage = async () => {
// 		const likeState = await !this.state.liked
// 		this.setState({ liked: likeState })
// 	}
// 	render() {
// 		const { liked } = this.state
// 		const colorValue = liked ? '#fb7777' : '#fff'
// 		const likeValue = liked ? '1' : '0'
// 		return (
// 			<View style={styles.container}>
// 				<TouchableOpacity style={styles.like}
// 					onPress={this.likeImage}
// 				>
// 					<Ionicons name="md-heart" size={55} color={colorValue} />
// 				</TouchableOpacity>
// 				<Text style={styles.likeNumberStyle}>
// 					{likeValue}
// 				</Text>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	likeNumberStyle: {
// 		fontSize: 16,
// 		fontWeight: 'bold'
// 	}
// })