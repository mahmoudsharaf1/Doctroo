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
    if (nextProps.loading) {
      this.props.navigation.navigate('Auth');
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
      <TouchableWithoutFeedback style={styles.contanier} behavior='padding'>
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
                placeholder='Username'
                placeholderTextColor='#888'
                style={styles.input}
                onChangeText={(displayName) => { this.setState({ displayName }) }}
                value={displayName}
              />
            </View>


            <View style={styles.marginInput}>
              <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='#888'
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
                placeholderTextColor='#888'
                autoCapitalize='none'
                onChangeText={(address) => { this.setState({ address }) }}
                value={address}
              />
            </View>



            <View style={styles.marginInput}>
              <TextInput
                style={styles.input}
                placeholder='Medical school'
                placeholderTextColor='#888'
                autoCapitalize='none'
                onChangeText={(medicalSchool) => { this.setState({ medicalSchool }) }}
                value={medicalSchool}
              />
            </View>


            <View style={styles.marginInput}>
              <TextInput
                style={styles.input}
                placeholder='Address Medical School'
                placeholderTextColor='#888'
                autoCapitalize='none'
                onChangeText={(addressSchool) => { this.setState({ addressSchool }) }}
                value={addressSchool}
              />
            </View>

            <View style={styles.marginInput}>
              <TextInput
                style={styles.input}
                placeholder='Awards'
                placeholderTextColor='#888'
                autoCapitalize='none'
                onChangeText={(awards) => { this.setState({ awards }) }}
                value={awards}
              />
            </View>


            <View style={styles.marginInput}>
              <TextInput
                style={styles.input}
                placeholder='Education'
                placeholderTextColor='#888'
                autoCapitalize='none'
                onChangeText={(education) => { this.setState({ education }) }}
                value={education}
              />
            </View>

            <ScrollView style={styles.marginInput}>
              <Picker
                placeholder='Specialty'
                selectedValue={this.state.specialty}
                style={{ borderColor:'#eee', borderWidth: 1 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ specialty: itemValue })
                }>
                <Picker.Item label="Specialty .." value="" color='#888' />
                <Picker.Item label="Dentistry" value="Dentistry" />
                <Picker.Item label="Endocrinology" value="Endocrinology" />
                <Picker.Item label="Cardiology" value="Cardiology" />
                <Picker.Item label="Gastroenterology" value="Gastroenterology" />
                <Picker.Item label="Obstetrics and Gynecology" value="Obstetrics and Gynecology" />
                <Picker.Item label="Ophthalmology" value="Ophthalmology" />
                <Picker.Item label="Pediatrics" value="Pediatrics" />
                <Picker.Item label="Ear, nose and throat (ENT)" value="Ear, nose and throat (ENT)" />
                <Picker.Item label="Neurology" value="Neurology" />
                <Picker.Item label="Nephrology" value="Nephrology" />
                <Picker.Item label="Oncology" value="Oncology" />
                <Picker.Item label="Urology" value="Urology" />
                <Picker.Item label="Dermatology" value="Dermatology" />
                <Picker.Item label="Oncology" value="Oncology" />
                <Picker.Item label="Allergy and immunology" value="Allergy and immunology" />
                <Picker.Item label="Hematology" value="Hematology" />
                <Picker.Item label="General Practitioner" value="General Practitioner" />
                <Picker.Item label="Emergency medicine" value="Emergency medicine" />
                <Picker.Item label="Psychiatry" value="Psychiatry" />
                <Picker.Item label="Radiology" value="Radiology" />
                <Picker.Item label="Family medicine" value="Family medicine" />
                <Picker.Item label="Internal Medicine" value="Internal Medicine" />
              </Picker>
              {/* <TextInput
                style={styles.input}
                placeholder='Specialty'
                placeholderTextColor='#888'
                autoCapitalize='none'
                onChangeText={(specialty) => { this.setState({ specialty }) }}
                value={specialty}
              /> */}
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
                placeholderTextColor='#888'
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
                placeholderTextColor='#888'
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
                placeholderTextColor='#888'
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
    backgroundColor: 'white'
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
