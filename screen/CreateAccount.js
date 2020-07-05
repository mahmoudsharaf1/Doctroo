import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { handelSignUp } from '../actions';
import IntlPhoneInput from '../src/IntlPhoneInput';
class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {

      photoURL: null,
      displayName: '',
      email: '',
      address: '',
      phone: '',
      password: '',
    }
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.handelSignUp) {
      this.props.navigation.navigate('Welcome');
    }
  }

  signUp() {
    const { displayName, email, address, password, phone, photoURL } = this.state;
    this.props.handelSignUp({ displayName, email, address, password, phone, photoURL });
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photoURL: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };



  render() {

    const { displayName, email, address, password, phone, photoURL } = this.state;

    return (
      <View style={styles.contanier}>
        <TouchableWithoutFeedback>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 30, marginTop: 30 }}>

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.greeting}>{`Welcome\nUser`}</Text>

              <View>
                <TouchableOpacity style={styles.edit} onPress={this._pickImage} >
                  <MaterialIcons name='edit' size={15} style={{ color: '#fff' }} />
                </TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={photoURL ? { uri: photoURL } : require('../images/unnamed.png')}
                />
              </View>

            </View>

            <Text>Sign Up to join</Text>

            <View style={styles.form}>

              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Full name'
                  onChangeText={(displayName) => { this.setState({ displayName }) }}
                  value={displayName}
                />
              </View>


              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  placeholder='Email'
                  onChangeText={(email) => { this.setState({ email }) }}
                  value={email}
                />
              </View>

              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Address'
                  autoCapitalize='none'
                  onChangeText={(address) => { this.setState({ address }) }}
                  value={address}
                />
              </View>

              <SafeAreaView style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 1 }}>
                  <IntlPhoneInput
                    style={styles.input}
                    placeholder='Mobile'
                    defaultCountry="EG"
                    onChangeText={(phone) => { this.setState({ phone }) }}
                    value={phone}
                  />
                </View>
              </SafeAreaView>


              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={(password) => { this.setState({ password }) }}
                  value={password}
                />
              </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={() => this.signUp(displayName, email, address, password, phone, photoURL)}>
              <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttoncontainer}
              onPress={() => this.props.navigation.navigate('Welcome')}>
              <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>
                Have an account? <Text style={{ color: '#1690f0', fontSize: 15 }}> Sign in</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>

        </TouchableWithoutFeedback>

      </View>
    );
  };
};



const mapStateToProps = state => {
  return {
    loading: state.authProfile.loading,
    error: state.authProfile.error,
    signup: state.authProfile.signup
  }
}

export default connect(mapStateToProps, { handelSignUp })(CreateAccount)




const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: 'white'
  },
  greeting: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    width: 300,
  },
  button: {
    backgroundColor: '#1690f0',
    borderRadius: 4,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginTop: 15
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
  },
  photo: {
    position: 'absolute',
    width: 79,
    height: 79,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    marginTop: 32
  },
  marginInput: {
    marginTop: 15
  },
  buttoncontainer: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 30
  },
})
