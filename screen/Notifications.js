//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

// create a component
class Notifications extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal: 15}}>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='ios-arrow-back' size={30} style={styles.location}/>
                    </TouchableOpacity>
                    <View style={styles.search}>
                        <Ionicons name='ios-funnel' size={25} style={styles.search}  />
                    </View>
                </View>
                    <View style={{marginTop: 30}}>
                        <Text  style={{fontSize: 32, fontWeight: 'bold'}}>Notifications</Text>
                    </View>
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
    search: {
        flex: 1,
        textAlign: 'right',
    },
      location: {
        flexDirection: 'row',
        textAlign: 'left',
    },
});

//make this component available to the app
export default Notifications;
