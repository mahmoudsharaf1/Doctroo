//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, Dimensions } from 'react-native';
import { Icon, Divider, Avatar } from 'react-native-elements';

import firebase from '../Firebase';
// create a component
class ChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: this.props.navigation.getParam('chat'),
            profile: this.props.navigation.getParam('user'),
            textMessags: '',
            messageList: [],
            dbRef: firebase.database().ref('users')
        }
    }

    componentWillMount() {
        firebase.database().ref('messages').child(this.state.profile.uid)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    sendMessage = async () => {
        if (this.state.textMessags.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.profile.uid).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessags,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.profile.uid
            }
            updates['messages/' + '/' + this.state.profile.uid + '/' + msgId] = message
            firebase.database().ref().update(updates)
            this.setState({ textMessags: '' })
        }
    }

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
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        maxWidth: '60%',
                        alignSelf: item.from === this.state.profile.uid ? 'flex-end' : 'flex-start',
                        backgroundColor: item.from === this.state.profile.uid ? '#1590f9' : '#eee',
                        borderRadius: 15,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>  {item.message}  </Text>
                </View>
                <View>
                    <Text style={{ color: 'gray', fontSize: 10, textAlign: 'right' }}>{this.convertTime(item.time)}  </Text>
                </View>
            </View>
        )
    }

    render() {
        let { height } = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: 15, flex: 1, marginTop: 30 }}>

                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Icon name='chevron-left' type='fontawesom' size={50} onPress={() => this.props.navigation.goBack()} />
                            </TouchableOpacity>
                            
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar
                                size={30}
                                rounded
                                source={{ uri: this.state.person.photoURL }}

                            />
                            <Text style={{ fontWeight: 'bold' }}>{this.state.person.displayName}</Text>
                        </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity  style={{marginRight:15}} >
                                <Icon name='ios-videocam' type='ionicon' size={23} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='ios-call' type='ionicon' size={23} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Divider/>


                    <SafeAreaView style={styles.messageList}>

                        <FlatList
                            ref={ref => this.flatList = ref}
                            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                            style={{ padding: 10, height: height * 0.8 }}
                            data={this.state.messageList}
                            renderItem={this.renderRow}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <TextInput
                                style={styles.input}
                                placeholder='Type message...'
                                placeholderTextColor='#999'
                                value={this.state.textMessags}
                                onChangeText={this.handleChange('textMessags')}
                            />

                            <TouchableOpacity onPress={this.sendMessage}
                                style={styles.btnSend}>
                                <Icon
                                    name='ios-paper-plane'
                                    type='ionicon'
                                    color='#1590f0'
                                    size={40}
                                />
                            </TouchableOpacity>

                        </View>

                    </SafeAreaView>

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
    messageList: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 5
    },
    input: {
        padding: 5,
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
        // borderRadius: 30,
        // padding: 10,
        // paddingTop: 7,
        // paddingBottom: 7,
        // backgroundColor: '#1590f9',
        borderRadius: 20
    }
});

//make this component available to the app
export default ChatScreen;
