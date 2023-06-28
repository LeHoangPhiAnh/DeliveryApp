import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../global/styles'

const CardDishOrdered = ({data}) => {
  return (
    <View style={styles.containerBox}>
    <View style={{flex:4}}>
      <Image
      style={{height:100,width:100}}
      source = {{uri:data.Image}}
      />
    </View>
    <View
    style={{justifyContent: 'center',flex:4,alignItems: 'center',}}>
      <Text>{data.Name}</Text>
      <Text>{data.Sum} vnđ</Text>
    </View>
    <View style={{flex:2,justifyContent: 'center',}}>
      <Text style={{textAlign:'center',}}>
        {data.Number}</Text>
    </View>

    </View>
  )
}

export default CardDishOrdered

const styles = StyleSheet.create({
    containerBox:{
        backgroundColor:Colors.cardbackground,
        padding:10,
        borderRadius:10,
        marginVertical:5,
        flexDirection:'row',
        borderBottomColor:Colors.grey3,
        borderWidth:1
      }
})