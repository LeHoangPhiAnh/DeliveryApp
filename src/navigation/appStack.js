import React from 'react'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import RootClientTabs from './ClientTabs';
import RootClientRestaurantTabs from './ClientRestaurantTabs';

const App = createStackNavigator();

export function AppStack(){
    return(
    <App.Navigator>
    <App.Screen 
        name ="Home"
        component ={RootClientTabs}
        options ={{
            headerShown: false,
            ...TransitionPresets.RevealFromBottomAndroid,

        }}
    /> 
    </App.Navigator>
    )
}