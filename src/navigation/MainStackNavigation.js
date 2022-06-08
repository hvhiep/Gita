import React from "react";
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen, IntroScreen, LoginScreen, RegisterScreen } from "../screens/auth";
import { SearchScreen, ProductDetailScreen } from "../screens/home";
import { OrderVerificationScreen, AddressScreen, AddressFormScreen, SuccessfulOrderScreen } from "../screens/cart";
import { OrderListScreen, OrderDetailScreen, OrderCancellationScreen } from '../screens/profile';
import MainTabNavigation from './MainTabNavigation';
import FilterDrawerNavigation from "./FilterDrawerNavigation";


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
                        component={IntroScreen} />
                    <MainStack.Screen
                        name='Login'
                        component={LoginScreen} />
                    <MainStack.Screen
                        name='Register'
                        component={RegisterScreen} />
                </MainStack.Group>
            ) : (
                <MainStack.Group
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <MainStack.Screen name='MainTab' component={MainTabNavigation} />
                    <MainStack.Screen name='Search' component={SearchScreen} />
                    {/* <MainStack.Screen ='SearchResult' component={SearchResultScreen}
                        options={{
                            headerShown: false,
                        }} 
                    /> */}
                    {/* Giải thích: để màn hình 'SearchResult' ở trên có 1 cái drawer thì nó phải làm screen con của drawer navigator, do đó đưa nó vào trong 'FilterDrawerNavigation' */}
                    <MainStack.Screen name='FilterDrawer' component={FilterDrawerNavigation} />
                    <MainStack.Screen name='ProductDetail' component={ProductDetailScreen} />
                    <MainStack.Screen name='OrderVerification' component={OrderVerificationScreen} />
                    <MainStack.Screen name='Address' component={AddressScreen} />
                    <MainStack.Screen name='AddressForm' component={AddressFormScreen} />
                    <MainStack.Screen name='SuccessfulOrder' component={SuccessfulOrderScreen} />

                    <MainStack.Screen name='OrderList' component={OrderListScreen} />
                    <MainStack.Screen name='OrderDetail' component={OrderDetailScreen} />
                    <MainStack.Screen name='OrderCancellation' component={OrderCancellationScreen} />

                </MainStack.Group>
            )}


        </MainStack.Navigator>
    )
}

export default MainStackNavigation;