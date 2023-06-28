import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { Colors } from '../../global/styles'

const DishOrderScreen = ({
idOrder,
dishOrdered,
dishDisplay,
setDishOrdered,
removeDish
}) => {
  const increaseNumber = (Id) => {
    setDishOrdered(dishOrdered.map(dish => {
      if(dish.Id === Id){
        if(dish.Number <= 10){
          return {...dish, Number: dish.Number + 1, Sum:(dish.Number + 1) * dish.Price , idOrder:idOrder}
        }
        else{
          return {...dish, Number: 10, Sum:10 * dish.Price, idOrder:idOrder}
        }
      }else{
        return dish
      }
    }))
  } 

  const decreaseNumber = (Id) => {
    setDishOrdered(dishOrdered.map(dish => {
      if(dish.Id === Id){
        if(dish.Number <= 0)
        {
          removeDish(dishOrdered.Id)
          return {...dish, Sum: 0 ,Number: 0}
        }else{
          return {...dish, Number: dish.Number - 1, Sum:(dish.Number - 1) * dish.Price, idOrder:idOrder}
        }
      }else{
        return dish
      }
    }))
  } 

  return (
    <View style={styles.containerBox}>
      <View style={{flex:3}}>
        <Image
        style={{height:100,width:100}}
        source = {{uri:dishDisplay.Image}}
        />
      </View>
      <View
      style={{justifyContent: 'center',flex:3,alignItems: 'center',}}>
        <Text>{dishDisplay.Name}</Text>
        <Text>{dishDisplay.Price} vnđ</Text>
      </View>
      <View style={{flexDirection:'row',flex:3}}>
        <TextInput
        placeholder={dishDisplay.Number}
        keyboardAppearance='numeric'
        style={{textAlign:'center',flex:5,width:20}}
        ></TextInput>
        <View style={{flexDirection: 'row',flex:5}}>
        <TouchableOpacity
        onPress={()=>{
          increaseNumber(dishDisplay.Id)
        }}
        style={{justifyContent: 'center',alignItems: 'center',}}>
          <Icon
          type='material'
          name='add'/>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          decreaseNumber(dishDisplay.Id)
        }}
        style={{justifyContent: 'center',alignItems: 'center',}}>
          <Icon
          type='material'
          name='remove'/>
        </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center',}}>
        <TouchableOpacity
        onPress={() =>{removeDish(dishDisplay.Id)}}
        >
          <Text style={{justifyContent: 'center',alignItems: 'center',fontWeight:'bold',fontSize:18,color:Colors.colorMain }}>X</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default DishOrderScreen

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