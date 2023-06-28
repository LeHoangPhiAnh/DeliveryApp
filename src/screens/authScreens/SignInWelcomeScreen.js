import { Text, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Colors,Parameters } from '../../global/styles'
import { Button } from 'react-native-elements'
// import Swiper from 'react-native-swiper'

export default function SignInWelcomeScreen({navigation})  {
    return (
        <View style={{flex:1}}>
            <View style={{flex:3,justifyContent:'flex-start',alignItems: 'center',paddingTop:20}}>
                <Text style={{fontSize:26,color:Colors.colorMain,fontWeight:'bold'}}>QUÁN VIỆT</Text>
                <Text style={{fontSize:26,color:Colors.colorMain,fontWeight:'bold'}}>CƠM NHÀ VIỆT</Text>
            </View>

            <View style={{flex:4,justifyContent:'center'}}>
                {/* <Swiper autoplay={true}>
                    <View style={styles.slide1}>
                        <Image
                            source = {{uri:"https://static.kfcvietnam.com.vn/images/category/lg/COMBO%201%20NGUOI.jpg?v=41MPa4"}}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source = {{uri:"https://aeonmall-binhduongcanary.com.vn/wp-content/uploads/2020/08/jollibee-1.jpg"}}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image
                            source = {{uri:"https://aeonmall-binhduongcanary.com.vn/wp-content/uploads/2020/11/321879-he-thong-lotteria-combo-ban-chay-nhat-cho-2-nguoi-sl-co-han.jpg"}}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>
                </Swiper> */}
            </View>

            <View style={{flex:4,justifyContent: 'flex-end',marginBottom:20}}>
                <View style ={{marginHorizontal:20,marginTop:30}}>
                    <Button 
                        title="Đăng Nhập"
                        buttonStyle = {Parameters.styledButton}
                        titleStyle = {Parameters.buttonTitle}
                        onPress = {() => {
                            navigation.navigate("SignInScreen")
                        }}
                    />
                </View>
            </View>

                    <View style={{marginHorizontal:20,marginBottom:20}}>
                            <Button
                                title = "Đăng ký"
                                buttonStyle = {styles.createButton}
                                titleStyle = {styles.createButtonTitle}
                                onPress = {() => {
                                    navigation.navigate("SignUpScreen")
                                }}
                            />
                        </View>
                    </View>

    )
}

const styles = StyleSheet.create({
    slide1:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
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