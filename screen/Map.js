//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";

// create a component
class Map extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', zIndex: 1, marginTop: 40, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} style={styles.location} />
                        </TouchableOpacity>
                        <View style={styles.search}>
                            <Ionicons name='ios-funnel' size={25} style={styles.search} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <MapView style={{ flex: 1 }} />

                </View>
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
    search: {
        // flex: 1,
        // textAlign: 'right',
    },
      location: {
        flexDirection: 'row',
        textAlign: 'left',
    },
});

//make this component available to the app
export default Map;
