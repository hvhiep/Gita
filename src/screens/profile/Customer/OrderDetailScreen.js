import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import { BackBtn, SecondaryBtn } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { orderStatusLookup } from '../../res';

//dummy:
import orderData from '../cart/orderData';

const OrderDetailScreen = ({ navigation, route }) => {

    // dummy:
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

    const orderId = route?.params?.orderId;
    const data = orderData.find((item) => item.id === orderId);
    const orderStatus = orderStatusLookup.find((item) => item.id === data.status);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thông tin đơn hàng</Text>
            </View>
            <View style={[styles.messageWrapper, orderStatus && { backgroundColor: orderStatus.color }]}>
                {(data.status === 1 || data.status === 2 || data.status === 3) && <Icon2 name={orderStatus.icon} size={30} color={COLOR.WHITE} />}
                {(data.status === 4 || data.status === 5) && <Icon name={orderStatus.icon} size={30} color={COLOR.WHITE} />}
                <Text style={styles.messageText}>{orderStatus.title2}</Text>
            </View>
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
            <View style={styles.orderContentWrapper}>
                {/* ảnh sp */}
                <View style={styles.imgWrapper}>
                    <Image style={styles.img} source={data.product.img[0]}></Image>
                </View>
                {/* info sp */}
                <View style={styles.orderInfoWrapper}>
                    <Text style={styles.productName}>{data.product.name}</Text>
                    {/* số lượng  */}
                    <Text style={[styles.text, {marginBottom: 5}]}>Số lượng: {data.quantity}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.text}>Tổng cộng: </Text>
                        <Text style={styles.discountPrice}>{numberWithCommas(data.product.discountPrice)} đ</Text>
                    </View>
                </View>
            </View>
            <View style={styles.orderTimeWrapper}>
                <View>
                    <Text style={styles.boldText}>Mã đơn hàng:</Text>
                    <Text style={styles.text}>Thời gian đặt hàng:</Text>
                    {/* *****************************************CẨN thận một số loại đơn hàng không được giao hoàn tất sẽ không có thời gian giao hàng */}
                    <Text style={styles.text}>Thời gian giao hàng:</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.boldText}>{data.id}</Text>
                    <Text style={styles.text}>{data.orderDate}</Text>
                    <Text style={styles.text}>{data.deliveryDate}</Text>
                </View>
            </View>
            <SecondaryBtn style={[styles.btn, {marginTop: 20}]} title='Liên hệ shop' type='small'/>
            <SecondaryBtn
                style={styles.btn}
                title='Hủy đơn hàng'
                type='small'
                onPress={() => navigation.navigate('OrderCancellation', {orderId: data.id})}    
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
    orderContentWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
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
    orderTimeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    boldText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        marginBottom: 10,
    },
    btn: {
        marginBottom: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
});

export default OrderDetailScreen;