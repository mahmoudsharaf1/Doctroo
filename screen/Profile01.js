import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import firebase from '../Firebase';

class Profile01 extends Component {

    state = {
        data: {
            uid: this.props.navigation.getParam('uid'),
            name: this.props.navigation.getParam('displayName'),
            photo: this.props.navigation.getParam('photoURL'),
            specialization: this.props.navigation.getParam('specialization'),
            address: this.props.navigation.getParam('address'),
            fee: this.props.navigation.getParam('hourlyRate'),
        },
        users: [],
        dbRef: firebase.database().ref('meeting'),
    }

    componentWillMount() {
        const uid = firebase.auth().currentUser.uid

        this.state.dbRef.child(uid).on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;

            this.setState((prevState) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        })



    }


    renderRow = () => {

        const chat = this.props.navigation.getParam('item');
        const user = this.props.profile;

        return (
            <TouchableOpacity style={[styles.icons, { marginRight: 15, padding: 8 }]} onPress={() => this.props.navigation.navigate('ChatScreen', { chat, user })}>
                <Ionicons name='ios-chatbubbles' size={18} style={{ color: '#1590f0'}}
                    accessibilityValue={this.state.users}
                />

            </TouchableOpacity>
        )
    };

    like() {
        return <Favorites />
    }


    render() {

        
        const profile = this.props.navigation.getParam('item')

        return (
            <ScrollView style={styles.container}>

                <View>

                    <View style={{ backgroundColor: '#f1f1f1' }}>

                        <View style={{ marginHorizontal: 15, marginTop: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name='ios-arrow-back' size={30} style={styles.setting} onPress={() => this.props.navigation.goBack()} />
                                <TouchableOpacity>
                                    <Ionicons name='ios-more' size={25} style={styles.icon} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <View >
                                    {this.renderRow()}
                                </View>
                                <Avatar
                                    size={85}
                                    rounded
                                    source={{ uri: profile.photoURL }}

                                />
                                <TouchableOpacity style={styles.icons}>
                                    <FontAwesome  name='heart' size={18} style={{ color: '#ff0000', top: 1.5 }} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 7 }}>{profile.displayName} <Ionicons name='ios-checkmark-circle' style={{ color: '#1590f0' }} size={17} />
                            </Text>

                            <View style={{ marginHorizontal: 15, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text>{profile.specialty} - </Text>
                                    <Text> {profile.experience}
                                        <Text style={{ color: '#999' }}> Years Experience</Text>
                                    </Text>
                                </View>

                                <View style={styles.data}>
                                    <Text style={styles.TextData}>{this.props.navigation.getParam('rating')}</Text>
                                    <Text style={styles.TextData}>{this.props.navigation.getParam('reviews')}</Text>
                                    <Text style={styles.TextData}>{this.props.navigation.getParam('patients')}</Text>
                                </View>

                                <View style={styles.informations}>
                                    <Text style={styles.text}>Rating</Text>
                                    <Text style={styles.text}>Reviews</Text>
                                    <Text style={styles.text}>Patients</Text>
                                </View>

                            </View>

                        </View>
                    </View>


                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>

                            <View style={styles.anotherData1}>
                                <Text style={{ color: '#1590f0', textAlign: 'left' }}>Hourly Rate</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${profile.hourlyRate}
                                    <Text style={{ color: '#999', fontSize: 15, fontWeight: '100' }}> per hour</Text>
                                </Text>
                            </View>

                            <View style={styles.anotherData2}>
                                <Text style={{ color: '#1590f0' }}>Complated</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    {this.props.navigation.getParam('consultations')} <Text style={{ color: '#999', fontSize: 15, fontWeight: '100' }}>consultations</Text>
                                </Text>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginHorizontal: 15 }}>
                        <View style={styles.biography}>
                            <Text style={styles.title}>Biography</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.schools}>Medical School</Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    {/* <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.navigation.getParam('logoSchool') }} /> */}
                                    <View>
                                        <Text style={{ fontSize: 17 }}>{profile.medicalSchool}</Text>
                                        <Text style={{ color: '#999' }}>{profile.addressSchool}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.schools}>Education</Text>
                                <Text style={{ fontSize: 17, marginTop: 10 }}>{profile.education}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.schools}>Awards</Text>
                                <Text style={{ fontSize: 17, marginTop: 10 }}>{profile.awards}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.title}>Shedule</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MakeAppointment', { profile })}>
                                    <Text style={{ color: '#1590f0' }}>{`See all >`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <ScrollView style={{ marginTop: 10 }} horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.active}>
                                    <Text style={styles.textShedule}>Month</Text>
                                    <Text style={styles.textShedule}>Available</Text>
                                </View>
                                <View style={styles.active}>
                                    <Text style={styles.textShedule}>Month</Text>
                                    <Text style={styles.textShedule}>Available</Text>
                                </View>
                                <View style={styles.active}>
                                    <Text style={styles.textShedule}>Month</Text>
                                    <Text style={styles.textShedule}>Available</Text>
                                </View>
                                <View style={styles.active}>
                                    <Text style={styles.textShedule}>Month</Text>
                                    <Text style={styles.textShedule}>Available</Text>
                                </View>
                            </ScrollView>
                        </View>


                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.title}>Location</Text>
                            <Text style={{ fontSize: 16, marginTop: 20 }}>{profile.address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 15, borderRadius: 5, borderWidth: .5, borderColor: '#999', marginTop: 10 }}>
                    <MapView style={styles.mapStyle}
                        cacheEnabled
                    />
                </View>
                <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                    <Text style={styles.title}>Reviews</Text>
                </View>
                <Divider marginTop={20} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Appointments')}
                    style={styles.btnContainer}>
                    <Text style={{ color: '#fff', fontSize: 17 }}>Book Appointments</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    setting: {
        flex: 1,
        textAlign: 'left'
    },
    icon: {
        flex: 1,
        textAlign: 'right'
    },
    data: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 50,
    },
    informations: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 42,
        marginBottom: 20
    },
    TextData: {
        marginRight: 60,
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        marginRight: 40,
        color: '#999'
    },
    anotherData1: {
        borderWidth: .5,
        borderColor: '#1590f0',
        padding: 25,
        marginLeft: 15,
        borderRadius: 5,
        textAlign: 'left'
    },
    anotherData2: {
        borderWidth: .5,
        borderColor: '#1590f0',
        padding: 25,
        marginRight: 15,
        borderRadius: 5
    },
    biography: {
        marginTop: 30,
    },
    schools: {
        color: '#999'
    },

    active: {
        backgroundColor: '#1590f0',
        padding: 10,
        borderRadius: 8,
        marginLeft: 15,
        width: 150
    },
    textShedule: {
        color: '#fff',
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    mapStyle: {
        width: '100%',
        height: 250,
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1590f0',
        padding: 13,
        borderRadius: 7,
        marginHorizontal: 15,
        marginBottom: 30
    },
    icons: {
        borderWidth: 1,
        borderRadius: 30,
        padding: 6,
        paddingTop: 5,
        paddingBottom: 6,
        borderColor: '#999',
        marginLeft: 10
    },
});


const mapStateToProps = state => {
    return {

        loading: state.authProfile.loading,
        error: state.authProfile.error,
        signup: state.authProfile.signup,
        profile: state.authProfile.profile,
        login: state.authProfile.login

    }
};

export default connect(mapStateToProps)(Profile01);
