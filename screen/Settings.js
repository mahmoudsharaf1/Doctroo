//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image , Switch, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Divider} from 'react-native-elements';
import { connect } from 'react-redux';

import firebase from '../Firebase';
import I18n from '../locales/i18n';
import { changeLanguge } from '../actions';
// create a component
class Settings extends Component {

    componentWillMount() {
        I18n.locale = this.props.locale;
    }

    logout = async () => {
        await firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }


    render() {
        const { navigation } = this.props;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={{marginHorizontal: 13, marginTop: 32}}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30}  />
                        </TouchableOpacity>
                        <Text style={{marginTop: 23, fontSize: 25, fontWeight: 'bold'}}>Settings</Text>
                    </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 15}}>Account</Text>

                        <View style={styles.account}>
                            <Image source={require('../images/closed.png')} style={{ marginRight: 10}} />
                            <View style={styles.settings}>
                                <Text style={styles.text}>Change Password</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                            <Divider style={{marginTop: 20, marginHorizontal: 20, marginRight: 20}}/>
                        
                        <View style={styles.account}>
                            <Image source={require('../images/notification.png')} style={{ marginRight: 10}} />
                            <View style={styles.settings}>
                                <Text style={styles.text}>Notifications</Text>
                                <TouchableOpacity>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                            <Divider style={{marginTop: 20, marginHorizontal: 20, marginRight: 20}}/>
                        
                        {/* <View style={styles.account}>
                            <Image source={require('../images/privacy.png')} style={{ marginRight: 10}} />
                            <View style={styles.settings}>
                                <Text style={styles.text}>Privacy Settings</Text>
                                <TouchableOpacity>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                            <Divider style={{marginTop: 20, marginHorizontal: 20, marginRight: 20}}/> */}
                        
                        <View style={styles.account}>
                            <Image source={require('../images/interface.png')} style={{ marginRight: 10}} />
                            <View style={styles.settings}>
                                <Text style={styles.text}>Sign Out</Text>
                                <TouchableOpacity onPress={this.logout}>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                            <Divider style={{marginTop: 20, marginHorizontal: 20, marginRight: 20}}/>

                        <View style={{marginTop: 23}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>More Options</Text>
                            <View style={styles.options}>
                                <Text style={styles.text}>Newsletter</Text>
                                <Switch
                                    trackColor={{ false: "#E1E1E1", true: "#1590f0" }}
                                    value={false}
                                />
                            </View>
 
                            <Divider style={styles.divider}/>

                            <View style={styles.options}>
                                <Text style={styles.text}>Text Messages</Text>
                                <Switch
                                    // trackColor={{ false: "#fff1f1", true: "#1590f0" }}
                                    value={true}
                                />
                            </View>
                            <Divider style={styles.divider}/>

                            <View style={styles.options}>
                                <Text style={styles.text}>Phone Calls</Text>
                                <Switch
                                    // trackColor={{ false: "#fff1f1", true: "#1590f0" }}
                                    value={true}
                                />
                            </View>
                            <Divider style={styles.divider}/>
                        </View>
                           
                            <View style={styles.optionsLinked}>
                                <Text style={styles.text}>Currency</Text>
                                <TouchableOpacity style={{flexDirection: 'row'}}>
                                    <Text style={{top: 5, color: '#999'}}>$-USD</Text>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                            <Divider style={styles.divider}/>
                           
                            <View style={styles.optionsLinked}>
                                <Text style={styles.text}>Languages</Text>
                                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('Language')} >
                                    <Text style={{top: 5, color: '#999'}}>English</Text>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                            <Divider style={styles.divider}/>
                           
                            <View style={styles.optionsLinked}>
                                <Text style={styles.text}>Linked Accounts</Text>
                                <TouchableOpacity style={{flexDirection: 'row'}}>
                                    <Text style={{top: 5, color: '#999'}}>Facebook, Google</Text>
                                    <Icon name='chevron-right' type='fontawesom' size={30} color='#999'/>
                                </TouchableOpacity>
                            </View>
                            <Divider style={styles.divider}/>
                </View>
                <Text> </Text>
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
    account: {
        marginTop: 10, 
        flexDirection: 'row'
    },
    settings: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flex: 1
    },
    options: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: 15 
    },
    text: {
        fontSize: 15
    },
    optionsLinked: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: 10 
    },
    divider: {
        marginTop: 10, 
        marginRight: 20
    }
});


const mapStateToProps = ({i18n}) => {
    return {
        locale: i18n.locale
    }
}

//make this component available to the app
export default connect ( mapStateToProps ,{changeLanguge})(Settings);
