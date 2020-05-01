import React from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


import { handelSignUp } from '../actions/authentication';

class CreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
}

  signUp() {
    this.props.handelSignUp();
}

componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
        this.props.navigation.navigate('App');
    }
}


  render() {

    const{ name, email, password } = this.state;
    return (
      <View style={styles.contanier}>
        <Text style={styles.greeting}>{`Hello again.\nWelcome Back`}</Text>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Username</Text>
              <TextInput 
                style={styles.input} 
                autoCapitalize= 'none'
                onChangeText={(name) => {this.setState({name})}}
              />
            </View>

            <View style={{marginTop:15}}>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput 
                style={styles.input} 
                autoCapitalize= 'none'
                keyboardType= 'email-address'
                onChangeText={(email) => {this.setState({email})}}
              />
            </View>

            <View style={{marginTop:15}}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize= 'none'
                secureTextEntry
                onChangeText={(password) => {this.setState({password})}}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => this.signUp(name, email, password)}>
            <Text style={{color: '#FFF', fontWeight: '500'}}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} 
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={{color: 'gray', fontSize: 13, color: '#E9446A'}}>
              Login
            </Text>
          </TouchableOpacity>

      </View>
    );
  };
};



const mapStateToProps = ({authData}) => {
  return {
    loading: authData.loading,
    token: authData.token
  }
}

export default connect ( mapStateToProps, { handelSignUp }) ( CreateAccount )




const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: 'white'
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    fontWeight: '500'
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center'
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: 'gray',
    fontSize: 13,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 80,
    fontSize: 15,
    color: 'blue'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
