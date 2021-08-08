//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView, 
    TextInput, 
    FlatList, 
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import { Icon, Divider, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import firebase from '../Firebase';
// create a component
class ChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.getParam('doctor'),
            textMessags: '',
            messageList: []
        }
    }

    componentWillMount() {
        const { profile } = this.props;
        const { user } = this.state;
        firebase.database().ref(`users/profiles/${profile.uid}/messages/`).child(profile.uid).child(user.displayName)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    };
                });
            });
    };

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    sendMessage = async () => {
        const { user, textMessags } = this.state;
        const { profile } = this.props;

        if (this.state.textMessags.length > 0) {
            let msgId = firebase.database().ref().push().key;
            let updates = {};
            let message = {
                message: textMessags,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: profile.uid,
                photoURL: profile.photoURL
            }
            updates[`users/profiles/${user.uid}/messages/` + user.uid + '/' + profile.displayName + '/' + msgId] = message
            updates[`users/profiles/${profile.uid}/messages/` + profile.uid + '/' + user.displayName + '/' + msgId] = message
            firebase.database().ref().update(updates);
            this.setState({ textMessags: '' });
        }
    };

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

        // get Month and Day

        // if(c.getDay !== d.getDay()) {
        //     result = d.getDay() + ' ' + d.getMonth() + ' ' + result     
        // }
        return result;
    }

    renderRow = ({ item }) => {
        const { profile } = this.props;
        return (
            <View style={{ zIndex: 1 }}>
                <Text style={{ color:'#000', fontSize: 10, textAlign: item.from === this.props.profile.uid ? 'right' : 'left' }}>   {this.convertTime(item.time)}   </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        maxWidth: '80%',
                        alignSelf: item.from === this.props.profile.uid ? 'flex-end' : 'flex-start',
                        backgroundColor: item.from === this.props.profile.uid ? '#1590f9' : '#eee',
                        borderRadius: 15,
                        marginTop: 3,
                    }}
                >
                    <View style={{ marginRight: 1 }}>
                        <Text style={{ color: item.from === this.props.profile.uid ? '#fff' : '#000', padding: 5, fontSize: 16, textAlign: 'right' }}>    {item.message} </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        let { height } = Dimensions.get('window');

        console.log(this.props.profile)
        return (
                <KeyboardAvoidingView style={{flex:1}} >
            <View style={styles.container}>
                <View
                    style={{
                        marginHorizontal: 15,
                        flex: 1,
                        marginTop: 30
                    }}>

                    <View
                        style={{
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Icon name='chevron-left' type='fontawesom' size={40} onPress={() => this.props.navigation.goBack()} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar
                                    size={30}
                                    rounded
                                    source={{ uri: this.state.user.photoURL }}

                                />
                                <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{this.state.user.displayName}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: 15 }} >
                                <Icon name='ios-videocam' type='ionicon' size={23} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='ios-call' type='ionicon' size={23} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Divider style={{ marginBottom: 10, marginTop: 5 }} />


                    <SafeAreaView style={styles.messageList}>
                        <FlatList
                            ref={ref => this.flatList = ref}
                            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                            style={{ height: height * 0.8, bottom: 5 }}
                            data={this.state.messageList}
                            renderItem={this.renderRow}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <TextInput
                                style={styles.input}
                                placeholder=' Type message...'
                                placeholderTextColor='#888'
                                value={this.state.textMessags}
                                onChangeText={this.handleChange('textMessags')}
                            />

                            <TouchableOpacity onPress={this.sendMessage}
                                style={styles.btnSend}>
                                <Ionicons
                                    name='ios-paper-plane'
                                    color='#1590f0'
                                    size={40}
                                />
                            </TouchableOpacity>

                        </View>
                    </SafeAreaView>

                </View>
            </View>
                        </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messageList: {
        flex: 1,
        backgroundColor: '#fff',
        bottom: 10,
        marginTop: 5
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCC',
        width: '85%',
        marginBottom: 10,
        borderRadius: 10,
        marginRight: 7,
        backgroundColor: '#eee'
    },
    btnSend: {
        marginBottom: 10,
        marginLeft: 5,
        borderRadius: 20
    }
});

const mapStateToProps = state => {
    return {
        profile: state.authProfile.profile
    }
};

//make this component available to the app
export default connect(mapStateToProps)(ChatScreen);
