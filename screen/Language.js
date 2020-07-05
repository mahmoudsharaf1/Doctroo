//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { changeLanguge } from '../actions';
import languages from '../locales/Language.json';
import I18n from '../locales/i18n';



// create a component
class Language extends Component {
    
    showRightIcon(lang) {

        if(lang.locale === this.props.locale) {
            return <Ionicons name='ios-checkmark-circle' type='ionicon' size={25} color='#6CDC17' />
        }
        return <Ionicons name='ios-globe' type='ionicon' size={25} color='#888' />
    }

    onSelectLanguage(lang) {
        this.props.changeLanguge(lang.locale)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: 15, marginTop: 40 }}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Ionicons name='ios-arrow-back' size={30} />
                    </TouchableOpacity>

                    <Text style={{ top: 23, fontSize: 32, fontWeight: 'bold' }}>{I18n.t('Languages')}</Text>

                    <View style={{ backgroundColor: '#eee', borderTopWidth: .5, marginTop: 50 }}>
                        {
                            languages.map((lang) => {
                                return (
                                        <ListItem
                                            key={lang.id}
                                            title={lang.name}
                                            rightIcon={this.showRightIcon(lang)}
                                            style={{ marginBottom: 5, borderRadius: 15, alignItems: 'flex-end' }}
                                            onPress={this.onSelectLanguage.bind(this, lang)}
                                        />
                                   
                                )
                            })
                        }
                        <ListItem 
                            title={I18n.t('Settings')}
                        />

                    </View>
                </View>
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});


const mapStateToProps = ({i18n}) => {
    return {
        locale: i18n.locale
    }
}

//make this component available to the app
export default connect ( mapStateToProps ,{changeLanguge})(Language);
