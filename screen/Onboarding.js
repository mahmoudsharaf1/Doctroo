import React, { Component } from 'react';
import {  StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';


export default class Onboarding extends Component {



  render() {
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{flex: 1, marginHorizontal: 15, marginTop: 60}}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
                    <Text style={{textAlign: 'right', color: '#1590f0', fontSize: 15, marginRight: 8}}>Skip</Text>
                </TouchableOpacity>

                <View style={{flex: 1}}>
                        <Swiper style={styles.wrapper}>
                            
                            <View style={styles.slide1}>
                                <View style={styles.image}>
                                    <Image source={require('../images/photoApp/doctor.jpg')} 
                                        style={{height: '70%', width: '100%',  borderRadius: 10}}
                                    />
                                    <Text style={styles.text}>Discover doctor near you</Text>
                                </View>
                                <View style={{marginHorizontal: 17}}>
                                    <Text style={styles.discription} >Fine the best doctor you want by your location or neighborhood</Text>
                                </View>
                            </View>
                         

                            <View style={styles.slide1}>
                                <View style={styles.image}>
                                    <Image source={require('../images/photoApp/schedule.jpg')} 
                                        style={{height: '70%', width: '100%',  borderRadius: 10}}
                                    />
                                    <Text style={styles.text}>Make a schedule easily</Text>
                                </View>
                                <View style={{marginHorizontal: 17}}>
                                    <Text style={styles.discription} >Choose the time you want to make an appointment with a doctor</Text>
                                </View>
                            </View>
                         

                            <View style={styles.slide1}>
                                <View style={styles.image}>
                                    <Image source={require('../images/photoApp/treatment.jpg')} 
                                        style={{height: '70%', width: '100%',  borderRadius: 10}}
                                    />
                                    <Text style={styles.text}>Enjoy treatment directly</Text>
                                </View>
                                <View style={{marginHorizontal: 17}}>
                                    <Text style={styles.discription} >Enjoy handling directly from your doctor without having to wait long</Text>
                                </View>
                            </View>
                         
                        </Swiper>
                </View>
                
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')} style={{bottom: 43, marginRight: 15}}>
                <Text style={{ textAlign: 'right',fontSize: 15, color: '#1590f0', marginRight: 8}}>Get started</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    wrapper: {
        textAlign: 'left',
        height: '90%'
    },
    slide1: {
      backgroundColor: '#fff',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 17
    },
    text: {
      fontSize: 30,
      fontWeight: 'bold',
    //   textAlign: 'center',
      marginTop: 10
    },
    discription: {
        color: '#999'
    }
  })