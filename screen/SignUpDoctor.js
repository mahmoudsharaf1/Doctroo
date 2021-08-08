import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Dropdown } from "react-native-material-dropdown-v2";

import IntlPhoneInput from '../src/IntlPhoneInput';
import { handelSignUpDoctor } from '../actions';

const { width, height } = Dimensions.get('window');

class SignUpDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {

      photoURL: null,
      displayName: '',
      email: '',
      phone: '',
      password: '',
      medicalSchool: '',
      education: '',
      specialty: '',
      hourlyRate: '',
      address: '',
      experience: '',
      addressSchool: '',
      awards: '',
      latitude: null,
      longitude: null,
    }
  }

  async signUp() {
    const { latitude, longitude } = this.state;
    const location = { longitude, latitude };
    const {
      addressSchool,
      experience,
      displayName,
      email,
      password,
      phone,
      photoURL,
      medicalSchool,
      education,
      specialty,
      hourlyRate,
      address,
      awards
    } = this.state;

    this.props.handelSignUpDoctor({
      addressSchool,
      experience,
      displayName,
      email,
      password,
      phone,
      photoURL,
      medicalSchool,
      education,
      specialty,
      hourlyRate,
      address,
      awards,
      location
    });

  }

  componentDidMount() {
    this.getPermissionAsync();
    this.getLocation();
  };

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      error: null,
    });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios && Constants.platform.android) {
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

  pickerList() {

    let data = [
      { value: "Cardiology" },
      { value: "Neurology" },
      { value: "Thoracic" },
    ];

    return (
      <View style={styles.dropdownView}>
        <Dropdown
          pickerStyle={{
            borderColor: '#fff',
            backgroundColor: '#fff',
          }}
          containerStyle={[styles.containerStyle]}
          label='Specialty'
          baseColor={'#999'}
          data={data}
          onChangeText={(itemValue, itemIndex) =>
            this.setState({ specialty: itemValue })}
        />
      </View>
    )
  }



  render() {

    const {
      displayName,
      email,
      password,
      phone,
      photoURL,
      medicalSchool,
      education,
      specialty,
      hourlyRate,
      address,
      experience,
      addressSchool,
      awards
    } = this.state;

    return (
      <View style={styles.contanier}>
        <KeyboardAvoidingView style={{ flex: 1 }} >
          <ScrollView style={{ marginHorizontal: 30, flex: 1 }} showsVerticalScrollIndicator={false}>

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.greeting}>{`Welcome\nDoctor`}</Text>

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.edit} onPress={this._pickImage} >
                  <MaterialIcons name='edit' size={15} style={{ color: '#fff' }} />
                </TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={photoURL ? { uri: photoURL } : require('../assets/user.png')}
                />
              </View>

            </View>

            <Text>Sign Up to join</Text>

            {/* <View style={{ marginTop: 15 }}>
              {this.props.error && <Text style={{ color: '#E9445f' }} >{this.props.error}</Text>}
            </View> */}

            <View style={styles.form}>
              <View>
                <TextInput
                  placeholder='Full name'
                  style={styles.input}
                  onChangeText={(displayName) => { this.setState({ displayName }) }}
                  value={displayName}
                />
              </View>


              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  autoCapitalize='none'
                  keyboardType='email-address'
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



              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Medical school'
                  autoCapitalize='none'
                  onChangeText={(medicalSchool) => { this.setState({ medicalSchool }) }}
                  value={medicalSchool}
                />
              </View>


              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Address Medical School'
                  autoCapitalize='none'
                  onChangeText={(addressSchool) => { this.setState({ addressSchool }) }}
                  value={addressSchool}
                />
              </View>

              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Awards'
                  autoCapitalize='none'
                  onChangeText={(awards) => { this.setState({ awards }) }}
                  value={awards}
                />
              </View>


              <View style={styles.marginInput}>
                <TextInput
                  style={styles.input}
                  placeholder='Education'
                  autoCapitalize='none'
                  onChangeText={(education) => { this.setState({ education }) }}
                  value={education}
                />
              </View>

              <ScrollView style={styles.marginInput}>

                {this.pickerList()}

              </ScrollView>




              <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  style={{
                    backgroundColor: '#eee',
                    padding: 15,
                    borderRadius: 6,
                    width: width / 2.5,
                    marginRight: 15
                  }}
                  placeholder='Years Experience'
                  keyboardType='number-pad'
                  onChangeText={(experience) => { this.setState({ experience }) }}
                  value={experience}
                />
                <TextInput
                  style={{
                    backgroundColor: '#eee',
                    padding: 15,
                    borderRadius: 6,
                    width: width / 2.5,
                    marginRight: 5
                  }}
                  placeholder='Hourly rate $'
                  keyboardType='number-pad'
                  onChangeText={(hourlyRate) => { this.setState({ hourlyRate }) }}
                  value={hourlyRate}
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




            <TouchableOpacity style={styles.button}
              onPress={this.signUp.bind(this)}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttoncontainer}
              onPress={() => this.props.navigation.navigate('Welcome')}>
              <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>
                Have an account? <Text style={{ color: '#1690f0', fontSize: 15 }}>Log in</Text>
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, { handelSignUpDoctor })(SignUpDoctor)




const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: '#fff'
  },
  greeting: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 15,
  },
  input: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 6,
    width: width / 1.2
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
  marginInput: {
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
  buttoncontainer: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 38
  },
  dropdownView: {
    // width: width - 50,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    borderRadius: 5,
    elevation: 2,
    // marginTop: 30,
    // marginHorizontal: 20,
    borderWidth: .5,
    borderColor: '#ced2dc'
  },
  containerStyle: {
    marginTop: -10,
    height: 60,
  },
})
