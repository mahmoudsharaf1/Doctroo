import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';


class Account extends Component {

  constructor(props){
    super(props);
      
    this.state={

    }
}

  render() {

    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#f1f1f1', height: '30%'}}>
          <View style={{marginHorizontal: 15, marginTop: 32}}>
            <View style={{ flexDirection: 'row'}}>
                <Ionicons name='ios-aperture'  size={25}  style={styles.setting} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                  <Ionicons name='ios-more' size={25}  style={styles.icon} />
                </TouchableOpacity>
            </View>
          </View>
              {/* <View style={{flexDirection: 'row',alignItems: 'center', marginLeft: 15, marginTop: 30}}>
                <Avatar 
                  size={75}
                  rounded
                  source={{uri: this.props.profile.photoURL}}
              
              />
                <View style={{marginLeft: 15}}>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>{this.props.profile.displayName}</Text>
                  <Text style={{color: '#999'}}>{this.props.profile.email}</Text>
                </View>
              </View> */}
        </View>

        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 12, marginHorizontal: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16}}>Account Credits</Text>
              <View style={{backgroundColor: '#1590f0', maxWidth: '100%', borderRadius: 15}}>
                <Text style={{color: '#fff', textAlign: 'center'}}> $0.00 </Text>
              </View>
            </View>
              <Divider style={{marginTop: 15}} />
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={{fontSize: 16}}>Favorites</Text>
                <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
              </View>
              <Divider style={{marginTop: 5}} />
          </View>


          <View style={{marginHorizontal: 15, marginTop: 25}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Address</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', top: 29}}>
              <Text>Home</Text>
              <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
            </View>

            <Text style={{marginTop: 20, color: '#999', textAlign: 'left'}}>43 كفر المصيلحه</Text>
            <Divider style={{marginTop: 15}} />

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              <Text style={{color: '#1690f5', fontSize: 15}}>Add new address</Text>
              <Ionicons name='ios-add-circle' color='#1690f0' size={25} />
            </View>

          </View>
            <View style={{marginHorizontal: 15, marginTop: 15}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Payment Cards</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', top: 29}}>
                <Text>Home</Text>
                <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
              </View>
              <Text style={{marginTop: 20, color: '#999', textAlign: 'left'}}>999**** **** ****</Text>
              <Divider style={{marginTop: 15}} />

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                <Text style={{color: '#1690f5', fontSize: 15}}>Add new Card</Text>
                <Ionicons name='ios-add-circle' color='#1690f0' size={25} />
              </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {

    loading: state.authProfile.loading,
    error: state.authProfile.error,
    signup: state.authProfile.signup,
    profile: state.authProfile.profile,
    login: state.authProfile.login

  }
};

export default connect(mapStateToProps)(Account) ;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  setting: {
    flex: 1,
    textAlign: 'left'
  },
  icon: {
    flex: 1,
    textAlign: 'right'
  },

})
