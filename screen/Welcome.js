import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'native-base';
import { connect } from 'react-redux';

import { signIn } from '../actions';
import { facebooklogin } from '../actions';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            disabled: false,
            errorMessage: false,
            treatment: false,
        }
    }

    async componentWillMount() {
        await navigator.geolocation.getCurrentPosition((position) => { });
    };

    signIn = () => {
        const { email, password } = this.state;
        this.props.signIn({ email, password });
    };

    loginWithFacebook() {
        this.props.facebooklogin();
    };

    treatmentClick() {
        this.setState({
            treatment: true
        });
    };


    render() {
        const { email, password, treatment } = this.state;
        const { navigation, loading } = this.props;
        console.log(this.props.err)
        return (
            <ScrollView style={styles.contanier}>

                <View style={{ marginTop: 30, marginHorizontal: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.greeting} color='#1590f0'>{`Welcome\nback`}</Text>
                    <View style={styles.photoPlaceholder}>
                        <Image source={require('../images/life.png')} style={styles.photo} />

                    </View>
                </View>

                <View style={{ justifyContent: 'center', marginHorizontal: 30, marginTop: 10 }}>
                    <Text>Sign in to continue</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpDoctor')}>
                        <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>
                            Create account for a Doctor <Text style={{ color: '#1590f0', fontSize: 15 }}> Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 15 }}>
                        {this.props.err && <Text style={{ color: '#E9445f' }} >{this.props.err}</Text>}
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View>
                            <TextInput
                                placeholder='Email'
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                value={email}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                placeholder='Password'
                                style={styles.input}
                                autoCapitalize='none'
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                value={password}
                            />
                        </View>


                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        width: width / 1.2
                    }}
                    >

                        <View style={{ flexDirection: 'row', marginHorizontal: -5 }}>
                            <CheckBox
                                color={treatment ? '#6CDC17' : '#888'}
                                onPress={() => this.treatmentClick()}
                                checked={treatment}
                                style={{marginRight: 15}}
                            />
                            <Text style={{ color: '#999'}} >Remmber me</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                            <Text style={{ color: '#999' }}>ForgetPassword?</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.button} onPress={this.signIn} loading={loading}>
                            <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 16 }}>Sign In</Text>
                        </TouchableOpacity>



                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity style={styles.buttonFacebook} onPress={this.loginWithFacebook.bind(this)}>
                                <Icon name='facebook' type='font-awesome' color='#1590f0' />
                                <Text style={{ color: '#1590f0', fontWeight: '500', fontSize: 16 }}> Login With Facebook</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    <TouchableOpacity style={styles.signup}
                        onPress={() => navigation.navigate('CreateAccount')}>
                        <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>
                            Don't have an account <Text style={{ color: '#1590f0', fontSize: 15 }}> Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

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
    button: {
        backgroundColor: '#1590f0',
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    buttonFacebook: {
        backgroundColor: '#FFF',
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .9,
        borderColor: '#1590f0',
        flexDirection: 'row',
        elevation: 1,
    },
    input: {
        backgroundColor: '#eee',
        padding: 15,
        borderRadius: 6,
        width: width / 1.2
    },
    buttoncontainer: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    },
    photo: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E1E2E6',
        marginTop: 32
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
    signup: {
        position: 'relative',
        alignSelf: 'center',
        marginTop: 30
    },
})

const mapStateToProps = ({ auth, authProfile }) => {
    return {
        loading: auth.loading,
        token: auth.token,

        loading: authProfile.loading,
        err: authProfile.err,
        signup: authProfile.signup,
        profile: authProfile.profile,
        login: authProfile.login,



    };
};


export default connect(mapStateToProps, { facebooklogin, signIn })(Welcome);