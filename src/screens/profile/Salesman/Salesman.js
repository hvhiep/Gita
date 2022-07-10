import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../../res';
import { OrderDeliveryState, ChangeSettingBtn, GradientText } from '../../../components';

//firebase
import { auth } from '../../../../firebase';
import { signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
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

const Salesman = ({ navigation }) => {
    const db = getFirestore();
    const user = useSelector(state => state.user);

    const [loading, setLoading] = useState(true);
    const [shop, setShop] = useState({
        id: '',
        userId: '',
        name: '',
        avatarImg: 'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fwhite.png?alt=media&token=59f74a5f-d779-414d-8c86-2684366f0590',
        backgroundImg: 'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fwhite.png?alt=media&token=59f74a5f-d779-414d-8c86-2684366f0590',
        address: '',
        ward: '',
        district: '',
        city: '',
    });
    const [orderDeliveryState, setOrderDeliveryState] = useState(orderState);
    // lấy thông tin shop bằng userId
    useEffect(() => {
        getShopByUserId();
    }, []);
    const getShopByUserId = async () => {
        try {
            const arr = [];
            const snapshot = await getDocs(query(collection(db, 'shop'), where('userId', '==', user.id)));
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                arr.push({ ...data });
            })
            setShop(arr[0]);
        } catch (error) {
            console.log('[Salesman]: ', error);
        }
    };
    // từ thông tin shop -> shopId -> lấy thông tin các đơn hàng thuộc shop này 
    useEffect(() => {
        if (shop.id !== '') {
            setLoading(true);
            getAllOrderByShopId();
        }
    }, [shop]);
    const getAllOrderByShopId = async () => {
        try {
            let status0 = 0;
            let status1 = 0;
            let status2 = 0;
            let status3 = 0;
            let status4 = 0;
            const arr = [];
            const snapshot = await getDocs(query(collection(db, 'order'), where('product.shop.shopId', '==', shop.id)));
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
        } catch (error) {
            console.log('[Salesman]: ', error);
        }
    }
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

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 1. HEADER */}
            <ImageBackground source={{ uri: shop.backgroundImg }} style={styles.headerWrapper} resizeMode='cover'>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoLeft}>
                        <Image source={{ uri: shop.avatarImg }} style={styles.avatar} resizeMode='contain' />
                        <View style={styles.nameWrapper}>
                            <Text style={styles.shopName}>{shop.name}</Text>
                            <View style={styles.locationWrapper}>
                                <Icon2 name='location-sharp' size={15} color={COLOR.WHITE} />
                                <Text style={styles.locationText}>{shop.city}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.settingBtn}>
                        <Icon2 name='settings-sharp' size={20} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
                <View style={styles.desc1Wrapper}>
                    <Text style={styles.desc1Text}>100% Chính hãng</Text>
                    <Text style={styles.desc1Text}>Giá tốt vô đối</Text>
                    <Text style={styles.desc1Text}>Miễn phí giao hàng</Text>
                </View>
                <View style={styles.desc2Wrapper}>
                    <View style={styles.desc2ItemWrapper}>
                        <Text style={styles.desc2TextLeft}>20</Text>
                        <Text style={styles.desc2TextRight}>Sản phẩm</Text>
                    </View>
                    <View style={styles.desc2ItemWrapper}>
                        <Text style={styles.desc2TextLeft}>4.5</Text>
                        <Text style={styles.desc2TextRight}>Đánh giá</Text>
                    </View>
                    <View style={styles.desc2ItemWrapper}>
                        <Text style={styles.desc2TextLeft}>56%</Text>
                        <Text style={styles.desc2TextRight}>Phản hồi chat</Text>
                    </View>
                </View>
            </ImageBackground>

            {/* 2. CONTENT */}
            {/* statistic */}
            <View style={styles.statisticWrapper}>
                <View style={styles.statisticItemWrapper}>
                    <GradientText style={styles.statisticText}>Đơn bán năm</GradientText>
                    <GradientText style={styles.statisticText}>40</GradientText>
                </View>
                <View style={styles.statisticItemWrapper}>
                    <GradientText style={styles.statisticText}>Doanh thu năm</GradientText>
                    <GradientText style={styles.statisticText}>{numberWithCommas(123455000)} đ</GradientText>
                </View>
            </View>
            {
                loading ? null
                    :
                    <OrderDeliveryState
                        title='Quản lý đơn hàng'
                        orderState={orderDeliveryState}
                        navigation={navigation}
                    />
            }
            {/* BUTTON LIST */}
            <ChangeSettingBtn title='Quản lý sản phẩm' onPress={() => navigation.navigate('TotalProduct', { shopId: shop.id })} />
            <ChangeSettingBtn title='Báo cáo doanh số' onPress={() => navigation.navigate('Turnover', { shopId: shop.id })} />
            <ChangeSettingBtn title='Trung tâm trợ giúp' />
            <ChangeSettingBtn title='Đăng xuất' onPress={handleSignOut} />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        width: '100%'
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 50,
        borderWidth: 0.2,
        borderColor: COLOR.LIGHT_GREY,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameWrapper: {
        marginLeft: 20,
    },
    shopName: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 5,
    },
    locationText: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.SMALL_TEXT,

    },
    settingBtn: {
    },
    desc1Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    desc1Text: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.WHITE,
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    desc2Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    desc2ItemWrapper: {
        flexDirection: 'row'
    },
    desc2TextLeft: {
        color: COLOR.SECOND_COLOR,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
    desc2TextRight: {
        marginLeft: 5,
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
    statisticWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,

    },
    statisticItemWrapper: {
        height: 100,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: COLOR.EXTRA_LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statisticText: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TITLE,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Salesman;