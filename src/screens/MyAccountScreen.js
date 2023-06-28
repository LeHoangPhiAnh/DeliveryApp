import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import {View, Text,StyleSheet, Image, TouchableOpacity, Modal, TextInput} from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { Colors } from '../global/styles';
import { fetchAllCustomers, UpdateCustomerAction } from '../redux/actions/CustomersAction';
import { getStorage, ref, getDownloadURL
    ,uploadString,uploadBytesResumable } from "firebase/storage";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchAllRestaurants } from '../redux/actions/RestaurantsAction'


export default function MyAccountScreen({navigation}){
    const dbCustomer = useSelector((state) => state.CustomersReducer);
    const citiesDropdownRef = useRef();
    const dispatch = useDispatch()
    const [id,setid] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phonenumber,setPhoneNumber] = useState('')
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]); 
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]); 
    
    const [image,setImage] = useState({localUri:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'})
    const [modalVisible, setModalVisible] = useState(false);
    const [state,setState] = useState({
        Name: "",
        Email: "",
        PhoneNumber: "",
        City: "",
        District: ""
      });
      async function fetch(){
        AsyncStorage.getItem('id').then(result => {
            setid(result)
        })
        AsyncStorage.getItem('name').then(result => {
            setName(result)
        })
        AsyncStorage.getItem('email').then(result => {
            setEmail(result)
        })
        AsyncStorage.getItem('phonenumber').then(result => {
            setPhoneNumber(result)
        })
        AsyncStorage.getItem('city').then(result => {
            setCity(result)
        })
        AsyncStorage.getItem('district').then(result => {
            setDistrict(result)
        })
        AsyncStorage.getItem('uri').then(result =>{
            setImage({localUri:result})
        })
    }
    useEffect( () =>
    {
        fetch()
        setTimeout(() => {
            setCities([
              {title:'TPHCM', districts: [{title:'Q1'} , {title:'Q5'} , {title:'Q10'} , {title:'Q12'} , {title:'TanBinh'}]},
              {title:'HaNoi', districts: [{title:'HoanKiem'} , {title:'BaDinh'} , {title:'HaiBaTrung'} , {title:'TayHo'} , {title:'DongDa'}]},
              {title:'DaNang', districts: [{title:'CamLe'} , {title:'HaiChau'} , {title:'HoangSa'} , {title:'NguHanhSon'} , {title:'SonTra'}]},
            ])
          }, 1000);
    },[])

    const PIckImage = async () => {
        let result  = await ImagePicker.launchImageLibraryAsync({base64: true})
        if(result.cancelled === true)
        {
            return
        }
        setImage({localUri: result.uri})
        if (Platform.OS === 'web') {
            let base64code = result.base64;
            //upload to firestorage
            await uploadBase64Code(base64code);
        } else {
            let uri = result.uri;
            const blobfile = await convertToBlob(uri);
            await uploadFileBlob(blobfile);
        }
    }
    const convertToBlob = async (uri) => {
        const convert = await new Promise((resolve, reject) => {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.onload = function () {
                resolve(xmlRequest.response);
            }
            xmlRequest.onerror = function () {
                console.log("error here")
            }
            xmlRequest.responseType = "blob";
            xmlRequest.open("GET", uri, true);
            xmlRequest.send(null)
        
        })
    }
    const uploadFileBlob = async (blobfile) => {
        let imgname = id;
        let storage = getStorage();
        let storageref = ref(storage, `images/${role}/${imgname}.jpg`);
        let metadata = {
            contentType: 'image/jpeg'
        }
        const uploadTask = uploadBytesResumable(storageref, blobfile, metadata);
        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => { },
            () => {
                getDownloadURL(snapshot.storage.ref).then(async (downloadURL) => {
                    console.log('downloadURL', downloadURL);
                })
            }
        )
    }
    const uploadBase64Code = async (base64code) => {
        let imgName = id;
        let storage = getStorage();
        let storageref = ref(storage, `images/Customer/${imgName}.jpg`);
        let metadata = {
            contentType: 'image/jpeg'
        }

        uploadString(storageref, base64code, 'base64', metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((async (downloadURL) => {
                console.log('downloadURL', downloadURL);
            }))
        })
    }
    const EditProfile = () => {
        if(state.Email =='')
        {
            state.Email = email
        }
        if(state.Name =='')
        {
            state.Name = name
        }
        if(state.PhoneNumber == '')
        {
            state.PhoneNumber = phonenumber
        }
        if(state.District == '')
        {
            state.District = district
        }
        if(state.City == '')
        {
            state.City = city
        }
        AsyncStorage.setItem("name", state.Name)
        AsyncStorage.setItem("email", state.Email)
        AsyncStorage.setItem("phonenumber", state.PhoneNumber)
        AsyncStorage.setItem("city", state.City)
        AsyncStorage.setItem("district", state.District)
        dispatch(UpdateCustomerAction(id,state))
        setModalVisible(!modalVisible)
        fetch()
        dispatch(fetchAllRestaurants())
    }

    return(
        <View style ={{flex:1,}}>
            <Header title ="Profile"  type ="arrow-left" navigation ={navigation}/>  
            <View style={{flex: 4, backgroundColor:'white'}}>
                <View style={styles.topContainer}>
                    <View style={styles.imgContainer}>
                        <Image style={{height:80,width:80,borderRadius:40}}
                            source={{
                                uri: image.localUri
                            }}/>
                    </View>
                    <View style={styles.contentContainer}>
                            <Text style={{...styles.text, fontWeight:'bold',fontSize:16}}>{name}</Text>
                            <Text style={styles.text}>{email}</Text>
                            <Text style={styles.text}>{phonenumber}</Text>
                            <Text style={styles.text}>{district}, {city}</Text>

                    </View>
                    <TouchableOpacity style={styles.iconContainer}
                    onPress={() => setModalVisible(true)}>
                            <Icon name ='edit' type = "material" size ={24}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:6}}>
                <Modal
                 animationType="slide"
                 transparent={true}
                 visible={modalVisible}
                 onRequestClose = {() =>{
                    setModalVisible(!modalVisible)
                 }}
                 style={{flex: 1,}}
                 >
                    <View style={{opacity:0.1,flex:1,backgroundColor:'black'}}>
                    </View>
                    <View style={styles.modalContainer}>
                        <View style={{padding:10,alignItems: 'flex-end',}}>
                            <TouchableOpacity style={{width:40,height:40,backgroundColor:Colors.colorMain,borderRadius:20,justifyContent: 'center',alignItems: 'center',}} onPress={() =>setModalVisible(!modalVisible)}>
                                <Text style={{color:'white',fontWeight:'bold',
                                fontSize:24,  textAlign: 'center'}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{...styles.imgContainer,...styles.imgInput}}>
                            <TouchableOpacity
                            style={{height:80,width:80,borderRadius:40,borderWidth:1,borderColor:Colors.grey1}}
                            onPress={PIckImage}
                            >
                            {image && <Image style={{height:80,width:80,borderRadius:40, }}
                                                        source={{
                                                        uri: image.localUri,
                                                        }}/>}
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:8}}>
                        <View style={styles.inputContainer}> 
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => {
                            setState({ ...state, Name: value });
                            }}
                            placeholder={name}
                        />
                        </View>
                        <View style={styles.inputContainer}> 
                            <TextInput
                            style={styles.input}
                            onChangeText={(value) => {
                            setState({ ...state, Email: value });
                            }}
                            placeholder={email}
                        />
                        </View>
                        <View style={styles.inputContainer}> 
                            <TextInput
                            style={styles.input}
                            onChangeText={(value) => {
                            setState({ ...state, PhoneNumber: value });
                            }}
                            placeholder={phonenumber}
                        />
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
                        <View>
                            <TouchableOpacity
                            style={{...styles.btnSumit,justifyContent: 'center',alignItems: 'center',}}
                            onPress={EditProfile}
                            >
                                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Sumit</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containerImg:{

    },
    contentContainer:{
        paddingVertical:10,
    },
    textContainer:{
        flex: 8,
        flexDirection:'row',
    },
    text:{
        fontSize:14
    },
    iconContainer:{
        flex:3
    },
    topContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20
    },
    textTitle:{
        marginBottom:2,
    },
    imgContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:4,
        height:50,
        width:50,
        paddingHorizontal:8
    },
    modalContainer:{
        backgroundColor:'#fff',
        flex: 9,
        borderRadius:5
    },
    inputContainer:{
    },
    input:{
        height: 40,
        marginHorizontal: 24,
        marginVertical:8,
        borderWidth: 1,
        color:Colors.grey1,
        padding: 10,
        borderRadius: 4,
    },
    imgInput:{
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
    },
    btnSumit:{
        height: 60,
        marginHorizontal: 24,
        marginVertical:8,
        backgroundColor:Colors.colorMain,
        padding: 10,
        borderRadius: 4,
    },
    dropdown1BtnStyle: {
        flex: 1,
        height: 50,
        paddingVertical:10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        width:"90%",
        margin: 8,
      },
      dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
      dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
      dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
      dropdown1RowTxtStyle: {color: '#444', textAlign: 'center'},
      dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        paddingVertical:10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        width:"90%",
        margin: 8,
      },
      dropdown2BtnTxtStyle: {color: '#444', textAlign: 'center'},
      dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
      dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
      dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
  });