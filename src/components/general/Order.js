import React, { useState, useEffect } from 'react';
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
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE, numberWithCommas } from '../../res';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
//?????????????????????/ ĐỔI LẠI CÁI CHECKBOX KHÁC, CHECKBOX NÀY NGU VÃI LỒN
function Order({ navigation, item, onCheckBoxTouch, onProductQuantityChange }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(item.selected);

    return (
        <View style={styles.container}>
            {/* 1. selector */}
            <View style={styles.selectorWrapper}>
                <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor={COLOR.SECOND_COLOR}
                    unfillColor={COLOR.WHITE}
                    iconStyle={{ borderColor: COLOR.LIGHT_GREY }}
                    isChecked={toggleCheckBox}
                    onPress={() => {
                        setToggleCheckBox(!toggleCheckBox)
                        onCheckBoxTouch(!toggleCheckBox, item.id)
                    }}
                />
            </View>
            {/* 2. content */}
            <View style={styles.contentWrapper}>
                {/* shop btn */}
                <TouchableOpacity style={styles.shopBtn}>
                    <View style={styles.shopBtnWrapper}>
                        <Icon3 name='store' size={18} color={COLOR.MAIN_COLOR} />
                        <Text style={styles.shopName}>{item.product.shop.name}</Text>
                        <Icon name='angle-right' size={20} color={COLOR.MAIN_COLOR} />
                    </View>
                </TouchableOpacity>
                {/* order content */}
                <View style={styles.orderContentWrapper}>
                    {/* ảnh sp */}
                    <TouchableOpacity
                        style={styles.imgWrapper}
                        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                    >
                        <Image style={styles.img} source={{ uri: item.product.img[0] }}></Image>
                    </TouchableOpacity>
                    {/* info sp */}
                    <View style={styles.orderInfoWrapper}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                        >
                            <Text style={styles.productName}>{item.product.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.discountPrice}>{numberWithCommas(item.product.discountPrice)} đ</Text>
                            {/* thêm bớt số lượng  */}
                            <View style={styles.sheetQuantity}>
                                {/* bớt sản phẩm */}
                                <TouchableOpacity
                                    style={styles.quantityBtn}
                                    disabled={item.quantity === 1 ? true : false}
                                    onPress={() => {
                                        //nếu sl sp > 1 thì mới cho bớt đi
                                        if (item.quantity > 1)
                                            onProductQuantityChange(item.id, item.quantity - 1)
                                    }}
                                >
                                    <Icon2 name='minus' size={20} color={item.quantity === 1 ? COLOR.LIGHT_GREY : COLOR.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                {/* thêm sản phẩm */}
                                <TouchableOpacity
                                    style={styles.quantityBtn}
                                    onPress={() => {
                                        onProductQuantityChange(item.id, item.quantity + 1)
                                    }}
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
    checkbox: {
        marginRight: -10,
        marginLeft: 5,
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
        borderRadius: 10,
        width: '100%',
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
        borderLeftWidth: 0.3,
        borderColor: COLOR.LIGHT_GREY
    },
});

export default Order;