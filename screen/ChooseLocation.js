//import liraries
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert,

} from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ListItem } from 'react-native-elements';
import axios from 'axios';

import { connect } from 'react-redux';

import { savelocation } from '../actions';
import FbConfig from '../FbConfig';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.003;
const LONG_DELTA = 0.0035;

class ChooseLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initMap: true,
            latitude: null,
            longitude: null,
            error: null,
            query: '',
            address: null,
            selectedLocation: null,
            btnDisabled: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.saved) {
            // this.props.navigation.navigate('App');
            Alert.alert('Success')
        }
    }

    setLocation() {
        const { address, latitude, longitude } = this.state;
        this.props.savelocation({ address, latitude, longitude });

    }

    async componentDidMount() {
        //getCurrentPositionAsync
        await navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true }
        );
    };

    search = async () => {
        // Google Api

        let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint += this.state.query;
        endPoint += `&key=${FbConfig.googleApi}`

        try {
            const { data } = await axios.get(endPoint);

            this.setState({ address: data.results });
            console.log(data)
        } catch (e) {
            console.log(e)
        }

        // let address = [];
        // for ( let i = 0; i < 50; i++ ) {
        //     address[i] = { name: `Name ${i}`, address: `Address ${i}`, latitude: 30.511211601035782,longitude: 30.90867916122079 }
        // }
        // this.setState({ address })
    };


    toggleAddress() {
        if (!this.state.address) return;
        return (
            <ScrollView style={{ height: 200 }}>
                {
                    this.state.address.map((item, i) => (
                        <ListItem
                            style={styles.listItem}
                            key={i}
                            title={item.name}
                            subtitle={item.formatted_address}
                            leftIcon={{ name: 'ios-pin', type: 'ionicon' }}
                            onPress={this.setSelectedLocation.bind(this, item)}
                        />
                    ))
                }
            </ScrollView>
        );
    };



    setSelectedLocation(item) {
        const { geometry: { location } } = item

        const formattedItem = {
            name: item.name,
            address: item.formatted_address,
            latitude: location.lat,
            longitude: location.lng
        };

        this.setState({ address: null, selectedLocation: formattedItem, btnDisabled: false });

        this.map.animateToRegion(
            {
                latitude: formattedItem.latitude,
                longitude: formattedItem.longitude,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LONG_DELTA
            }, 500
        )
    }

    showMapMarker() {
        if (!this.state.selectedLocation) return;
        const { latitude, longitude, name } = this.state.selectedLocation;

        return (
            <MapView.Marker
                title={name}
                coordinate={{ latitude, longitude }}
            />
        )
    }



    render() {
        if (!this.state.initMap) {
            return <ActivityIndicator
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size={50} />;
        }
        const { latitude, longitude } = this.state;
        
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={{ zIndex: 1, position: 'absolute',  marginTop: 30 }}>
                        <View style={{ alignItems: 'center',marginHorizontal: 15, flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='ios-arrow-back' size={30} />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: '30%' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your location</Text>
                            </View>
                        </View>
                        <View style={styles.containerSearch}>
                            <TextInput
                                style={styles.search}
                                placeholder='Type location you want'
                                onChangeText={(query) => this.setState({ query })}
                                onSubmitEditing={() => this.search()}
                                rightLabel={
                                    <Ionicons name='ios-search' />
                                }
                            />
                            {/* <Button
                            raised
                            btnContainer={styles.btnContainer}
                            title='Send'
                            disabled={this.state.btnDisabled || this.props.saving}
                            loading={this.props.saving}
                            onPress={this.setLocation.bind(this)}
                        /> */}

                        </View>

                        <View>
                            {this.toggleAddress()}
                        </View>

                    </View>

                </View>


                <View>

                    <MapView
                        ref={map => this.map = map}
                        style={styles.mapStyle}
                        // provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LONG_DELTA

                        }}
                    >

                        {this.showMapMarker()}
                    </MapView>

                </View>

                <TouchableOpacity style={styles.gps}>
                    <MaterialIcons
                        name='gps-fixed'
                        size={27}
                        style={{
                            flex: 1,
                            top: 14,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            color: '#fff'
                        }}    
                    />
                    
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    search: {
        backgroundColor: '#fff',
        marginLeft: 17,
        flex: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        shadowColor: '#fff',
        elevation: 4,
        borderWidth: .5,
        width: width / 1.3
    },
    iconStyle: {
        fontSize: 40,
        color: '#fff',

    },
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItem: {
        backgroundColor: '#fff',
        marginLeft: 17,
        flex: 1,
        marginTop: 10,
        elevation: 5,
        width: width / 1.2
    },
    btnContainer: {
        padding: 10
    },
    gps: {
        position: 'relative',
        zIndex: 1,
        alignSelf: 'flex-end',
        bottom: 100,
        marginHorizontal: 15,
        backgroundColor: '#1590f0',
        height: 55,
        width: 55,
        borderRadius: 50
    },
});


const mapStateToProps = ({ location }) => {
    return {
        saving: location.saving,
        saved: location.saved,
    }
}

//make this component available to the app
export default connect(mapStateToProps, { savelocation })(ChooseLocation);


