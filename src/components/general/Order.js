import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { COLOR, FONT_SIZE, numberWithCommas } from '../../res';

function Order({ item }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);

    //dump: Tính giá đã giảm
    item.product.discountPrice = Math.round(item.product.salePrice * (1 - 0.21));
    return (
        <View style={styles.container}>
            {/* 1. selector */}
            <View style={styles.selectorWrapper}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    tintColors={{
                        true: COLOR.SECOND_COLOR,
                        false: COLOR.GREY
                    }}
                ></CheckBox>
            </View>
            {/* 2. content */}
            <View style={styles.contentWrapper}>
                {/* shop btn */}
                <TouchableOpacity style={styles.shopBtn}>
                    <View style={styles.shopBtnWrapper}>
                        <Icon name='home' size={20} color={COLOR.MAIN_COLOR} />
                        <Text style={styles.shopName}>{item.shop.name}</Text>
                        <Icon name='angle-right' size={20} color={COLOR.MAIN_COLOR} />
                    </View>
                </TouchableOpacity>
                {/* order content */}
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
                            {/* thêm bớt số lượng  */}
                            <View style={styles.sheetQuantity}>
                                <TouchableOpacity
                                    style={styles.quantityBtn}
                                    onPress={() => setOrderQuantity(prev => {
                                        if (prev <= 1)
                                            return prev
                                        return prev - 1
                                    })}
                                >
                                    <Icon2 name='minus' size={20} color={COLOR.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{orderQuantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityBtn}
                                    onPress={() => setOrderQuantity(prev => prev + 1)}
                                >
                                    <Icon2 name='plus' size={20} color={COLOR.BLACK} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* 3. remove order */}
            <TouchableOpacity style={styles.removeWrapper}>
                <Icon name='trash' size={25} color={COLOR.GREY} />
            </TouchableOpacity>
            <View>

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
        // elevation: 1,
        flexDirection: 'row'
    },
    selectorWrapper: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    contentWrapper: {
        flex: 1,
    },
    shopBtn: {
        marginBottom: 10,
    },
    shopBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
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
    sheetQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    quantityBtn: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityText: {
        marginHorizontal: 10,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR
    },
    removeWrapper: {
        justifyContent: 'center',
        paddingHorizontal: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 0.4,
    },
});

export default Order;