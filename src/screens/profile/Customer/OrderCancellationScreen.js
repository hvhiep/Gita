import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../../res';
import { BackBtn, PrimaryBtn } from '../../../components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import orderData from '../../cart/orderData';
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';

const cancelledReason = [
    'Thời gian giao hàng quá lâu', //code 0
    'Thay đổi ý', //code 1
    'Trùng đơn hàng', //code 2
    'Thay đổi địa chỉ giao hàng' //code 3
];

const OrderCancellationScreen = ({ navigation, route }) => {
    const db = getFirestore();
    const orderId = route?.params?.orderId;
    const data = orderData.find((item) => item.id === orderId);

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [toggleCheckBox, setToggleCheckBox] = useState(-1);

    //LẤY ORDER
    useEffect(() => {
        if (orderId !== undefined)
            getOrderById();
    }, []);
    const getOrderById = async () => {
        try {
            setLoading(true);
            const snapshot = await getDoc(doc(db, `order/${orderId}`));
            if (!snapshot.exists())
                throw 'Không có order!';
            const data = snapshot.data();
            data.id = snapshot.id;
            data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
            setOrder(data);
            setLoading(false);
        } catch (error) {
            console.log('[OrderCancellation]: ', error);
        }
    };

    const handleCancelOrder = async () => {
        if (order !== null) {
            //update trường orderCancellation (code: 0->4 là các lý do)
            //update status == 4
            await updateDoc(doc(db, `order/${order.id}`), {
                orderCancellation: toggleCheckBox,
                status: 4
            });
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Yêu cầu hủy đơn hàng</Text>
            </View>
            {
                loading ?
                    <View>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <>
                        <Text style={styles.titleText}>Mã đơn hàng: {order.id}</Text>
                        <View style={styles.orderContentWrapper}>
                            {/* ảnh sp */}
                            <View style={styles.imgWrapper}>
                                <Image style={styles.img} source={{ uri: order.product.img[0] }}></Image>
                            </View>
                            {/* info sp */}
                            <View style={styles.orderInfoWrapper}>
                                <Text style={styles.productName}>{order.product.name}</Text>
                                {/* số lượng  */}
                                <Text style={[styles.text, { marginBottom: 5 }]}>Số lượng: {order.quantity}</Text>
                                <View style={styles.priceWrapper}>
                                    <Text style={styles.text}>Tổng cộng: </Text>
                                    <Text style={styles.discountPrice}>{numberWithCommas(order.product.discountPrice * order.quantity)} đ</Text>
                                </View>
                            </View>
                        </View>
                    </>
            }
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
                            onPress={() => setToggleCheckBox(index)}
                        />
                        <Text style={styles.reasonText}>{item}</Text>
                    </View>
                )
            })}
            <PrimaryBtn style={styles.btn} title='Gửi yêu cầu' type='long' onPress={handleCancelOrder} />
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