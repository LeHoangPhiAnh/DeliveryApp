import React from 'react'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import RootClientAdminTabs from './ClientAdminTabs';

const App = createStackNavigator();

export function AppAdminStack(){
    return(
    <App.Navigator>
    <App.Screen
        name="AdminCustomerScreen"
        component={RootClientAdminTabs}
        options= {{
            headerShown: false,
            ...TransitionPresets.RevealFromBottomAndroid
        }}
    />
    </App.Navigator>
    )
}