import React from "react";
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen, IntroScreen, LoginScreen, RegisterScreen } from "../screens/auth";
import { HomeScreen, SearchScreen, SearchResultScreen } from "../screens/home";
import MainTabNavigation from './MainTabNavigation';
import { COLOR } from "../res";

const MainStack = createNativeStackNavigator();

function MainStackNavigation() {

    //lấy user token
    //tạm thời coi như người dùng đã đăng nhập để thiết kế những screen bên trong app
    const userToken = 'abcdef';
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        //giả sử lấy được userToken trong 1s
        const timerId = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timerId)
    }, [])

    //1. lấy thông tin userToken, nếu vấn chưa lấy được thì chờ ở SplashScreen
    if (isLoading) {
        return (<SplashScreen />)
    }
    //2. đã lấy được userToken, kiểm tra xem user đã đăng nhập chưa?
    return (
        <MainStack.Navigator
        // screenOptions={{
        //     headerTransparent: true,
        //     headerTitle: '',
        // }}
        >
            {userToken === null ? (
                <MainStack.Group
                    initialRouteName="Intro"
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <MainStack.Screen
                        name='Intro'
                        component={IntroScreen}
                    />
                    <MainStack.Screen
                        name='Login'
                        component={LoginScreen}
                    />
                    <MainStack.Screen
                        name='Register'
                        component={RegisterScreen}
                    />
                </MainStack.Group>
            ) : (
                <MainStack.Group>
                    <MainStack.Screen
                        name='MainTab'
                        component={MainTabNavigation}
                        options={{
                            headerShown: false
                        }}
                    />
                    <MainStack.Screen
                        name='Search'
                        component={SearchScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <MainStack.Screen
                        name='SearchResult'
                        component={SearchResultScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </MainStack.Group>
            )}


        </MainStack.Navigator>
    )
}

export default MainStackNavigation;