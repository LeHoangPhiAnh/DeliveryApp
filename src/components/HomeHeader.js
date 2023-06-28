import React from 'react'

import {View, Text, StyleSheet} from 'react-native';
import {Icon, withBadge} from 'react-native-elements'
import {Colors, Parameters} from '../global/styles'

export default function HomeHeader({navigation}){

 const BadgeIcon = withBadge(0)(Icon)

    return(
    <View style ={styles.header}>

        <View style ={{alignItems:"center", justifyContent:"center"}}>
            <Text style ={{color:Colors.cardbackground, fontSize:25,fontWeight:'bold'}}>Quán Việt</Text>
        </View>

    </View>
    )
}

const styles = StyleSheet.create({

    header:{
        flexDirection:'row',
        backgroundColor:Colors.colorMain,
        height:Parameters.headerHeight,
        justifyContent:'center'
    }
})