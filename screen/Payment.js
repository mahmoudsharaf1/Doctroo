//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'native-base';
import Stripe from 'react-native-stripe-api';
import { connect } from 'react-redux';

import firebase from '../Firebase';

// create a component
class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visa: false,
            payPal: false,
            applePay: false,
            saveCredite: false,
            number: '',
            card_holder: '',
            exp_month: '',
            exp_year: '',
            cvc: ''
        }
    }


    visa() {
        this.setState({ visa: true, payPal: false, applePay: false })
    };
    payPal() {
        this.setState({ visa: false, payPal: true, applePay: false })
    };
    applePay() {
        this.setState({ visa: false, payPal: false, applePay: true })
    };
    saveCredite() {
        this.setState({ saveCredite: true })
    };

    addCard() {
        
        const { number, card_holder, exp_month, exp_year, cvc } = this.state;
        const apiKey = 'sk_test_51H1VX5DyFzaVSXEMw7ESrW4dixU24H5JcgIOrw2ze24RZaVuxxj4yJdmXYlXBY4AJ528sM1j4mYRxlsNmnUcwpuK004WqpMGIa';
        const client = new Stripe(apiKey);
        const token = client.createToken({ number, exp_month, exp_year, cvc, }).then((resp) => {
            console.log(resp)
            
        }).catch((err) => {
            console.log(err)
        })
    };


    render() {
        const { visa, payPal, applePay, saveCredite, number, card_holder, exp_month, exp_year, cvc } = this.state;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <ScrollView style={{ marginTop: 40 }}>
                        <View style={{ marginHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Ionicons name='ios-arrow-back' type='ionicon' size={30} />
                                </TouchableOpacity>
                                <Text>Add New</Text>
                            </View>
                            <Text style={{ top: 15, fontSize: 32, fontWeight: 'bold' }}>Payment</Text>
                        </View>

                        <View style={{ marginTop: 30, backgroundColor: '#eee' }}>
                            <View style={styles.payment}>

                                <Text style={{ textAlign: 'center', bottom: 40, color: '#888' }}>choose your payment method</Text>
                                <View style={styles.containerCard}>
                                    <View style={styles.containerImages}>
                                        <Image style={styles.images} source={require('../images/visa.png')} />

                                    </View>
                                    <View style={styles.containerImages}>
                                        <Image style={styles.images} source={require('../images/paypal.png')} />

                                    </View>
                                    <View style={styles.containerImages}>
                                        <Image style={styles.images} source={require('../images/apple-pay.png')} />

                                    </View>


                                </View>
                                <View style={styles.checkBoxContainer}>
                                    <CheckBox
                                        color={visa ? '#6CDC17' : '#888'}
                                        onPress={() => this.visa()}
                                        checked={visa}
                                    />
                                    <CheckBox
                                        color={payPal ? '#6CDC17' : '#888'}
                                        onPress={() => this.payPal()}
                                        checked={payPal}
                                    />
                                    <CheckBox
                                        color={applePay ? '#6CDC17' : '#888'}
                                        onPress={() => this.applePay()}
                                        checked={applePay}
                                    />
                                </View>
                            </View>
                        </View>


                        <View style={styles.inputContainer}>
                            <View style={styles.marginInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Card Number'
                                    keyboardType='number-pad'
                                    onChangeText={(number) => { this.setState({ number }) }}
                                    value={number}
                                />
                            </View>
                            <View style={styles.marginInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Card Holder'
                                    autoCapitalize= 'none'
                                    onChangeText={(card_holder) => { this.setState({ card_holder }) }}
                                    value={card_holder}
                                />
                            </View>


                            <View style={styles.marginInput}>
                            </View>
                            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={{
                                        backgroundColor: '#eee',
                                        padding: 10,
                                        borderRadius: 6,
                                        width: 105,
                                        marginRight: 7
                                    }}
                                    placeholder='Expires/ YY'
                                    keyboardType='number-pad'
                                    onChangeText={(exp_year) => { this.setState({ exp_year }) }}
                                    value={exp_year}
                                />
                                <TextInput
                                    style={{
                                        backgroundColor: '#eee',
                                        padding: 10,
                                        borderRadius: 6,
                                        width: 105,
                                        marginRight: 7
                                    }}
                                    placeholder='Expires/ MM'
                                    keyboardType='number-pad'
                                    onChangeText={(exp_month) => { this.setState({ exp_month }) }}
                                    value={exp_month}
                                />
                                <TextInput
                                    style={{
                                        backgroundColor: '#eee',
                                        padding: 10,
                                        borderRadius: 6,
                                        width: 105,
                                        marginLeft: 3
                                    }}
                                    placeholder='CVC'
                                    keyboardType='number-pad'
                                    onChangeText={(cvc) => { this.setState({ cvc }) }}
                                    value={cvc}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: 8 }}>
                            <CheckBox
                                color={saveCredite ? '#6CDC17' : '#888'}
                                onPress={() => this.saveCredite()}
                                checked={saveCredite}
                            />
                            <Text style={{ color: '#888', marginLeft: 20 }}>Save credite information</Text>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this.addCard.bind(this)} >
                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    payment: {
        marginHorizontal: 20,
        marginTop: 60
    },
    containerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerImages: {
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: .5,
        height: 45,
        borderRadius: 10
    },
    images: {
        width: 60,
        height: 45,
        bottom: 10
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 15,
        marginRight: 35,
        marginBottom: 20
    },
    input: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 6,
        width: 330,
    },
    marginInput: {
        marginTop: 15
    },
    inputContainer: {
        marginTop: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#1690f0',
        borderRadius: 4,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        marginTop: 50,
        marginHorizontal: 15,
    },
});


const mapStateToProps = state => {
    return {
  
      profile: state.auth.profile,
  
      loading: state.authProfile.loading,
      error: state.authProfile.error,
      signup: state.authProfile.signup,
      profile: state.authProfile.profile,
      login: state.authProfile.login,
  
    }
  };
  
  export default connect(mapStateToProps)(Payment);
  
//make this component available to the app
// export default Payment;
