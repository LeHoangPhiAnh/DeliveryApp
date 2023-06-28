import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text, View,ScrollView,TextInput,Alert } from 'react-native'
import {Colors} from '../../global/styles'
import Header from '../../components/Header'
import {Icon,Button} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import {auth} from '../../../firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCustomerAction } from '../../redux/actions/CustomersAction'
const SignUpScreen = ({navigation}) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]); 
  const dispatch = useDispatch()
  const [state,setState] = useState({
    Name: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    City: "",
    District: "",
  });
  const citiesDropdownRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setCities([
        {title:'TPHCM', districts: [{title:'Q1'} , {title:'Q5'} , {title:'Q10'} , {title:'Q12'} , {title:'TanBinh'}]},
        {title:'HaNoi', districts: [{title:'HoanKiem'} , {title:'BaDinh'} , {title:'HaiBaTrung'} , {title:'TayHo'} , {title:'DongDa'}]},
        {title:'DaNang', districts: [{title:'CamLe'} , {title:'HaiChau'} , {title:'HoangSa'} , {title:'NguHanhSon'} , {title:'SonTra'}]},
      ])
    }, 1000);
  },[])
  const[passwordFocussed, setPassordFocussed] = useState(false)
  const[passwordBlured,setPasswordBlured] = useState(false)

  //auth
  const handleCreateAccount = () =>
  {
      createUserWithEmailAndPassword(auth,state.Email,state.Password)
      .then((userCredential) => 
      {
          dispatch(CreateCustomerAction(state))
          const user = userCredential.user;
          navigation.navigate('SignInScreen')
      })
      .catch(error  => {
        if(error.code == 'auth/internal-error')
        {
          Alert.alert('Vui lòng nhập mật khẩu')
        }
        if(error.code == 'auth/weak-password')
        {
          Alert.alert('Vui lòng nhập mật khẩu từ 6 kí tư')
        }
        if(error.code == 'auth/email-already-in-use')
        {
          Alert.alert('Tài khoản đã tồn tại!')
        }

      })
  }

  const errrorEmptyValue = () => {
    if(state.City == "" && state.District == "" && state.Name == "" && state.PhoneNumber == "")
    {
      Alert.alert('Vui lòng nhập đầy đủ thông tin')
    }
    else if(state.Name == "")
    {
      Alert.alert('Vui lòng nhập tên')
    } else if (state.PhoneNumber == "")
    {
      Alert.alert('Vui lòng nhập số điện thoại')
    }
    else if(state.City == "" && state.District == "")
    {
      Alert.alert('Vui lòng nhập đầy đủ thông tin')
    } else{
      handleCreateAccount()
    }
  }
    return (
        <View style = {styles.container}>
           <Header title ="Đăng Ký"  type ="arrow-left" navigation ={navigation}/> 
           <ScrollView keyboardShouldPersistTaps = "always">
                <View style ={styles.view2}>
                               <View style ={styles.view6}>
                                  <TextInput 
                                    placeholder = "Mobile Number"
                                    style = {styles.input1}
                                    keyboardType ="number-pad"
                                    autoFocus = {true}
                                    onChangeText = {(value) => {setState({...state, PhoneNumber: value})}}
                                  />
                               </View>
                               <View style ={styles.view6}>
                                  <TextInput 
                                    placeholder = "Name"
                                    style = {styles.input1}
                                    autoFocus = {false}
                                    onChangeText = {(value) => {setState({...state, Name: value})}}
                                  />
                               </View>
                               <View style ={styles.view10}>
                                <View style={{flexDirection:'row',alignItems: 'center',marginBottom:4,width: "100%"}}>
                                  <View>
                                        <Icon 
                                          name ='email'
                                          style ={styles.email}
                                          color ={Colors.grey3}
                                          type ="material"
                                        />
                                    </View>
                                    <View style ={styles.view11}>
                                          <TextInput 
                                            placeholder = "Email"
                                            style = {styles.input4}
                                            autoFocus = {false}
                                            onChangeText = {(value) =>{setState({...state,Email:value})}}
                                          />
                                    </View>
                                </View>

                               </View>

                               <View style = {styles.view14}>
                                    <Animatable.View animation = {passwordFocussed? "fadeInRight":"fadeInLeft"} duration = {500}>
                                       <Icon name ="lock" color ={Colors.grey3}  type = "material" />
                                    </Animatable.View>
                                    <TextInput 
                                          placeholder = "Password"
                                          style = {{flex:1,fontSize:16,paddingLeft:10}}
                                          autoFocus = {false}
                                          onChangeText = {(value) =>{setState({...state,Password:value})}}
                                          onFocus = {()=>{setPassordFocussed(true)}}
                                          onBlur = {()=>{setPasswordBlured(true)}}
                                        />
                                   <Animatable.View  animation = {passwordBlured?"fadeInLeft":"fadeInRight"} duration ={500}>
                                       <Icon name ="visibility-off" color ={Colors.grey3}  type = "material" style ={{marginRight:10}}/>
                                    </Animatable.View>      
                               </View>

                              <View style={{flexDirection:'row',marginTop: 20,}}>
                              <SelectDropdown
                              data={cities}
                              onSelect={(selectedItem, index) => {
                                citiesDropdownRef.current.reset();
                                setDistricts([]);
                                setDistricts(selectedItem.districts);
                                setState({...state,City:selectedItem.title})
                              }}
                              defaultButtonText={'Select country'}
                              buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.title;
                              }}
                              rowTextForSelection={(item, index) => {
                                return item.title;
                              }}
                              buttonStyle={styles.dropdown1BtnStyle}
                              buttonTextStyle={styles.dropdown1BtnTxtStyle}
                              renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                              }}
                              dropdownIconPosition={'right'}
                              dropdownStyle={styles.dropdown1DropdownStyle}
                              rowStyle={styles.dropdown1RowStyle}
                              rowTextStyle={styles.dropdown1RowTxtStyle}
                            />

                              <SelectDropdown
                              ref={citiesDropdownRef}
                              data={districts}
                              onChangeText = {(value) =>{setState({...state,Password:value})}}
                              onSelect={(selectedItem, index) => {
                                setState({...state,District:selectedItem.title })
                              }}
                              defaultButtonText={'Select city'}
                              buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.title;
                              }}
                              rowTextForSelection={(item, index) => {
                                return item.title;
                              }}
                              buttonStyle={styles.dropdown2BtnStyle}
                              buttonTextStyle={styles.dropdown2BtnTxtStyle}
                              renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                              }}
                              dropdownIconPosition={'right'}
                              dropdownStyle={styles.dropdown2DropdownStyle}
                              rowStyle={styles.dropdown2RowStyle}
                              rowTextStyle={styles.dropdown2RowTxtStyle}
                            />
                            </View>
                            <View style ={styles.view17}>
                                  <Button
                                      title = "Đăng Ký"
                                      buttonStyle = {styles.button1}
                                      titleStyle ={styles.title1}
                                      onPress = {errrorEmptyValue}
                                   />
                            </View>
                            </View>
                            <View style = {styles.view18}>
                              <Text style ={styles.text5}>HOẶC</Text>
                            </View>
                            <View style ={styles.view19}>
                                <View style ={styles.view20}>
                                    <Text style ={styles.text6}>Bạn đã có tài khoản ?</Text>
                                </View>
                                <View style ={styles.view21}>
                                    <Button 
                                        title = "Đăng Nhập"
                                        buttonStyle ={styles.button2}
                                        titleStyle = {styles.title2}
                                        onPress ={()=>{navigation.navigate('SignInScreen')}}
                                    />
                                </View>
                            </View>
           </ScrollView>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({

    container:{flex:1,
        backgroundColor:'white'
      },

      view1:{justifyContent:'center',
             alignItems:'flex-start',
             marginTop:10,
             marginBottom:10,
             paddingHorizontal:15
            },

      text1:{fontSize:22,
        color:Colors.colorMain,
        fontWeight:'bold'
      },

      view2:{justifyContent:'flex-start',
             backgroundColor:'white',
             paddingHorizontal:15
            },

      view3:{marginTop:5,
            marginBottom:10
          },

      text2:{fontSize:15,
            color:Colors.grey2
          },

      view4:{flexDirection:'row',
              borderWidth:1,
              borderColor: Colors.grey4,
              borderRadius:12,
              paddingLeft:5
          
            },

      view5:{ marginLeft:30,
              marginTop:20      
               },

      input1:{fontSize:16, paddingLeft:5},

      view6:{flexDirection:'row',
              borderWidth:1,
              borderColor: Colors.grey4,
              borderRadius:12,
              paddingLeft:5,
              marginTop:20,
              height:40
          },

       view7:   {marginLeft:0,
                 maxWidth:"65%",         
               },

      input2:{fontSize:16,
              marginLeft: 0,
              marginBottom:0
                  },         

      view8:{flexDirection:'row',
            borderWidth:1,
            borderColor: Colors.grey4,
            borderRadius:12,
            paddingLeft:5,
            marginTop:20,
            height:40
          },

      view9:{marginLeft:0,
             maxWidth:"65%",    
           },

      input3:{fontSize:16,
        marginLeft: 0,
        marginBottom:0
       },

       view10: {
              alignItems: 'center',
              flexDirection:'row',
              borderWidth:1,
              borderColor:Colors.grey4,
              borderRadius:12,
              paddingLeft:5,
              marginTop:20,
       },

       email:{fontSize:24,
              padding:0,
              marginBottom:0 ,
              marginTop:11,
              marginLeft:2
              },

       view11 : { marginLeft:30,
                  width: "80%",  
                },

       input4:{fontSize:16,
              marginLeft: -20,
              marginBottom:-10
              },      

     view13:  {flexDirection:"row",
              height:40,
            } ,

    view14:{
        height:40,
        borderWidth:1,
        borderRadius:12,
        borderColor:Colors.grey4,
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        paddingLeft:5,
        marginTop:20,
    },       
      
    view15:{alignItems:'center',
            justifyContent:'center',
            marginTop:10
          },

    text3: {fontSize:13
              },
              
      view16:{flexDirection:'row'},

      text4:{textDecorationLine:'underline',
            color:'green',
            fontSize:13
            },

      button1: {backgroundColor:Colors.colorMain,
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:Colors.cardbackground,
        height:50,
        paddingHorizontal:20,
        width:'100%'
                          
      },
      
      title1:{color:"white",
      fontSize:20,  
      fontWeight:"bold" ,
      alignItems:"center",
      justifyContent:"center"  ,
      marginTop:-3
                            
    },

    view17:{marginVertical:10,
            marginTop:30
          },

    view18:{flex:1,
            justifyContent:'flex-start',
            alignItems:'center',
            paddingTop:15,
          },

    text5:   {fontSize:15,
              fontWeight:'bold',
              },
              
      view19:{ backgroundColor:'white',
              paddingHorizontal:15,
              
              },

      view20:{marginTop:5
            },
      
      view21:{marginTop:5,
        alignItems:'flex-end',
      },

      button2:{
        backgroundColor:Colors.colorMain,
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:Colors.cardbackground,
        height:40,
        paddingHorizontal:20,
        // width:'100%'
                          
      },

      title2:{color:Colors.cardbackground,
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
                        
    },
    text6:{
      textAlign:'center'
    },
    dropdown1BtnStyle: {
      flex: 1,
      height: 50,
      marginRight: 5,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'center'},
    dropdown2BtnStyle: {
      flex: 1,
      height: 50,
      marginLeft: 5,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown2BtnTxtStyle: {color: '#444', textAlign: 'center'},
    dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

})