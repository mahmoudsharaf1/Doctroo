//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import firebase from '../Firebase';

const { width, height } = Dimensions.get('window');


// create a component
class ChangePassword extends Component {

    state = {
        newPassword: ''
    }

onChangePassword = () => {
    var user = firebase.auth().currentUser;

    user.updatePassword(this.state.newPassword).then(() => {
    // Update successful.
        Alert.alert('Password has been change');
        this.setState({ newPassword: ''})
    }).catch((error) => {
    // An error happened.
        Alert.alert(error.message)
    });
}

    render() {
        return (
            <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginHorizontal: 15, marginTop: 30}}>
                        <Ionicons name='ios-arrow-back' size={30}  />
                    </TouchableOpacity>
                <View style={{marginHorizontal: 15, marginTop: 42}}>
                    <Text style={{  fontSize: 25, fontWeight: 'bold' }}>Change Password</Text>
                
                </View>
                <View style={{ marginHorizontal: 15,  justifyContent: 'flex-start', alignItems: 'center', marginTop: 90}}>
                    <TextInput  
                        style={styles.input}
                        placeholder='add new password' 
                        autoCapitalize='none'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ newPassword: text })}
                        value={this.state.newPassword}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onChangePassword}>
                    <Text style={{color: '#fff', padding: 10}}>Change Password</Text>
                </TouchableOpacity>
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
        borderRadius: 4,
        width: width / 1.1,
    },
    button: {
        backgroundColor: '#1690f0',
        borderRadius: 4,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        marginTop: 15,
        marginHorizontal: 15,
      }
});

//make this component available to the app
export default ChangePassword;
