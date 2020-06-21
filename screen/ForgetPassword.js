//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import firebase from '../Firebase';
// create a component
class ForgetPassword extends Component {

    state = {
        email: ''
    }

onSendPassword = () => {
    var auth = firebase.auth();
    
    auth.sendPasswordResetEmail(this.state.email).then(() => {
      // Email sent.
      Alert.alert('Check you email')
    }).catch((error) => {
      // An error happened.
      Alert.alert(error.message)
    });
}

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 30}}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginTop: 30}}>
                        <Ionicons name='ios-arrow-back' size={30}  />
                    </TouchableOpacity>

                <View style={{ marginTop: 30, alignItems: 'center'}}>
                    <Text style={{  fontSize: 25, fontWeight: 'bold' }}>Forget Password</Text>
                </View>

        <Text style={{textAlign: 'center', marginTop: 30}} >{`Enter your email and will send you\ninstruction on how to reset it`}</Text>
                
                <View style={styles.form}>
                    <TextInput  
                        placeholder='Email' 
                        style={styles.input}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        placeholderTextColor= '#888' 
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={this.onSendPassword}>
                    <Text style={{color: '#fff', padding: 10}}>Send</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 6,
        width: 300
    },
    button: {
        backgroundColor: '#1690f0',
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        marginTop: 15
      },
      form: {
        marginTop: 30,
        alignItems: 'center'
    },
});

//make this component available to the app
export default ForgetPassword;
