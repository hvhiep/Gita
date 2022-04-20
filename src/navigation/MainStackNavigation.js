import React from "react";
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen, IntroScreen } from "../screens/auth";
import { HomeScreen } from "../screens/home";
const MainStack = createNativeStackNavigator();

function MainStackNavigation() {

    //lấy user token
    //biến giả sử người dùng chưa đăng nhập
    const userToken = null;
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            console.log('chuyen sang man hinh khac ne!')
            setIsLoading(false)
        },6000)
    }, [])

    //1. lấy thông tin userToken, nếu vấn chưa lấy được thì chờ ở SplashScreen
    if(isLoading) {
        return (<SplashScreen/>)
    }
    //2. đã lấy được userToken, kiểm tra xem user đã đăng nhập chưa?
    return(
        <MainStack.Navigator initialRouteName="Intro">
            {userToken === null ? (
                <MainStack.Screen name='Intro' component={IntroScreen} />
            ) : (
                <MainStack.Screen name='Home' component={HomeScreen}/>
            )}
            
            
        </MainStack.Navigator>
    )
}

export default MainStackNavigation;