//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import firebase from '../Firebase';

// create a component
class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {addedToFavorite: false};
    
        this.addToFavorite = this.addToFavorite.bind(this);
      };


      addToFavorite() {
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/profiles/').child(uid).set(this.state.addedToFavorite)
        this.setState({
          addedToFavorite: !this.state.addedToFavorite
        });

        
      }



    render() {

        const { addedToFavorite } = this.state;
        return (
            <TouchableOpacity style={styles.like} onPress={this.addToFavorite}>
              <FontAwesome name='heart' size={32} style={{ color: addedToFavorite ? '#ff0000' : '#fff', textAlign: 'right', flex: 1 }} />
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
