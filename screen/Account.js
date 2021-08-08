import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Divider, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';

import firebase from '../Firebase';

class Account extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: null,
    }
  }


  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {

        const photo = result.uri
        const { profile } = this.props;
        firebase.database().ref('users/profiles/').child(profile.uid).child('photoURL').set(photo);
        this.setState({ photo: result.uri });
        Alert.alert('Change');

      }
    } catch (E) {
      console.log(E);
    }
  };



  render() {

    const { profile, navigation } = this.props;
    const { photo } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#f1f1f1' }}>
          <View style={{ marginHorizontal: 15, marginTop: 32 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='ios-arrow-back' size={30} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name='ios-cog' size={25} />
              </TouchableOpacity>

            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 30, marginBottom: 18 }}>
            <View>
              <TouchableOpacity style={styles.edit} onPress={this._pickImage} >
                <MaterialIcons name='edit' size={15} style={{ color: '#fff' }} />
              </TouchableOpacity>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={photo ? { uri: photo } : { uri: profile.photoURL }}
              />
            </View>

            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{profile.displayName}</Text>
              <Text style={{ color: '#999' }}>{profile.email}</Text>
            </View>
          </View>

        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 12, marginHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16 }}>Account Credits</Text>
              <View style={{ backgroundColor: '#1590f0', maxWidth: '100%', borderRadius: 15 }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}> $0.00 </Text>
              </View>
            </View>
            <Divider style={{ marginTop: 15 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 16 }}>Favorites</Text>
              <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
            </View>
            <Divider style={{ marginTop: 5 }} />
          </View>


          <View style={{ marginHorizontal: 15, marginTop: 25 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Address</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 29 }}>
              <Text>Home</Text>
              <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
            </View>

            <Text style={{ marginTop: 20, color: '#999', textAlign: 'left' }}>{profile.address}</Text>
            <Divider style={{ marginTop: 15 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ color: '#1690f5', fontSize: 15 }}>Add new address</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ChooseLocation')}>
                <Ionicons name='ios-add-circle' color='#1690f0' size={25} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={{ marginHorizontal: 15, marginTop: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Payment Cards</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 29, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Image source={require('../images/visa.png')} style={{ height: 30, width: 30, borderWidth: .5 }} />
                </View>
                <View>
                  <Text>  Oscar's card</Text>
                  <Text style={{  color: '#999', marginLeft: 7, marginTop: 5}}>999**** **** ****</Text>
                </View>
              </View>
              <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
            </View>

            <Divider style={{ marginTop: 40 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ color: '#1690f5', fontSize: 15 }}>Add new Card</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
                <Ionicons name='ios-add-circle' color='#1690f0' size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  edit: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: '#6CDC17',
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 65
  }

});


const mapStateToProps = ({ authProfile }) => {
  return {
    profile: authProfile.profile
  }
};

export default connect(mapStateToProps)(Account);
