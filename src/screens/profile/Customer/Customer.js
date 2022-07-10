import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import { COLOR, FONT_SIZE, DIMENSION } from '../../../res';
import { OrderDeliveryState, ChangeSettingBtn } from '../../../components';
//firebase
import { auth } from '../../../../firebase';
import { signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
const orderState = [
    {
        id: 0,
        title: 'Chờ xác nhận',
        icon: 'clipboard-check',
        quantity: 0,
    },
    {
        id: 1,
        title: 'Chờ vận chuyển',
        icon: 'truck',
        quantity: 0,
    },
    {
        id: 2,
        title: 'Chờ giao hàng',
        icon: 'truck-loading',
        quantity: 0,
    },
    {
        id: 3,
        title: 'Đã giao hàng',
        icon: 'check-square',
        quantity: 0,
    },
    {
        id: 4,
        title: 'Đơn đã hủy',
        icon: 'window-close',
        quantity: 0,
    },
];

function Customer({ navigation }) {
    const db = getFirestore();
    const user = useSelector(state => state.user);

    const [loading, setLoading] = useState(true);
    const [orderDeliveryState, setOrderDeliveryState] = useState(orderState);

    //ĐĂNG XUẤT
    const handleSignOut = () => {
        if (auth) {
            signOut(auth)
                .then(() => {
                    //đăng xuất thành công, thông báo trước khi đăng xuất
                })
                .catch((error) => {
                    //có lỗi khi đăng xuất
                    console.log('[SIGN_OUT] error: ', error.message);
                })
        }
    }

    //THÔNG TIN ORDER
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'order'), where('userId', '==', user.id)), (snapshot) => {
            setLoading(true);
            let status0 = 0;
            let status1 = 0;
            let status2 = 0;
            let status3 = 0;
            let status4 = 0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.status === 0)
                    status0 += 1;
                else if (data.status === 1)
                    status1 += 1;
                else if (data.status === 2)
                    status2 += 1;
                else if (data.status === 3)
                    status3 += 1;
                else if (data.status === 4)
                    status4 += 1;
            });
            setOrderDeliveryState(prev => {
                const newData = prev.map((item) => {
                    if (item.id === 0)
                        item.quantity = status0;
                    else if (item.id === 1)
                        item.quantity = status1;
                    else if (item.id === 2)
                        item.quantity = status2;
                    else if (item.id === 3)
                        item.quantity = status3;
                    else if (item.id === 4)
                        item.quantity = status4;
                    return item;
                })
                return newData;
            });
            setLoading(false);
        })
        return () => unsub();
    }, [])

    return (
        <>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatar}>
                        <Image style={styles.avatarImg} source={{ uri: user.avatarImg }} />
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{auth.currentUser.email}</Text>
                        <TouchableOpacity style={styles.changeInfoBtn}>
                            <Text style={styles.changeInfoBtnText}>Hoàn tất thông tin tài khoản</Text>
                            <Icon3 name='chevron-right' size={20} color={COLOR.GREY} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon2 name='settings-sharp' size={20} color={COLOR.GREY} />
                </TouchableOpacity>
            </View>
            {/* 2.ORDER DELIVERY STATE */}
            {
                loading ? null
                    :
                    <OrderDeliveryState
                        title='Đơn hàng của tôi'
                        orderState={orderDeliveryState}
                        navigation={navigation}
                    />
            }
            {/* BUTTON LIST */}
            <ChangeSettingBtn title='Đổi mật khẩu' />
            <ChangeSettingBtn title='Liên hệ &amp; Góp ý' />
            <ChangeSettingBtn title='Trung tâm trợ giúp' />
            <ChangeSettingBtn title='Đăng xuất' onPress={handleSignOut} />
        </>
    )
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: 60,
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: COLOR.GREY,
    },
    avatarImg: {
        borderRadius: 50,
        width: '95%',
        height: '95%',

    },
    headerInfo: {
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
    },
    changeInfoBtn: {
        flexDirection: 'row',
    },
    changeInfoBtnText: {
        fontFamily: 'Montserrat-Medium',
        color: COLOR.GREY,
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        // paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
        marginBottom: 10,
    },

})

export default Customer;