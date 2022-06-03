import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import { PrimaryBtn } from '../../components';
//dump:
import orderData from './orderData';

function SuccessfulOrderScreen({ navigation, route }) {

    //dump data
    const listOrderSelected = route?.params?.listOrderSelected.map((item) => item.id);
    const selectedOrderData = orderData.filter((item) => {
        return listOrderSelected.includes(item.id);
    })
    const address = {
        id: 1,
        userId: 1,
        fullName: 'Hoàng Văn Hiệp',
        phoneNumber: '0356562378',
        address: '999A, đường Tô Vĩnh Diện',
        ward: 'Linh Trung',
        district: 'Thủ Đức',
        city: 'Tp Hồ Chí Minh'
    };

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
    
    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name='close' size={20} color={COLOR.MAIN_COLOR} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Đơn hàng đã đặt</Text>
            </View>
            {/* 2.SCROLL CONTENT */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.messageWrapper}>
                    <Icon name='check-circle' size={40} color={COLOR.WHITE} />
                    <Text style={styles.messageText}>Đặt hàng thành công !</Text>
                </View>
                <Text style={styles.priceText}>Vui lòng chuẩn bị số tiền tương ứng vào ngày giao hàng!</Text>
                <Text style={styles.price}>{numberWithCommas(5240000)} đ</Text>
                <Text style={styles.sectionTitle}>Thông tin người nhận</Text>
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
                <Text style={styles.sectionTitle}>Đơn hàng</Text>
                {selectedOrderData.map((item) => {
                    return (
                        <View key={item.id} style={styles.order}>
                            <Text style={styles.orderId}>Mã đơn hàng: {item.id}</Text>
                            <Text style={styles.orderDeliveryDate}>Thời gian giao hàng dự kiến: {item.deliveryDate}</Text>
                            <View style={styles.orderContentWrapper}>
                                {/* ảnh sp */}
                                <View style={styles.imgWrapper}>
                                    <Image style={styles.img} source={item.product.img[0]}></Image>
                                </View>
                                {/* info sp */}
                                <View style={styles.orderInfoWrapper}>
                                    <Text style={styles.productName}>{item.product.name}</Text>
                                    <View style={styles.priceWrapper}>
                                        <Text style={styles.discountPrice}>{numberWithCommas(item.product.discountPrice)} đ</Text>
                                        {/* số lượng  */}
                                        <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            {/* 3.HOME BUTTON */}
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
        backgroundColor: COLOR.BACKGROUND_GREY,
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
        width: '90%',
        height: '90%',
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