
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import SignInWelcomeScreen from '../screens/authScreens/SignInWelcomeScreen';
import SignInScreen from '../screens/authScreens/SignInScreen'
import SignUpScreen from '../screens/authScreens/SignUpScreen';
import { AppStack } from './appStack';
import { AppRestaurantStack } from './appRestaurantStack ';
import { AppAdminStack } from './appAdminStack ';

const Auth = createStackNavigator();

export default function RootNavigator(){
    return(
        <NavigationContainer>
                    <Auth.Navigator>
                            <Auth.Screen 
                                    name ="SignInWelcomeScreen"
                                    component = {SignInWelcomeScreen}
                                    options ={{
                                        headerShown: false,
                                        ...TransitionPresets.RevealFromBottomAndroid
                                    }}
                            />
    
                            <Auth.Screen 
                                name ="SignInScreen"
                                component = {SignInScreen}
                                options ={{
                                    headerShown: false,
                                    ...TransitionPresets.RevealFromBottomAndroid
                                }}
                            />  
    
                            <Auth.Screen 
                                name ="SignUpScreen"
                                component = {SignUpScreen}
                                options ={{
                                    headerShown: false,
                                    ...TransitionPresets.RevealFromBottomAndroid
                                }}
                            /> 
    
                            <Auth.Screen
                                name="HomeScreen"
                                component= {AppStack}
                                options ={{
                                    headerShown: false,
                                    ...TransitionPresets.RevealFromBottomAndroid
                                }}
                            />

                            <Auth.Screen
                                name="HomeRestaurantScreen"
                                component= {AppRestaurantStack}
                                options ={{
                                    headerShown: false,
                                    ...TransitionPresets.RevealFromBottomAndroid
                                }}
                            />

                            <Auth.Screen
                                name="AdminCustomerScreen"
                                component= {AppAdminStack}
                                options ={{
                                    headerShown: false,
                                    ...TransitionPresets.RevealFromBottomAndroid
                                }}
                            />
                            
    
    
    
    
                
                        
                        
                    </Auth.Navigator>
        </NavigationContainer>  
    )
}

