import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Colors} from '../global/styles'
import {Icon} from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyAccountScreen from '../screens/MyAccountScreen';


const ClientTabs = createBottomTabNavigator();


export default function RootClientTabs(){

    return(
        <ClientTabs.Navigator
        screenOptions = {{
            tabBarActiveTintColor :Colors.colorMain,
            tabBarShowLabel:false
                    }}
                >
            <ClientTabs.Screen 
                name ="HomeScreen"
                component ={HomeScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='home'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />



        <ClientTabs.Screen 
                name ="MyOrdersScreen"
                component ={MyOrdersScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='view-list'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />



        <ClientTabs.Screen 
                name ="MyAccount"
                component ={MyAccountScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='person'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />


   


        </ClientTabs.Navigator>
    )
}