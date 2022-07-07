import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { BackBtn, VerifiedOrder } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const OrderVerificationScreen = ({ navigation, route }) => {
    const user = useSelector(state => state.user);
    const db = getFirestore();
    //mảng id của các order được chọn
    const selectedOrderIds = route?.params?.selectedOrderIds;
    // lấy addressId trả về từ AddressScreen
    const addressId = route?.params?.addressId;
    const [orders, setOrders] = useState([]); // format: [..., {id: '', data: {...}}]
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState(null);
    //lấy order
    useEffect(() => {
        getOrderById();
    }, []);
    const getOrderById = async () => {
        try {
            const promises = selectedOrderIds.map(async (id) => {
                const result = await getDoc(doc(db, `order/${id}`))
                if (result.exists()) {
                    const data = result.data();
                    data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
                    return { id: result.id, ...data };
                }
                else
                    return null;
            })
            const ordersArr = await Promise.all(promises);
            setOrders(ordersArr);
        } catch (error) {
            console.log('[OrderVerification] lỗi lấy order: ', error);
        }
    }

    //lấy thông tin address người dùng đã chọn
    useEffect(() => {
        if (addressId !== undefined)
            getAddressById();
    }, [addressId])
    const getAddressById = async () => {
        try {
            const snapshot = await getDoc(doc(db, `user/${user.id}/address/${addressId}`));
            if (snapshot.exists()) {
                const data = snapshot.data();
                data.id = snapshot.id;
                setAddress(data);
            }
            else console.log('[OrderVerification] không có address!')
        } catch (error) {
            console.log('[OrderVerification]: ', error);
        }
    }

    // tính tổng giá tiền
    useEffect(() => {
        if (orders.length > 0) {
            setTotalPrice(() => {
                const ordersTemp = orders;
                const total = ordersTemp.reduce((total, item) => {
                    return total + (item.product.discountPrice * item.quantity);
                }, 0)
                return numberWithCommas(total);
            })
        }
    }, [orders])

    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Kiểm tra</Text>
            </View>
            {/* 2.CONTENT */}
            {/* address */}
            {
                address === null ?
                    //chưa chọn address
                    <TouchableOpacity
                        style={styles.locationBtn}
                        onPress={() => navigation.navigate('Address')}
                    >
                        <Icon name='plus' size={20} color={COLOR.SECOND_COLOR} />
                        <Text style={styles.locationBtnText}>Thêm địa chỉ nhận hàng</Text>
                    </TouchableOpacity>
                    :
                    //đã chọn nên hiển thị lên address
                    <TouchableOpacity
                        style={styles.addressWrapper}
                        onPress={() => navigation.navigate('Address')}
                    >
                        <View style={styles.addressContentWrapper}>
                            <Icon2 name='map-marked-alt' size={20} color={COLOR.MAIN_COLOR} />
                            <View style={styles.addressInfoWrapper}>
                                <View style={styles.addressNameWrapper}>
                                    <Text style={styles.addressFullName}>{address?.fullName}</Text>
                                    <Text style={styles.addressPhoneNumber}>{address?.phoneNumber}</Text>
                                </View>
                                <Text style={styles.addressInfoAddress}>{address?.address}, {address?.ward}, {address?.district}, {address?.city}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
            }
            {/* orders list */}
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.listOrder}
                    data={orders}
                    renderItem={({ item }) => <VerifiedOrder key={item.id} item={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
            {/* 3.FOOTER */}
            <View style={styles.footer}>
                <View style={styles.totalPriceWrapper}>
                    <Text style={styles.totalPriceText}>Tổng cộng:</Text>
                    <Text style={styles.totalPrice}>{totalPrice}đ</Text>
                </View>
                <TouchableOpacity
                    style={styles.orderBtn}
                    onPress={async () => {
                        // chưa chọn địa chỉ thì k cho qua screen mới
                        if (addressId === undefined)
                            showMessage({
                                message: 'Vui lòng chọn địa chỉ giao hàng!',
                                type: "warning",
                                icon: 'auto',
                                duration: 1000,
                            })
                        else{
                            const temp = orders;
                            const idArr = temp.map((item) => item.id);
                            navigation.navigate('SuccessfulOrder', {
                                selectedOrderIds: idArr,
                                addressId: addressId,
                                totalPrice: totalPrice,
                            })
                        }
                    }}
                >
                    <Text style={styles.orderBtnText}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    locationBtn: {
        marginVertical: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.SECOND_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    locationBtnText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },

    //address 
    addressWrapper: {
        borderWidth: 2,
        borderColor: COLOR.MAIN_COLOR,
        paddingVertical: 10,
        backgroundColor: COLOR.WHITE,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        paddingBottom: 20,
        height: 110,
        maxHeight: 300,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    addressContentWrapper: {
        flex: 1,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressInfoWrapper: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
    },
    addressNameWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    addressFullName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    addressPhoneNumber: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginLeft: 10,
    },
    addressInfoAddress: {
        marginTop: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },

    //selected orders
    listOrder: {
        flex: 1,
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    footer: {

        height: 60,
        backgroundColor: COLOR.WHITE,
        borderTopWidth: 0.2,
        borderTopColor: COLOR.EXTRA_LIGHT_GREY,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    totalPriceWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    totalPriceText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    totalPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
        marginLeft: 10,
    },
    orderBtn: {
        backgroundColor: COLOR.SECOND_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.WHITE
    },
});

export default OrderVerificationScreen;