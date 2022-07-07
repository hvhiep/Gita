import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import { PrimaryBtn } from '../../components';
import { getFirestore, getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';


function SuccessfulOrderScreen({ navigation, route }) {

    const user = useSelector(state => state.user);
    const db = getFirestore();
    const { selectedOrderIds, addressId, totalPrice } = route?.params;

    const [loading, setLoading] = useState(true);
    const [addressLoading, setAddressLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [address, setAddress] = useState(null);
    //lấy order
    useEffect(() => {
        if (selectedOrderIds !== undefined && addressId !== undefined && totalPrice !== undefined)
            handleUpdateOder();
    }, []);

    const handleUpdateOder = async () => {
        try {
            setLoading(true);
            //1. update lại thông tin đặt hàng tại trạng thái chờ xử lý:
            // status 0 -> 0 (chờ xử lý)
            // deliveryAddressId: gắn id vào
            // orderDate: lấy thời gian hiện tại now
            // deliveryDate: vẫn để null vì phải chờ xác nhận bên shop!
            // orderCancellation: vẫn để null, khi nào hủy đơn thì mới gắn vào!
            const newUpdateData = {
                selected: false,
                status: 0,
                deliveryAddressId: addressId,
                orderDate: Timestamp.now(),
            }

            const promises1 = selectedOrderIds.map(async (id) => {
                return await updateDoc(doc(db, `order/${id}`), newUpdateData)
            })
            await Promise.all(promises1);
            //2. lấy dữ liệu mới về để hiển thị lên
            const promises2 = selectedOrderIds.map(async (id) => {
                const result = await getDoc(doc(db, `order/${id}`))
                if (result.exists()) {
                    const data = result.data();
                    data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
                    data.id = result.id;
                    return { ...data };
                }
                else
                    return null;
            })
            const ordersArr = await Promise.all(promises2);
            setOrders(ordersArr);
            setLoading(false);
        } catch (error) {
            console.log('[SuccessfulOrder] lỗi lấy order: ', error);
        }
    }

    //lấy thông tin address người dùng đã chọn
    useEffect(() => {
        if (addressId !== undefined)
            getAddressById();
    }, [addressId])
    const getAddressById = async () => {
        try {
            setAddressLoading(true);
            const snapshot = await getDoc(doc(db, `user/${user.id}/address/${addressId}`));
            if (snapshot.exists()) {
                const data = snapshot.data();
                data.id = snapshot.id;
                setAddress(data);
                setAddressLoading(false);
            }
            else console.log('[SuccessfulOrder] không có address!')
        } catch (error) {
            console.log('[SuccessfulOrder]: ', error);
        }
    }

    //Ngăn không cho user back về màn hình trước (vì đã đặt hàng thành công rồi thì k back về đc nữa)
    useFocusEffect(
        useCallback(() => {
            // fn trả về true thì BackHandler sẽ không được gọi
            const onBackPress = () => true;
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const renderOrders = () => {
        return orders.map((item) => {
            const date = new Timestamp(item.orderDate.seconds, item.orderDate.nanoseconds);
            return (
                <View key={item.id} style={styles.order}>
                    <Text style={styles.orderId}>Mã đơn hàng: {item.id}</Text>
                    <Text style={styles.orderDeliveryDate}>Ngày đặt hàng: {date.toDate().toISOString()}</Text>
                    <View style={styles.orderContentWrapper}>
                        <View style={styles.imgWrapper}>
                            <Image style={styles.img} source={{ uri: item.product.img[0] }}></Image>
                        </View>
                        <View style={styles.orderInfoWrapper}>
                            <Text style={styles.productName}>{item.product.name}</Text>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.discountPrice}>{numberWithCommas(item.product.discountPrice)} đ</Text>
                                <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name='close' size={20} color={COLOR.MAIN_COLOR} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Đơn hàng đã đặt</Text>
            </View>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.messageWrapper}>
                    <Icon name='check-circle' size={40} color={COLOR.WHITE} />
                    <Text style={styles.messageText}>Đặt hàng thành công !</Text>
                </View>
                <Text style={styles.priceText}>Vui lòng chờ người bán hàng xác nhận đơn hàng của bạn!</Text>
                <Text style={styles.price}>{totalPrice} đ</Text>
                <Text style={styles.sectionTitle}>Thông tin người nhận</Text>
                {
                    addressLoading ?
                        <View>
                            <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                        </View>
                        :
                        <View style={styles.addressWrapper}>
                            <Icon2 name='map-marked-alt' size={20} color={COLOR.MAIN_COLOR} />
                            <View style={styles.addressInfoWrapper}>
                                <View style={styles.nameWrapper}>
                                    <Text style={styles.fullName}>{address.fullName}</Text>
                                    <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
                                </View>
                                <Text style={styles.infoAddress}>{address.address}, {address.ward}, {address.district}, {address.city}</Text>
                            </View>
                        </View>
                }
                <Text style={styles.sectionTitle}>Đơn hàng</Text>
                {
                    loading ?
                        <View>
                            <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                        </View>
                        :
                        renderOrders()
                }
            </ScrollView>
            <PrimaryBtn
                style={styles.homeBtn}
                title='Về trang chủ' type='long'
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE
    },
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        marginLeft: 10,
    },
    content: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE,
    },
    messageWrapper: {
        height: 130,
        backgroundColor: COLOR.GREEN,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.WHITE,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        marginTop: 10,
    },
    priceText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: '20%',
    },
    price: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        alignSelf: 'center',
        marginTop: 10,

    },

    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
        marginBottom: 5,
    },
    addressWrapper: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    },
    addressInfoWrapper: {
        flex: 1,
        marginLeft: 10,
    },
    nameWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    fullName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    phoneNumber: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginLeft: 10,
    },
    infoAddress: {
        marginTop: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    editBtn: {
        alignSelf: 'flex-start',
        padding: 5,
    },
    editBtnText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.SECOND_COLOR,
    },
    //Successful Order
    order: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        backgroundColor: COLOR.WHITE,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
    },
    orderId: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    orderDeliveryDate: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginBottom: 10,
    },
    orderContentWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    imgWrapper: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        borderRadius: 10,
        height: '100%',
        resizeMode: 'contain'
    },
    orderInfoWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        flexWrap: 'wrap',
        maxWidth: '90%',
    },
    priceWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',

    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
    },
    quantity: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    homeBtn: {
        marginBottom: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
})

export default SuccessfulOrderScreen;