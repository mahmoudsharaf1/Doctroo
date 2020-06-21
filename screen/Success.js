//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

// create a component
class Success extends Component {





    render() {
        const  profileDoctor  = this.props.navigation.getParam('profileDoctor');
        const  meeting  = this.props.navigation.getParam('meeting');
        console.log(profileDoctor)
        return (
            <View style={styles.container}>
                <View style={{marginTop: 60, alignItems: 'center'}}>
                    <Ionicons name='ios-checkmark-circle' style={{color: '#32CD32'}} size={50} />
                    <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 10}}>Success!</Text>
                    
                        <Text style={{marginTop: 10, color: '#999'}} >Thanks you for choosing our</Text>
                        <Text style={styles.text}>service and trust our doctors to</Text>
                        <Text style={styles.text}>take care your health</Text>

                </View>
                <View style={styles.card}>
                    <View style={{alignItems: 'center', marginTop: 15}}>
                        <View style={styles.view}>
                            <Avatar 
                                size={65}
                                rounded
                                source={{uri: profileDoctor.photoURL}}
                                        
                            />
                            <Text style={styles.data}>{profileDoctor.displayName}</Text>
                            <Text style={{fontSize: 15 ,color: '#999'}}>{profileDoctor.specialty}</Text>
                        </View>

                        <View style={styles.view}>
                            <Text style={styles.title}>{`Data & Time`}</Text>
                            <Text style={styles.data}>{meeting.selected}</Text>
                            <Text style={{fontSize: 12}}>{meeting.time}</Text>
                        </View>

                        <View style={styles.view}>
                            <Text  style={styles.title}>Address</Text>
                            <Text style={styles.data}>{profileDoctor.address}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnContainer} onPress={() => this.props.navigation.navigate('Appointments')}>
                        <Text style={{color: '#fff', fontSize: 17}}>Check Details</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        
    },
    text: {
        color: '#999',
        
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 30, 
        marginTop: 30,
        borderRadius: 7   
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#1590f0',
        padding: 13,
        borderRadius: 7,
        marginHorizontal: 30,
        marginBottom: 30
    },
    view: {
        marginTop: 20, 
        alignItems: 'center'
    },
    title: {
        color: '#999',
        fontSize: 16
    },
    data: {
        fontSize: 15, 
        fontWeight: 'bold', 
        marginTop: 3
    }
});

//make this component available to the app
export default Success;
