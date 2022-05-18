import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home';
import { MessageScreen } from '../screens/message';
import { CartScreen } from '../screens/cart';
import { ProfileScreen } from '../screens/profile';
import { COLOR, FONT_SIZE } from '../res';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function MainTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={(route) => ({
                tabBarActiveTintColor: COLOR.SECOND_COLOR,

            })}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='home' size={20} color={color} />,
                    headerTitle: 'Gita',
                    headerTitleStyle: {
                        fontSize: FONT_SIZE.NORMAL_TITLE,
                        color: COLOR.MAIN_COLOR,
                        fontFamily: "Montserrat-Bold",
                    },
                    headerStyle: {
                        backgroundColor: COLOR.BACKGROUND_WHITE,
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerLeft: () => {
                        return (
                            <Icon name='qrcode' size={20} color={COLOR.SECOND_COLOR} />
                        )
                    },
                    headerRight: () => {
                        return (
                            <Icon name='user' size={20} color={COLOR.SECOND_COLOR} />
                        )
                    },
                    headerRightContainerStyle: {
                        paddingRight: 14,
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 14,
                    },
                }}
            />
            <Tab.Screen
                name='Message'
                component={MessageScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='commenting' size={20} color={color} />
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='shopping-cart' size={20} color={color} />
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='user' size={20} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigation;