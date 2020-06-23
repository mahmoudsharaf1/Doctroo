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
      addedToFavorite: true,
      users: [],
      uid: null,
    };

    this.addToFavorite = this.addToFavorite.bind(this);
  };

  componentDidMount() {


    this.dataDoctors()


    this.setState({ categories: this.props.categories });


  }


  dataDoctors() {
    firebase.database().ref('users/doctors/').on('child_added', (val) => {
      let users = val.val();
      users.uid = val.key;

      // this.setState({
      //   uid: users.uid
      // })

      this.setState((prevState) => {
        return {
          users: [...prevState.users, users]
        }
      })
      this.setState({
        
          uid: [users.uid]
        
      })
    })
  }


  addToFavorite() {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref(`users/doctors/${this.state.uid}`).child('favorit').child(uid).set(this.state.addedToFavorite);

    this.setState({
      addedToFavorite: !this.state.addedToFavorite
    });

  }


  componentWillReceiveProps() {
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref('users/doctors/' + this.state.uid).child('favorit').child(uid).on('value', snap => {
      // console.log(snap)

      this.setState({
        addedToFavorite: snap
      })
    })
  }


  render() {

    const { addedToFavorite, users } = this.state;
    const uid = firebase.auth().currentUser.uid


    return (
      <TouchableOpacity style={styles.like} onPress={this.addToFavorite}>
        <FontAwesome name='heart' accessibilityValue={users.uid} size={32} style={{ color: !addedToFavorite ? '#ff0000' : '#fff', textAlign: 'right', flex: 1 }} />
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
