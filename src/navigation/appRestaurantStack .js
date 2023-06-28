import React from 'react'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import RootClientTabs from './ClientTabs';
import RootClientRestaurantTabs from './ClientRestaurantTabs';

const App = createStackNavigator();

export function AppRestaurantStack(){
    return(
    <App.Navigator>
    <App.Screen
        name="HomeRestaurant"
        component={RootClientRestaurantTabs}
        options= {{
            headerShown: false,
            ...TransitionPresets.RevealFromBottomAndroid
        }}
    />
    </App.Navigator>
    )
}