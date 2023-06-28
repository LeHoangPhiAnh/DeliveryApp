import React from 'react';

import {View, Text, StyleSheet, } from 'react-native'
import {Colors, Parameters, } from "../global/styles"

import {Icon} from 'react-native-elements'

export default function Header({title,type,navigation}){

    return(
        <View style ={styles.header}>
            <View style ={{marginLeft:20}}> 
                <Icon 
                    type = "material-community"
                    name = {type}
                    color = {Colors.cardbackground}
                    size ={28}
                    
                    onPress ={()=>{navigation.goBack()}}
                />
                
            </View>
            <View>
                    <Text style ={styles.headerText}>{title}</Text>
            </View>

           

        </View>
    )
}


const styles = StyleSheet.create({
    header :{
        flexDirection:"row",
        backgroundColor:Colors.colorMain,
        height:Parameters.headerHeight,
        paddingTop:20
    },

    headerText:{
        color:'white',
        fontSize:22,
        fontWeight:"bold",
        marginLeft:30
    },

})