import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import { facebooklogin } from '../actions';

class Welcome extends Component {


    loginWithFacebook() {
        this.props.facebooklogin();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.navigation.navigate('App');
        }
    }


render() {
    return (
        <View style={styles.contanier}>
            <Text style={styles.greeting} color='#E9446A'>{`Welcome.`}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{`Log in one of the ways`}</Text>

        <View style={{flex: 1,  justifyContent: 'center'}}>

        <View style={{marginTop: 15}}>
            <TouchableOpacity style={styles.buttonFacebook} onPress={this.loginWithFacebook.bind(this)}>
                <Icon name='facebook' type='font-awesome' color='#E9446A'/>
                <Text style={{color: '#E9446A', fontWeight: '500', fontSize: 16}}> Login With Facebook</Text>
            </TouchableOpacity>
        </View>

            <View style={{marginTop: 15}}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text style={{color: '#FFF', fontWeight: '500', fontSize: 16}}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} 
                onPress={() => this.props.navigation.navigate('CreateAccount')}>
                <Text style={{color: 'gray', fontSize: 13 }}>
                Create Account <Text style={{color: '#E9446A', fontSize: 15}}> Sign Up</Text>
                </Text>
            </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: 'white'
    },
    greeting: {
        marginTop: 38,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#E9446A'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFacebook: {
        marginHorizontal: 30,
        backgroundColor: '#FFF',
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .9,
        borderColor: '#E9446A',
        flexDirection: 'row'
    },
})

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading,
        token: auth.token
    };
};


export default connect ( mapStateToProps, { facebooklogin }) (Welcome);