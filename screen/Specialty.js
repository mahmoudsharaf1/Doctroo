//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Divider, Avatar } from 'react-native-elements';

import firebase from '../Firebase';
import { isObject } from 'lodash';


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

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  marginRight: 5 }}>
                            <Image source={{ uri: item.photoURL }}
                                style={{ flex: 1, width: width / 4.1, height: height / 1, resizeMode: 'cover', borderRadius: 10,marginTop: 10 }}
                            />
                        </View>
                    </View>

                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: '700' }}>{item.displayName}</Text>
                        <Text style={{ color: '#999', marginTop: 5 }}></Text>
                    </View>


                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <Divider style={{ width: width / 1.5 }} />
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
