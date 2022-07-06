import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../../res';
import { BackBtn, PrimaryBtn } from '../../../components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import orderData from '../../cart/orderData';

const OrderCancellationScreen = ({ navigation, route }) => {

    const cancelledReason = [
        'Thời gian giao hàng quá lâu',
        'Thay đổi ý',
        'Trùng đơn hàng',
        'Thay đổi địa chỉ giao hàng'
    ]

    const orderId = route?.params?.orderId;
    const data = orderData.find((item) => item.id === orderId);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Yêu cầu hủy đơn hàng</Text>
            </View>
            <Text style={styles.titleText}>Mã đơn hàng: {data.id}</Text>
            <View style={styles.orderContentWrapper}>
                {/* ảnh sp */}
                <View style={styles.imgWrapper}>
                    <Image style={styles.img} source={data.product.img[0]}></Image>
                </View>
                {/* info sp */}
                <View style={styles.orderInfoWrapper}>
                    <Text style={styles.productName}>{data.product.name}</Text>
                    {/* số lượng  */}
                    <Text style={[styles.text, { marginBottom: 5 }]}>Số lượng: {data.quantity}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.text}>Tổng cộng: </Text>
                        <Text style={styles.discountPrice}>{numberWithCommas(data.product.discountPrice)} đ</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.titleText}>Lý do hủy đơn</Text>
            {cancelledReason.map((item, index) => {
                return (
                    <View key={index} style={styles.reasonWrapper}>
                        <BouncyCheckbox
                            size={25}
                            fillColor={COLOR.SECOND_COLOR}
                            unfillColor={COLOR.WHITE}
                            disableBuiltInState
                            iconStyle={{ borderColor: COLOR.LIGHT_GREY }}
                            isChecked={index === toggleCheckBox ? true : false}
                            onPress={() => setToggleCheckBox(!toggleCheckBox)}
                        />
                        <Text style={styles.reasonText}>{item}</Text>
                    </View>
                )
            })}
            <PrimaryBtn style={styles.btn} title='Gửi yêu cầu' type='long' />
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE,
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
    titleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
    },
    orderContentWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
        marginBottom: 10,
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
        marginBottom: 5,
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginBottom: 10,

    },
    reasonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
    },
    reasonText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        left: DIMENSION.MARGIN_HORIZONTAL,
        right: DIMENSION.MARGIN_HORIZONTAL,
    }
});

export default OrderCancellationScreen;