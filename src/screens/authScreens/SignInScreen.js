import React,{useState,useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,Alert ,TouchableOpacity} from 'react-native'
import {Colors, Parameters} from "../../global/styles"
import * as Animatable from 'react-native-animatable'
import {Icon, Button} from 'react-native-elements'
import Header from '../../components/Header';
import {auth} from '../../../firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../../redux/actions/CustomersAction';
import { fetchAllRestaurants } from '../../redux/actions/RestaurantsAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL,getStorage, ref } from 'firebase/storage';
import { fetchAllOrders } from '../../redux/actions/OrdersAction';
import { fetchAllDishOrdered } from '../../redux/actions/DishOrderedAction';
import { fetchAllDishes} from '../../redux/actions/DishesAction'

export default function SignInScreen({navigation}){
    const dbCustomer = useSelector((state) => state.CustomersReducer);
    const dbRestaurant = useSelector((state) => state.RestaurantsReducer);
    const storeData = async (id,Name,Email,PhoneNumber,City,District) => {
        try {
          await AsyncStorage.setItem("id", id)
          await AsyncStorage.setItem("name", Name)
          await AsyncStorage.setItem("email", Email)
          await AsyncStorage.setItem("phonenumber", PhoneNumber)
          await AsyncStorage.setItem("city", City)
          await AsyncStorage.setItem("district", District)
        } catch (e) {
            console.log("AsyncStorage Error")
        }
      }
      const uriData = async (uri) => {
        try {
          await AsyncStorage.setItem('uri', uri)
        } catch (e) {
            console.log("AsyncStorage Uri Error")
        }
      }
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAllCustomers());
      dispatch(fetchAllRestaurants());
      dispatch(fetchAllDishes());
      dispatch(fetchAllOrders());
      dispatch(fetchAllDishOrdered())
    }, []);
    //login auth firebase
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[textInput2Fossued, setTextInput2Fossued] = useState(false)
    const textInpput1 = useRef(1)
    const textInput2 = useRef(2)

    //read and save User
    const handleSignIn =  () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            AsyncStorage.clear()
            dbCustomer.Customers.map((x) => {
                if(x.Email == email)
                {
                    AsyncStorage.clear()
                    storeData(x.id,x.Name,x.Email,x.PhoneNumber,x.City,x.District)
                    func(x.id)
                    navigation.navigate("HomeScreen")
                }
            })
            dbRestaurant.Restaurants.map((x) => {
                if(x.Email == email)
                {
                    AsyncStorage.clear()
                    AsyncStorage.setItem("idRestaurant", x.id)
                    navigation.navigate("HomeRestaurantScreen")
                }
            })
            if(email == "phianhlehoang@gmail.com")
            {
                navigation.navigate("AdminCustomerScreen")
            }
        })
        .catch(error => {
            const errorCode = error.code;
            if(errorCode === 'auth/too-many-requests' || errorCode === 'auth/wrong-password' || errorCode === 'auth/internal-error')
            {
                Alert.alert("Mật khẩu hoặc tài khoản chưa đúng!")
            }
            if(errorCode === 'auth/user-not-found' )
            {
                Alert.alert("Tài khoản chưa được đăng ký!")
            }
        })
    }
    const func = async (id) =>{
        const storage = getStorage()
        const reference = ref(storage,`images/Customer/${id}.jpg`)
        await getDownloadURL(reference).then((uri)=>{
            uriData(uri)
        })
    }

    return(
        <View style ={styles.container}>
             <Header title ="Đăng Nhập"  type ="arrow-left" navigation ={navigation}/>  
            <View style={{justifyContent: 'center',}}>
                <View style ={{alignItems:"center",marginTop:10}}>
                    <Text style= {styles.text1} >Please enter the email and password</Text>
                    <Text style= {styles.text1} >Registered with your account</Text> 
                </View>

                <View>
                    <View style ={{marginTop:20}}>
                    <View>
                        <TextInput 
                        style ={{...styles.TextInput1,height:40}}
                        placeholder ="Email"
                        ref ={textInpput1}
                        onChangeText = {(text) => setEmail(text)}
                        />
                    </View>


                    <View style ={styles.TextInput2}>
                        <TextInput 
                        style= {{flex:1,height:40}}
                        placeholder ="Password"
                        ref ={textInput2}
                        onFocus ={()=>{
                            setTextInput2Fossued(false)
                        }}

                        onBlur ={()=>{
                            setTextInput2Fossued(true)
                        }}
                        onChangeText = {(text) => setPassword(text)}
                        />
                    <Animatable.View animation ={textInput2Fossued?"":"fadeInLeft"} duration={500} >
                        
                            <Icon 
                                    name ="visibility-off"
                                    iconStyle ={{color:Colors.grey3}}
                                    type ="material"
                                    style={{marginRight:10}}
                                    
                                />
                    </Animatable.View>
                    </View>
                </View>
                <View></View>
                <View style ={{marginHorizontal:20, marginTop:30,marginBottom:17}}>
                    <Button 
                        title ="Đăng Nhập"
                        buttonStyle = {Parameters.styledButton}
                        titleStyle = {Parameters.buttonTitle}
                            onPress={handleSignIn}
                            // onPress={()=>{navigation.navigate("HomeScreen")}}
                    />
                </View>  
                </View>

                <View style ={{alignItems:"center",marginTop:30, marginBottom:30}}>
                    <Text style ={{fontSize:20, fontWeight:"bold"}}>OR</Text>
                </View>    

                <View style={{marginHorizontal:10,marginTop:10,marginBottom:20}}>
                    <Button
                        title = "Đăng ký"
                        buttonStyle = {styles.createButton}
                        titleStyle = {styles.createButtonTitle}
                        onPress ={()=>{navigation.navigate("SignUpScreen")}}
                    />
                </View>
                </View>


        </View>
    )


}

const styles = StyleSheet.create({
    container :{
        flex:1
    },

    text1:{
        color:Colors.grey3,
        fontSize:16
    },

    TextInput1:{
        borderWidth:1,
        borderColor:"#86939e",
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15
      },

      TextInput2:{
        borderWidth:1,
         borderRadius:12,
         marginHorizontal:20,
         borderColor:"#86939e",
         flexDirection:"row",
         justifyContent:"space-between",
         alignContent:"center",
         alignItems:"center",
         paddingLeft:15
  
      },

      SocialIcon :{
        borderRadius :12,
        height:50
      },

      createButton:{
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:"#ff8c52",
        height:40,
        paddingHorizontal:20,
      },

      createButtonTitle:{
        color:"#ff8c52",
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
      },
      createButton:{
        backgroundColor:"white",
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.grey1,
        height:50,
        paddingHorizontal:20,

    },
    createButtonTitle:{
        color:Colors.grey1,
        fontSize:20,
        fontWeight:'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-3
    }

    
})


