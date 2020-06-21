import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Divider } from 'react-native-elements';

import { specialty } from '../contacts';


const { height, width } = Dimensions.get('window')

class Categories extends Component {


    state = {
        categories: [],
        error: null,
        loading: false
    }


    componentDidMount() {

        this.handleItem();

        this.setState({ categories: this.props.categories });
    }



    handleItem = () => {
        const { categories } = this.props;

        this.setState({ loading: true })

        const doctor = categories;
        fetch(doctor).then((res) => res.toString())
            .then((resJson) => {
                this.setState({
                    loading: false,
                    categories: resJson
                })

            }).catch(error => {
                this.setState({ error, loading: false })
            })

    }




    renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={{ marginTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ backgroundColor: '#1590f0', width: 100, height: 100, borderRadius: 7 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={item.images} />
                        </View>

                    </View>

                    <View style={{ marginLeft: 13 }}>
                        <Text style={{ fontWeight: '700' }}>{item.name}</Text>
                        <Text style={{ color: '#999', marginTop: 5 }}>{item.count} doctors</Text>
                    </View>

                </View>
                <View>
                    <Divider style={{ width: width / 1.1 }} />
                </View>
            </TouchableOpacity>
        )
    };



    render() {
        return (
            <View style={styles.logout}>
                <View style={{ marginHorizontal: 15 }}>

                    <View style={{ flexDirection: 'row', marginTop: 32 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={30} style={styles.location} />
                        </TouchableOpacity>

                    </View>


                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Categories</Text>
                    </View>




                </View>

                <ScrollView style={{ marginTop: 40, marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.categories}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                    />
                </ScrollView>

            </View>
        )
    }
}

Categories.defaultProps = {

    categories: specialty.categories,

}

export default Categories;


const styles = StyleSheet.create({
    logout: {
        flex: 1,
        backgroundColor: '#fff'
    },
    search: {
        flex: 1,
        textAlign: 'right',
    },
    location: {
        flexDirection: 'row',
        textAlign: 'left',
    },
})