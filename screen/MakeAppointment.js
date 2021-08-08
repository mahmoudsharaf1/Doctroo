//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CheckBox } from 'native-base';
import { Divider, Icon, Avatar } from 'react-native-elements';



class MakeAppointments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Consultation: false,
            Treatment: false,
            time: '',

        }
        this.onDayPress = this.onDayPress.bind(this);
    }


    onDayPress = day => {

        this.setState({
            selected: day.dateString
        })

    }

    ConsultationClick() {
        this.setState({
            Consultation: true, Treatment: false
        })
    }

    TreatmentClick() {
        this.setState({
            Consultation: false, Treatment: true
        })
    }


    renderTab(menu) {
        const { time } = this.state;
        const isActive = time === menu;

        return (
            <TouchableOpacity
                key={`menu-${menu}`}
                onPress={() => this.setState({ time: menu })}
                style={[styles.menu, isActive ? styles.time : null]}
                style={{
                    backgroundColor: isActive ? '#1590f0' : '#fff',
                    borderColor: '#1590f0',
                    borderWidth: .7,
                    paddingVertical: 2,
                    paddingHorizontal:5,
                    borderRadius: 15,
                    marginRight: 10
                }}
            >
                <Text
                    style={{ color: isActive ? '#fff' : '#1590f0', padding: 3, textAlign: 'center' }} > {menu} </Text>
            </TouchableOpacity>
        );
    }


    render() {
        const menus = ['10:00 AM', '11:00 AM', '12:00 PM', '13:00 PM', '14:00 PM', '15:00 PM'];

        const { Consultation, Treatment, selected, time } = this.state;

        const meeting = { Consultation, Treatment, selected, time }

        const doctor = this.props.navigation.getParam('doctors')

        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 40 }}>
                    <Text style={{ marginLeft: 7, color: '#999' }} onPress={() => this.props.navigation.goBack()} >Cancle</Text>
                    <Calendar

                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={this.onDayPress}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => { console.log('selected day', day) }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMM yyyy'}

                        markedDates={{ [this.state.selected]: { selected: true } }}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={true}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        renderArrow={(direction) => (<Arrow />)}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        disableArrowLeft={true}
                        // Disable right arrow. Default = false
                        disableArrowRight={true}
                    />

                    <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Available Time</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={styles.times}>
                                {menus.map(menu => this.renderTab(menu))}
                            </View>
                        </ScrollView>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.demand}>
                                <Text>Consultation</Text>
                                <CheckBox
                                    style={{ marginRight: 7 }}
                                    color={Consultation ? '#6CDC17' : '#888'}
                                    onPress={() => this.ConsultationClick()}
                                    checked={Consultation}

                                />
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.demand}>
                                <Text>Treatment</Text>
                                <CheckBox
                                    style={{ marginRight: 7 }}
                                    color={Treatment ? '#6CDC17' : '#888'}
                                    onPress={() => this.TreatmentClick()}
                                    checked={Treatment}
                                />
                            </View>
                            <Divider style={styles.divider} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.text}>Reminder</Text>
                            <View style={styles.settings}>
                                <Text>Select alert</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#999' }}>30 minutes before</Text>
                                    <TouchableOpacity>
                                        <Icon name='chevron-right' type='fontawesom' size={30} color='#999' style={{ textAlign: 'right' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Divider style={styles.divider} />
                    <View>
                        <TouchableOpacity style={styles.btnContainer} onPress={() => this.props.navigation.navigate('Review', { meeting, doctor })}>
                            <Text style={{ color: '#fff', fontSize: 17 }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    time: {
        backgroundColor: '#1590f0',
        paddingVertical: 7,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginRight: 7,
    },
    menu: {
        backgroundColor: 'rgb(243, 240, 240)',
        paddingVertical: 7,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginRight: 7
    },
    demand: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    divider: {
        marginTop: 10
    },
    settings: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    times: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    touchTime: {
        marginRight: 10,
        borderWidth: .5,
        borderRadius: 15,
        borderColor: '#1590f0',

    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1590f0',
        padding: 13,
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom: 30
    },
});


//make this component available to the app
export default MakeAppointments;


