
import React from 'react'
import {  createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from "@expo/vector-icons";


import LoadingScreen from '../screen/LoadingScreen';
import Onboarding from '../screen/Onboarding';
import Welcome from '../screen/Welcome';
import CreateAccount from '../screen/CreateAccount';
import SignUpDoctor from '../screen/SignUpDoctor';
import ForgetPassword from '../screen/ForgetPassword';
import SetLocation from '../screen/SetLocation';
import Browse01 from '../screen/Browse01';
import Account from '../screen/Account';
import Consultations from '../screen/Consultations';
import Notifications from '../screen/Notifications';
import ChooseLocation from '../screen/ChooseLocation';
import ChatScreen from '../screen/ChatScreen';
import Settings from '../screen/Settings';
import Language from '../screen/Language';
import ChangePassword from '../screen/ChangePassword';
import Profile01 from '../screen/Profile01';
import Review from '../screen/ReviewAppointment';
import Appointments from '../screen/Appointments';
import MakeAppointment from '../screen/MakeAppointment';
import Success from '../screen/Success';
import Details from '../screen/Details';
import Map from '../screen/Map';
import Categories from '../screen/Categories';
import Specialty from '../screen/Specialty';
import Search from '../screen/Search';
import Payment from '../screen/Payment';


const TabStack = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Browse01: {
                    screen: Browse01,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-search" size={24} color={tintColor} />
                    }
                },
                Appointments: {
                    screen: Appointments,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-calendar" size={24} color={tintColor} />
                    }
                },
                Consultations: {
                    screen: Consultations,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons name="ios-chatbubbles" size={24} color={tintColor}/>
                        )
                    }
                },
                Notifications: {
                    screen: Notifications,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
                    }
                },
                Account: {
                    screen: Account,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
                    }
                }
            },{
            defaultNavigationOptions: {},
            tabBarOptions: {activeTintColor: "#1590f0", inactiveTintColor: "#B8BBC4", showLabel: false}}),
    },
    {
        mode: "modal",
        headerMode: "none"
}   
);


    const AppStack = createStackNavigator({
        Main: {screen: TabStack},
        Search,
        Map,
        ChatScreen,
        Settings,
        ChangePassword,
        ForgetPassword,
        Language,
        SetLocation,
        Profile01,
        Review,
        MakeAppointment,
        Success,
        Details,
        Categories,
        Specialty,
        Payment,
        

    },{
    defaultNavigationOptions: {
        headerShown: false
    }
    })

    const AuthStack = createStackNavigator({
        Welcome,
        SignUpDoctor,
        CreateAccount,
    },{
    defaultNavigationOptions: {
        headerShown: false    
    }
    })

    export default createAppContainer(
        createSwitchNavigator({
            Loading: LoadingScreen,
            Onboarding,
            Auth: AuthStack,
            App: AppStack
        },
        {
            initialRouteName: 'Loading'
            }
        )
    )