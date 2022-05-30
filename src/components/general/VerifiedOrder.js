import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE, numberWithCommas, DIMENSION } from '../../res';

//dump:
import orderData from '../../screens/cart/orderData';

function VerifiedOrder({ order }) {

    // dump:
    const data = orderData.find((item) => {
        return item.id === order.id;
    });


    return (
        <View style={styles.container}>
            {/* 2. content */}
            <View style={styles.contentWrapper}>
                {/* shop btn */}
                    <View style={styles.shop}>
                        <Icon2 name='store' size={18} color={COLOR.MAIN_COLOR} />
                        <Text style={styles.shopName}>{data.shop.name}</Text>
                    </View>
                {/* order content */}
                <View style={styles.orderContentWrapper}>
                    {/* ảnh sp */}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.img} source={data.product.img[0]}></Image>
                    </View>
                    {/* info sp */}
                    <View style={styles.orderInfoWrapper}>
                            <Text style={styles.productName}>{data.product.name}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.discountPrice}>{numberWithCommas(data.product.discountPrice)} đ</Text>
                            {/* số lượng  */}
                            <Text style={styles.quantity}>Số lượng: {order.quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: COLOR.WHITE,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    shop: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 10,
    },
    shopName: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginHorizontal: 5,
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
    }
});

export default VerifiedOrder;