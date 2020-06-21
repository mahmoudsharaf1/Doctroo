//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    TouchableHighlight
} from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import firebase from '../Firebase';


// create a component
class Details extends Component {

    state = {
        modalVisible: false,
        order: '',
        users: [],
        dbRef: firebase.database().ref('users/doctors/'),
    };


    componentWillMount() {
        const detail = this.props.navigation.getParam('item');
console.log(detail)
        this.state.dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;

            this.setState((prevState) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        })
    };


    componentDidMount() {
        this.detailOrder()
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };


    detailOrder() {
        const detail = this.props.navigation.getParam('item');


        if (detail.meeting.Consultation === true) {
            this.setState({ order: 'Consultation' });

        } else if (detail.meeting.Treatment === true) {
            this.setState({ order: 'Treatment' });

        }

    };


    renderRow = () => {
        const detail = this.props.navigation.getParam('item');
        const chat = detail.profileDoctor;
        const user = detail.profile;
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatScreen', {chat, user})}>
                <Ionicons name='ios-chatbubbles' size={23} style={{ color: '#1590f0' }}
                    accessibilityValue={this.state.users}
                />
            </TouchableOpacity>
        )
    };


    render() {
        const detail = this.props.navigation.getParam('item');
        const { modalVisible } = this.state;
        const { order } = this.state;
        
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ marginHorizontal: 15 }}>

                        <View style={{ flexDirection: 'row', marginTop: 32 }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                                <Icon name='ios-arrow-back' type='ionicon' size={30} style={styles.location} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: detail.profileDoctor.photoURL }}
                                    style={{ width: 65, height: 65, resizeMode: 'cover', borderRadius: 50, marginRight: 10 }}
                                />

                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{detail.profileDoctor.displayName}</Text>
                                    <Text style={styles.confirmed}>  Confirmed  </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <TouchableOpacity style={[styles.icon, { marginRight: 15 }]}>
                                    {this.renderRow()}
                                </TouchableOpacity>



                                <View>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                        }}
                                    >
                                        <View style={styles.modalView}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Ionicons name='ios-call' size={30} style={{ color: '#32CD32', bottom: 5 }} />
                                                <Text style={styles.modalText}>{detail.profileDoctor.phone.dialCode}</Text>
                                                <Text style={styles.modalText}> {detail.profileDoctor.phone.phoneNumber}</Text>
                                            </View>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                onPress={() => {
                                                    this.setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <Text style={styles.textStyle}>  Cancle  </Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View>
                                        </View>
                                    </Modal>

                                    <TouchableOpacity style={styles.icon} onPress={() => { this.setModalVisible(true) }}>
                                        <Ionicons name='ios-call' size={23} style={{ color: '#1590f0' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Divider style={{ marginTop: 15 }} />

                        <View>

                            <View style={styles.detail}>

                                <Text style={styles.title}>{`Data & Time`}</Text>

                                <View style={styles.settings}>
                                    <Text style={styles.data}>{detail.meeting.selected}</Text>
                                </View>
                                <View style={styles.settings}>
                                    <Text style={styles.title}>{detail.meeting.time}</Text>
                                </View>
                                <Divider style={styles.divider} />
                            </View>

                            <View style={styles.detail}>

                                <Text style={styles.title}>Address</Text>

                                <View style={styles.settings}>
                                    <Text style={styles.data}>{detail.profileDoctor.address}</Text>
                                </View>
                                <View style={styles.settings}>
                                    <Text style={styles.title}>0.31 mi away</Text>
                                </View>
                                <Divider style={styles.divider} />
                            </View>

                            <View style={styles.detail}>
                                <Text style={styles.title}>Fee</Text>

                                <View style={styles.settings}>
                                    <Text style={styles.data}>Total prize ${detail.profileDoctor.hourlyRate}</Text>
                                </View>
                                <View style={styles.settings}>
                                    <Text style={styles.title}>For 30 minutes</Text>
                                </View>
                                <Divider style={styles.divider} />
                            </View>

                            <View style={styles.detail}>
                                <Text style={styles.title}>Need</Text>

                                <View style={styles.settings}>
                                    <Text style={styles.data}>{order}</Text>
                                </View>
                                <View style={styles.settings}>
                                    <Text style={styles.title}>Any kind of {order}</Text>
                                </View>
                                <Divider style={styles.divider} />
                            </View>

                            <View style={styles.detail}>
                                <Text style={styles.title}>Remmber</Text>

                                <View style={styles.settings}>
                                    <Text style={styles.data}>30 minutes before</Text>
                                </View>
                                <View style={styles.settings}>
                                    <Text style={styles.title}>Repeat off</Text>
                                </View>
                                <Divider style={styles.divider} />
                            </View>


                            <View>
                                <TouchableOpacity style={styles.btnContainer} onPress={() => this.props.navigation.goBack()}>
                                    <Text style={{ color: '#999', fontSize: 17 }}>Cancle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        backgroundColor: '#fff',
    },
    confirmed: {
        fontSize: 15,
        backgroundColor: '#32CD32',
        borderRadius: 15,
        color: '#fff',
        marginTop: 3,
        fontSize: 15
    },
    icon: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        paddingTop: 7,
        paddingBottom: 7,
        borderColor: '#999'
    },
    modalView: {
        margin: 20,
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        marginLeft: 7,
        textAlign: "center"
    },
    title: {
        color: '#999'
    },
    data: {
        fontWeight: 'bold'
    },
    settings: {
        marginTop: 3
    },
    detail: {
        marginTop: 20
    },
    divider: {
        marginTop: 5
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        padding: 13,
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom: 30
    }
});

//make this component available to the app
export default Details;
