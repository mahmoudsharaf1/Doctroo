import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

class SetLocation extends Component {

    
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 20}}>
                    <View style={{marginTop: 70}}>
                        <Ionicons name='ios-pin' size={100} style={{color: '#1590f0'}}/>
                    </View>
                    <View style={{marginTop: 35}}>
                        <Text style={{fontSize: 40, fontWeight: 'bold'}}>Hello nice to meet you!</Text>
                        <Text style={{fontSize: 17, color: '#999', marginTop: 20}}>Set you location to start find doctors around you</Text>
                    </View>
                    <TouchableOpacity style={styles.btnContainer} onPress={() => this.props.navigation.navigate('ChooseLocation')}>
                        <Ionicons name='ios-paper-plane' size={30} style={{color: '#fff', marginRight: 12}} />
                        <Text style={{color: '#fff', fontSize: 17}}>Use current location</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 20, color: '#999'}}>We only access you location while you are using in app</Text>
                    <Text style={{marginTop: 20, fontSize: 16}}>or set you location manually</Text>
                </View>
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#1590f0',
        padding: 10,
        borderRadius: 4
    }
});

//make this component available to the app
export default SetLocation;
