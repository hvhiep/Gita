import React from "react";
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen, IntroScreen, LoginScreen, RegisterScreen } from "../screens/auth";
import { SearchScreen, ProductDetailScreen } from "../screens/home";
import { OrderVerificationScreen, AddressScreen, AddressFormScreen, SuccessfulOrderScreen } from "../screens/cart";
import { OrderListScreen, OrderListCustomerScreen, OrderListSalesmanScreen, OrderCancellationScreen, TotalProductScreen, AddProductScreen, TurnoverScreen, OrderDetailCustomerScreen, OrderDetailSalesmanScreen } from '../screens/profile';
import MainTabNavigation from './MainTabNavigation';
import FilterDrawerNavigation from "./FilterDrawerNavigation";

//firebase
import { auth, database } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

//redux
import { useDispatch } from 'react-redux';
import { storeUser } from '../features/users/userSlice';


const MainStack = createNativeStackNavigator();

function MainStackNavigation() {
    const db = database;
    const dispatch = useDispatch();

    const [isSignIn, setIsSignIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // kiểm tra xem user đã đăng nhập chưa để thay đổi state
    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
            // nếu user vừa đăng nhập vào
            if (user) {
                const userId = user.uid;
                //lấy user bằng userId
                getDoc(doc(db, `user/${userId}`))
                    .then((doc) => {
                        if(doc.exists()){
                            const data = doc.data();
                            //phải gán userId để dùng sau này
                            const userData = {id: userId, ...data};
                            //lưu user lên redux để dùng 
                            dispatch(storeUser(userData));
                        }
                        else 
                            console.log('[StackNav] lỗi khi lấy thông tin user!')
                    })
                    .catch((error) => console.log('[StackNav] lỗi khi lấy thông tin user: ', error))

                // onValue(ref(db, 'user/' + user.uid), snapshot => {
                //     const data = snapshot.val();
                //     console.log('[navigation] user data: ', data);
                //     //lưu user data mới lấy lên redux
                //     dispatch(storeUser(data))
                // })

                //đăng nhập vào Home
                setIsSignIn(true);
                setIsLoading(false);
            } else {
                //quay lại màn hình splash
                setIsSignIn(false);
                setIsLoading(false);
            }
        });
        // phải clear khi unmount component nếu không sẽ bị memory leak
        return () => unregisterAuthObserver();
    }, [])

    //1. loading chờ kiểm tra user có đăng nhập chưa
    if (isLoading) {
        return (<SplashScreen />)
    }
    return (
        <MainStack.Navigator>
            {isSignIn === false ? (
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
                    <MainStack.Screen name='OrderListCustomer' component={OrderListCustomerScreen} />
                    <MainStack.Screen name='OrderListSalesman' component={OrderListSalesmanScreen} />
                    <MainStack.Screen name='OrderDetailCustomer' component={OrderDetailCustomerScreen} />
                    <MainStack.Screen name='OrderDetailSalesman' component={OrderDetailSalesmanScreen} />
                    <MainStack.Screen name='OrderCancellation' component={OrderCancellationScreen} />
                    <MainStack.Screen name='TotalProduct' component={TotalProductScreen} />
                    <MainStack.Screen name='AddProduct' component={AddProductScreen} />
                    <MainStack.Screen name='Turnover' component={TurnoverScreen} />

                </MainStack.Group>
            )}
        </MainStack.Navigator>
    )
}

export default MainStackNavigation;