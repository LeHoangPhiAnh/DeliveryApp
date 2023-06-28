import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Colors} from '../global/styles'
import {Icon} from 'react-native-elements'
import RestaurantHomeScreen from '../screens/RestaurantHomeScreen';
import DeliveryHome from '../screens/DeliveryHome';


const ClientTabs = createBottomTabNavigator();


export default function RootClientRestaurantTabs(){

    return(
        <ClientTabs.Navigator
        screenOptions = {{
            tabBarActiveTintColor :Colors.colorMain,
            tabBarShowLabel:false}}>
        
        <ClientTabs.Screen 
                name ="HomeRestaurantScreen"
                component ={RestaurantHomeScreen}
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
                name ="DeliveryHome"
                component ={DeliveryHome}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='delivery-dining'
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