import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';


import firebase from '../Firebase';
import { fetchSpecialty } from '../actions';


const { height, width } = Dimensions.get('window')


class Categories extends Component {


    state = {
        error: null,
        loading: false,
        specialty: []
    }


    componentDidMount() {
        // this.props.fetchSpecialty()

        firebase.database().ref('specialty').on('child_added', (val) => {
            let specialty = val.val();
            specialty.id = val.key;

            this.setState((prevState) => {
                return {
                    specialty: [...prevState.specialty, specialty]
                }
            })
        })

        
        
    }



    renderItem = ({ item }) => {


        return (
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.props.navigation.navigate('Specialty', { item })} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{  backgroundColor: '#1590f0', width: 100, height: 100, borderRadius: 7}}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                            <Image source={{uri: item.image}}
                                style={{ flex: 1, width: width / 4.1, height: height / 1, resizeMode: 'cover', borderRadius: 10}}
                            />
                        </View>
                    </View>

                    <View style={{ marginLeft: 13 }}>
                        <Text style={{ fontWeight: '700' }}>{item.id}</Text>
                        <Text style={{ color: '#999', marginTop: 5 }}>{} doctors</Text>
                    </View>

                </View>
                <View  style={{ alignItems: 'flex-end' }}>
                    <Divider style={{ width: width / 1.66 }} />
                </View>
            </TouchableOpacity>
        )
    };



    render() {
        // if(this.props.fetching) return <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} size='large' />

        // console.log(this.props.result);

        return (
            <View style={styles.logout}>
                <View style={{ marginHorizontal: 15 }}>

                    <View style={{ flexDirection: 'row', marginTop: 32 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} style={styles.location} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Categories</Text>
                    </View>

                </View>

                <ScrollView style={{ marginTop: 40, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.specialty}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                    />
                </ScrollView>

            </View>
        )
    }
}


const mapStateToProps = ({ specialty }) => {
    return {
        fetching: specialty.fetching,
        result: specialty.result
    }
}


export default connect(mapStateToProps, { fetchSpecialty })(Categories);


const styles = StyleSheet.create({
    logout: {
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
})