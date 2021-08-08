//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Divider, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import { saveMeeting } from '../actions';

// create a component
class ReviewAppointment extends Component {



    componentWillReceiveProps(nextProps) {
        const profileDoctor = this.props.navigation.getParam('doctor')
        const meeting = this.props.navigation.getParam('meeting')
        if (nextProps.saved) {
            this.props.navigation.navigate('Success', { profileDoctor, meeting })
        }
    }

    setMeeting() {
        const { profile } = this.props;
        const meeting = this.props.navigation.getParam('meeting');
        const profileDoctor = this.props.navigation.getParam('doctor');
        const id = profileDoctor.uid;
        const meetingUser = { meeting, profileDoctor };
        const meetingDoctor = { meeting, profile}
        this.props.saveMeeting({ meetingUser, meetingDoctor, id });
    };


    render() {

        const profileDoctor = this.props.navigation.getParam('doctor')
        const meeting = this.props.navigation.getParam('meeting')
        console.log(profileDoctor)
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={{ marginHorizontal: 13, marginTop: 30 }}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 23, fontSize: 25, fontWeight: 'bold' }}>Review</Text>

                    </View>

                    {/* Data & Time */}

                    <View style={styles.review}>
                        <Text style={styles.title}>{`Data & Time`}</Text>

                        <View style={styles.settings}>
                            <Text style={styles.text}>{meeting.selected}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.data}>{meeting.time}</Text>

                        <Divider style={styles.divider} />
                    </View>

                    {/* Doctor */}

                    <View style={styles.review}>
                        <Text style={styles.title}>Doctor</Text>

                        <View style={styles.settings}>
                            <Text style={styles.text}>{profileDoctor.displayName}</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.props.navigation.navigate('Profile01')}>
                                <Avatar
                                    size={25}
                                    rounded
                                    source={{ uri: profileDoctor.photoURL }}

                                />
                                <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.data}>{profileDoctor.specialty}</Text>

                        <Divider style={styles.divider} />
                    </View>

                    {/* Address */}

                    <View style={styles.review}>
                        <Text style={styles.title}>Address</Text>

                        <View style={styles.settings}>
                            <Text style={styles.text}>{profileDoctor.address}</Text>
                            <TouchableOpacity>
                                <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.data}>{profileDoctor.street}</Text>

                        <Divider style={styles.divider} />
                    </View>

                    {/* Payment */}

                    <View style={styles.review}>
                        <Text style={styles.title}>Payment Method</Text>

                        <View style={styles.settings}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text}>Month</Text>
                                <Text style={[styles.data, { marginLeft: 5 }]}>Apple Pay</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name='chevron-right' type='fontawesom' size={30} color='#999' />
                            </TouchableOpacity>
                        </View>


                        <Divider style={styles.divider} />
                    </View>


                    <View style={styles.review}>
                        <Text style={styles.title}>Fee</Text>
                        <View>
                            <Text style={[styles.text, { marginTop: 5 }]}>${profileDoctor.hourlyRate}</Text>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.data}>${profileDoctor.hourlyRate}/ hour</Text>
                            <Text>${profileDoctor.hourlyRate}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                            <Text style={styles.data}>Total</Text>
                            <Text style={{ fontWeight: 'bold' }}>${profileDoctor.hourlyRate}</Text>
                        </View>


                        <TouchableOpacity style={styles.btnContainer} onPress={() => this.setMeeting()} >
                            <Text style={{ color: '#fff', fontSize: 17 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    settings: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    divider: {
        marginTop: 15
    },
    review: {
        marginTop: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 13,
        color: '#999'
    },
    data: {
        fontSize: 13
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1590f0',
        padding: 13,
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 30
    }
});


const mapStateToProps = ({ organize, authProfile }) => {
    return {
        saving: organize.saving,
        saved: organize.saved,
        profile: authProfile.profile
    }
}

//make this component available to the app
export default connect(mapStateToProps, { saveMeeting })(ReviewAppointment);
