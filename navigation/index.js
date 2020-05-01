
import React from 'react'
import {  createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from "@expo/vector-icons";

import SignIn from '../screen/SignIn';
import Welcome from '../screen/Welcome';
import Browse01 from '../screen/Browse01';
import CreateAccount from '../screen/CreateAccount';
import LoadingScreen from '../screen/LoadingScreen';
import Account from '../screen/Account';
import OverView from '../screen/OverView';
import Consultations from '../screen/Consultations';


const TabStack = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: Browse01,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
                    }
                },
                Data: {
                    screen: Account,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-calendar" size={24} color={tintColor} />
                    }
                },
                Consultations: {
                    screen: Consultations,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
                        )
                    }
                },
                Notification: {
                    screen: Browse01,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
                    }
                },
                Profile: {
                    screen: Account,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
                    }
                }
            },{
            defaultNavigationOptions: {},
            tabBarOptions: {activeTintColor: "#E9446A", inactiveTintColor: "#B8BBC4", showLabel: false}}),
    },
    {
        mode: "modal",
        headerMode: "none"
      // initialRouteName: "postModal"
}   
);

    const AppStack = createStackNavigator({
        Main: {screen: TabStack},
        OverView
    },{
    defaultNavigationOptions: {
    header: null
    }
    })

    const AuthStack = createStackNavigator({
        Welcome,
        SignIn,
        CreateAccount,
    },{
    defaultNavigationOptions: {
        header: null    
    }
    })

    export default createAppContainer(
        createSwitchNavigator({
            Loading: LoadingScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Loading'
            }
        )
    )