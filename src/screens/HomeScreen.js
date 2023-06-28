import React,{useEffect, useState} from 'react'
import {View, Text, StyleSheet,
         FlatList,StatusBar, Image, Modal} from 'react-native';
import Header from '../components/Header';
import {Colors} from '../global/styles';
import RestaurantCard from '../components/RestaurantCard';
import { fetchAllDishes } from '../redux/actions/DishesAction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRestaurants } from '../redux/actions/RestaurantsAction'
import { fetchAllCustomers } from '../redux/actions/CustomersAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import OrderInvisibleScreen from './orderScreen/OrderInvisibleScreen';
import OrderScreen from './orderScreen/OrderScreen';
import { CreateOrderAction, fetchAllOrders } from '../redux/actions/OrdersAction';


export default function HomeScreen({navigation}){
    const [indexCheck, setIndexCheck] = useState()
    const dispatch = useDispatch()

    const [idCustomer,setIdCustomer] = useState('')
    const [idRestaurant,setIdRestaurant] = useState('')

    const [district,setDistrict] = useState('')
    const [city,setCity] = useState('')


    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleOrder, setModalVisibleOrder] = useState(false);
    const dbDishes = useSelector((state) => state.DishesReducer);
    const dbRestaurant = useSelector((state) => state.RestaurantsReducer);
    const [dishOrdered,setDishOrdered] = useState([])

    async function fetch(){
        AsyncStorage.getItem('id').then(result => {
            setIdCustomer(result)
        })
        AsyncStorage.getItem('district').then(result => {
            setDistrict(result)
        })
        AsyncStorage.getItem('city').then(result => {
            setCity(result)
        })
    }
    useEffect(() => {
        dispatch(fetchAllCustomers())
        dispatch(fetchAllDishes())
        fetch()
        AsyncStorage.getItem('id').then(result => {
            setIdCustomer(result)
        })
    },[])
    // const finalOrder = () => {
    //     navigation.navigate("MyOrdersScreen")
    // }
    const addDish = (Id) => {
        dbDishes.Dishes.map((item) =>{
            if(Id == item.Id)
            {
                setDishOrdered([...dishOrdered,{Id:Id,
                    Image:item.Image,
                    Name:item.Name,
                    Price:item.Price,
                    Number:1,
                    Sum: item.Price,
                    IdOrdered:''}])
            }
        })
    }

    const removeDish = (idRemove) =>{
        const newDish = dishOrdered.filter(item => item.Id !== idRemove)
        setDishOrdered(newDish)
    }

    const removeAllDish = () => {
        setDishOrdered([])
    }

    const renderItemDishes = ({item}) => {
        return(       
        <View style={{flex:1,position: 'relative',}}>
            <TouchableOpacity
                    onPress ={()=>{
                        dispatch(fetchAllOrders())
                        setIndexCheck(item.Id)
                        addDish(item.Id)
                        setModalVisible(true)
                    }}
                >
                <View style ={indexCheck === item.Id ? {...styles.smallCardSelected}:{...styles.smallCard}}>
                    <View style={{position: 'relative',}}>
                        <Image
                            style ={indexCheck === item.Id ? {...styles.imgSelected}:{...styles.img}}
                            source = {{uri: item.Image}}
                        />
                    </View>
                    <View style ={indexCheck === item.Id ? {...styles.smallTextSected}:{...styles.smallText}}>
                            <Text style ={indexCheck === item.Id ? {...styles.smallCardTextSected}:{...styles.smallCardText}}>
                                {item.Name}
                            </Text>
                        </View>
                </View>
            </TouchableOpacity>
        </View>
    )}

    const renderItemRestaurants = ({item}) =>{
        fetch()
            if(item.District == district && item.City == city)
            {
                return(
                    <TouchableOpacity
                    onPress={() => {
                        setIdRestaurant(item.id)
                        AsyncStorage.setItem('idRestaurant',item.id)
                        dispatch(CreateOrderAction({idRestaurant:item.id,idCustomer:idCustomer,Status:"Order...",Sum:0}))
                    }}
                    style={{marginVertical:10}}>
                            <RestaurantCard 
                                restaurantName ={item.Name}
                                cityAddress = {item.City}
                                districtAddress = {item.District}
                                phoneNumber={item.PhoneNumber}
                            />
                    </TouchableOpacity>
                )            
            }
    }
    return(
    <View style ={styles.container}>
    <Header title={'Quán Việt'} />
    <View>
        <FlatList 
                    horizontal ={true}
                    data = {dbDishes.Dishes}
                    extraData = {indexCheck}
                    renderItem = {renderItemDishes}
        />
    </View>
    <View style ={styles.headerTextView}>
                <Text style ={styles.headerText}>Nhà hàng ở gần bạn</Text>
    </View>
    <FlatList 
                style ={{marginVertical:10}} 
                data = {dbRestaurant.Restaurants}
                renderItem = {renderItemRestaurants}  
    />
        <View style={
           modalVisibleOrder ? {bottom:254,height:'100%'} : {...modalVisible ? {...styles.bottomSheetSelect}:{...styles.bottomSheet}}
        }>
            {modalVisibleOrder ? 
                <OrderScreen 
                setInvisible={setModalVisible} 
                setInvisibleOrder={setModalVisibleOrder} 
                modalVisibleOrder={modalVisibleOrder}
                setIndexCheck={setIndexCheck}
                // finalOrder={finalOrder}
                //data
                removeDish={removeDish}
                dishOrdered={dishOrdered}
                setDishOrdered={setDishOrdered}
                />
                :
                <OrderInvisibleScreen 
                dishOrdered={dishOrdered}
                setDishOrdered={setDishOrdered}
                setVisible={setModalVisibleOrder}
                setInvisible={setModalVisible}
                setIndexCheck={setIndexCheck}
                removeAllDish={removeAllDish}
                />    
            }
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    deliveryButton:{
        paddingHorizontal:20,
         borderRadius:15,
         paddingVertical:5
    },
    deliveryText:{
        marginLeft:5,
        fontSize:16
    },
    filterView:{flexDirection:"row" ,
                 alignItems:"center", 
                 justifyContent:"space-evenly",
                 marginHorizontal:10,
                 marginVertical:10
                },

    addressView:{flexDirection:"row",
                 backgroundColor:Colors.grey5,
                 borderRadius:15,
                 paddingVertical:3,
                 justifyContent:"space-between",
                 paddingHorizontal:20
                },

    headerText:{
        color:Colors.cardbackground,
        fontSize:24,
        fontWeight:"bold",
        paddingLeft:10,
    },
    headerTextView:{
        backgroundColor:Colors.colorMain,
        paddingVertical:8,
    },

    smallCard :{
        borderRadius:40,
        backgroundColor:Colors.grey5,
        justifyContent:"center",
        alignItems:'center',
        padding:5,
        width:80,
        margin:10,
        height:80
    },

    smallCardSelected:{
        borderRadius:110/2,
        backgroundColor:Colors.colorMain,
        justifyContent:"center",
        alignItems:'center',
        padding:5,
        width:110,
        margin:10,
        height:110
    },

    smallCardTextSected :{
        fontSize:18,
        fontWeight:"bold",
        color:Colors.grey1,
        textAlign:'center',
        marginTop: 70,
        width:150
    },

    smallCardText :{
        fontWeight:"bold",
        color:Colors.grey2,
        fontSize:0
    },

    floatButton:{
        position:'absolute',
        bottom:10,right:15,
        backgroundColor:'white',
        elevation:10,
        width:60,height:60,
        borderRadius:30,
        alignItems:'center'
    },
    smallTextSected:{
        opacity:0.8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height:'100%',
    },
    smallText:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        height:60,
        width:60,
        borderRadius:30
    },
    imgSelected:{
        height:70,
        width:70,
        borderRadius:45,
        marginBottom: 22,
    },
    bottomSheetSelect:{
        position:'absolute',
        width:'100%',
        height:62,
        bottom:0,
    },
    bottomSheet:{
        position:'absolute',
        width:'100%',
        bottom:-72
    }


})