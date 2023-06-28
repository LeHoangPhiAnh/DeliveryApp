import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Colors} from '../global/styles'
import {Icon} from 'react-native-elements'
import CustomerDataScreen from '../screens/data/CustomerDataScreen'
import RestaurantDataScreen from '../screens/data/RestaurantDataScreen'
import DishDataScreen from '../screens/data/DishDataScreen'


const ClientTabs = createBottomTabNavigator();


export default function RootClientAdminTabs(){

    return(
        <ClientTabs.Navigator
        screenOptions = {{
            tabBarActiveTintColor :Colors.colorMain,
            tabBarShowLabel:false}}>
        
        <ClientTabs.Screen 
            name ="CustomerDataScreen"
            component = {CustomerDataScreen}
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
        <ClientTabs.Screen 
            name ="RestaurantDataScreen"
            component = {RestaurantDataScreen}
            options ={
                {
                    headerShown:false,
                    tabBarLabel : "",
                    tabBarIcon: ({color,size})=>(
                        <Icon 
                            name ='storefront'
                            type = 'material'
                            color ={color}
                            size ={size}
                        />
                    )
                }
            }
        />
                <ClientTabs.Screen 
            name ="DishDataScreen"
            component = {DishDataScreen}
            options ={
                {
                    headerShown:false,
                    tabBarLabel : "",
                    tabBarIcon: ({color,size})=>(
                        <Icon 
                            name ='restaurant'
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