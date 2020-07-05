//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Divider, Icon, Avatar } from 'react-native-elements';

import { isObject } from 'lodash';

import Favorites from '../contacts/Favorites';
import firebase from '../Firebase';


const { height, width } = Dimensions.get('window')

// create a component
class Specialty extends Component {


    state = {
        data: [],
        ref: []
    }


    componentDidMount() {
        this.onData()
    }

    onData() {
        const data = this.props.navigation.getParam('item')

        for (let val in data) {
            if (isObject(data[val])) {

                this.setState((prevState) => {
                    return {
                        data: [...prevState.data, data[val]]
                    }
                });

            };
        };
    };




    renderItem = ({ item }) => {

    
        return (
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.props.navigation.navigate('Profile01', { item })} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ width: 100, height: 100, borderRadius: 7 }}>

                        <View style={{ flex: 1, marginRight: 5 }}>
                            <Avatar
                                rounded
                                size={100}
                                source={{ uri: item.photoURL }}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>

                    <View style={{ marginLeft: 5, flex: 1 }}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: '700' }}>{item.displayName}</Text>

                            <View>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name='ios-pin' type='ionicon' size={15} color='#999' />
                                        <Text style={{ color: '#777' }}> {item.address}</Text>
                                    </View>
                                    <Text style={{ color: '#777' }}> {item.specialty}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>${item.hourlyRate}/hr</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 1, bottom: 70 }}>
                            <Favorites />
                        </View>
                    </View>

                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <Divider style={{ width: width / 1.6 }} />
                </View>

            </TouchableOpacity>
        )
    };



    render() {
        const data = this.props.navigation.getParam('item')

        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: 15 }}>


                    <View style={{ flexDirection: 'row', marginTop: 32 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} style={styles.location} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{data.id}</Text>
                    </View>

                </View>

                <ScrollView style={{ marginTop: 40, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                    />
                </ScrollView>

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
    location: {
        flexDirection: 'row',
        textAlign: 'left',
    },
});

//make this component available to the app
export default Specialty;
