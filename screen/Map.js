//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux';

import firebase from '../Firebase';
// create a component
class Map extends Component {

    state = {
        users: [],
        latitude: null,
        longitude: null
    }

    componentDidMount() {
        firebase.database().ref('specialty').on('child_added', (val) => {
            val.forEach((snapVal) => {
                let users = snapVal.toJSON();
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, users]
                    }
                })
            })

        });
    };


    UNSAFE_componentWillMount() {
        this.getLocation();
    }


    getLocation = async () => {
        try {

            await navigator.geolocation.getCurrentPosition((position) => {

                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                console.log(position.coords.latitude)
                console.log(position.coords.longitude)
            },
                // { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
            );
        } catch (e) {
            console.log(e);
        }
    };

    // onChangeListItem = (index) => {
    //     let location = this.state.users[index];
    //     this.map.animateToRegion(
    //         {
    //             latitude: location.latitude,
    //             longitude: location.longitude,
    //             latitudeDelta: 0.003,
    //             longitudeDelta: 0.00035
    //         }, 500
    //     )
    // };

    renderRowusers = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Profile01', { item })} >

                <View>
                    <Image
                        source={{ uri: item.photoURL }}
                        style={{ flex: 1, width: 90, height: 90, resizeMode: 'cover', borderRadius: 7, marginRight: 5 }}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    <View>
                        <View>
                            <Text style={{ fontSize: 18 }}>{item.displayName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' type='ionicon' size={15} color='#999' />
                            <Text style={styles.textTitle}>  {item.address} ,</Text>
                            <Text style={styles.textTitle}> {item.specialty}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textTitle}> {item.experience}
                                <Text style={{ fontSize: 15, textAlign: 'center', color: '#000' }}>  ${item.hourlyRate}/hr</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const location = this.props.profile.location;
        const { latitude, longitude, users } = this.state;
        const location2 = {latitude, longitude};
        // console.log(users.location);
        return (
            <View style={styles.container}>
                <View style={{ flex: 1}}>
                    <View style={styles.containerMap}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} style={styles.location} />
                        </TouchableOpacity>
                        <View>
                            <Ionicons name='ios-funnel' size={25} />
                        </View>
                    </View>
                        <View style={styles.title}>
                            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Browse</Text>
                        </View>
                    <MapView
                        style={{ flex: 1 }}
                        showsUserLocation={true}
                        // followsUserLocation
                        ref={map => this.map = map}
                        
                        initialRegion={{
                            latitude: location ? location.latitude : <ActivityIndicator/>,
                            longitude: location ? location.longitude : <ActivityIndicator/>,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.00035

                        }}
                    >
                        {
                            users.map(item => {
                                return (
                                    <MapView.Marker
                                        description={item.address}
                                        key={item.displayName}
                                        title={item.displayName}
                                        pinColor='#1590f0'
                                        coordinate={{
                                            latitude: item.location.latitude,
                                            longitude: item.location.longitude
                                        }}
                                        onPress={() => this.props.navigation.navigate('Profile01', { item })}
                                    >
                                        <View>
                                            <Image
                                                style={{
                                                    width: 45,
                                                    height: 45,
                                                    borderWidth: 1.5,
                                                    borderColor: '#1590f0',
                                                    borderRadius: 50,
                                                }}
                                                source={{ uri: item.photoURL }}
                                            />
                                            {item.online &&
                                                <View style={{
                                                    backgroundColor: '#00ee4e',
                                                    height: 10,
                                                    width: 10,
                                                    borderRadius: 20,
                                                    shadowColor: '#000',
                                                    shadowOpacity: .15,
                                                    shadowOffset: { width: 0, height: 2 },
                                                    elevation: 2,
                                                    alignSelf: 'center',
                                                    position: 'absolute', top: 0,
                                                    left: 0

                                                }}>

                                                </View>
                                            }
                                        </View>
                                    </MapView.Marker>

                                );
                            })
                        }

                    </MapView>
                    <ScrollView style={{ position: 'absolute', zIndex: 1, bottom: 30 }} >
                        <FlatList
                            horizontal
                            data={this.state.users}
                            renderItem={this.renderRowusers}
                            keyExtractor={(item) => item.uid}
                        />
                    </ScrollView>
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
    containerMap: {
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 60,
        marginLeft: 5
    },
    location: {
        flexDirection: 'row',
        textAlign: 'left',
    },
    card: {
        backgroundColor: '#fff',
        marginLeft: 10,
        flexDirection: 'row',
        elevation: 5,
        borderRadius: 7,
        width: Dimensions.get('window').width / 1.2,
        padding: 7
    },
    textTitle: {
        color: '#666',
        fontSize: 15
    }
});

const mapStateToProps = ({ authProfile }) => {
    return {
        profile: authProfile.profile
    }
};

export default connect(mapStateToProps)(Map);
