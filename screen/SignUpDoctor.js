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
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import IntlPhoneInput from '../src/IntlPhoneInput';
import { handelSignUpDoctor } from '../actions';

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
      awards: ''
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.handelSignUp) {
      this.props.navigation.navigate('Auth');
      Alert.alert('Successfully')
    }
  }




  async signUp() {

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
      awards
    });

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

  pickerList() {
    return (
      <Picker
        placeholder='Specialty'
        selectedValue={this.state.specialty}
        style={{ borderColor: '#eee', borderWidth: 1 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ specialty: itemValue }) }>
            
        <Picker.Item label="Specialty" value="" color='#888' />
        <Picker.Item label="Cardiology" value="Dentistry" />
        <Picker.Item label="Neurology" value="Neurology" />
        <Picker.Item label="Thoracic" value="Thoracic" />
      </Picker>

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
        <TouchableWithoutFeedback behavior='padding'>
          <ScrollView style={{ marginHorizontal: 30, flex: 1 }} showsVerticalScrollIndicator={false}>

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.greeting}>{`Welcome\nDoctor`}</Text>

              <TouchableOpacity style={styles.photoPlaceholder} onPress={this._pickImage} >
                {photoURL && <Image source={photoURL ? { uri: photoURL } : require('../images/unnamed.png')} style={styles.photo} />}
                <Ionicons
                  displayName='ios-add'
                  size={40}
                  color='#FFF'
                />
              </TouchableOpacity>
            </View>

            <Text>Sign Up to join</Text>


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
                    padding: 10,
                    borderRadius: 6,
                    width: 146,
                    marginRight: 7
                  }}
                  placeholder='Years Experience'
                  keyboardType='number-pad'
                  onChangeText={(experience) => { this.setState({ experience }) }}
                  value={experience}
                />
                <TextInput
                  style={{
                    backgroundColor: '#eee',
                    padding: 10,
                    borderRadius: 6,
                    width: 146,
                    marginLeft: 3
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
              onPress={() => this.signUp(
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
              )}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>


          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    );
  };
};



const mapStateToProps = ({ authDoctor }) => {
  return {
    loading: authDoctor.loading,
    error: authDoctor.error,
    signup: authDoctor.signup
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
    marginTop: 30,
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
  photoPlaceholder: {
    width: 79,
    height: 79,
    borderRadius: 50,
    backgroundColor: 'gray',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
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
})
