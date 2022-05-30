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
import { COLOR, FONT_SIZE, numberWithCommas } from '../../res';

function Order({ navigation, item, isCheckedBySelectAll, onCheckBoxTouch, onProductQuantityChange }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1);

    // xử lý trong mỗi order khi người dùng bấm chọn tất cả
    useEffect(() => {
        if (isCheckedBySelectAll) {
            setToggleCheckBox(true)
            onCheckBoxTouch(true, {id: item.id, quantity: productQuantity})
        } else {
            setToggleCheckBox(false);
            onCheckBoxTouch(false, {id: item.id, quantity: productQuantity})

        }
    }, [isCheckedBySelectAll])

    // xử lý thêm bớt số lượng
    useEffect(() => {
        if (toggleCheckBox)
            onProductQuantityChange(item.id, productQuantity)
    }, [productQuantity])

    return (
        <View style={styles.container}>
            {/* 1. selector */}
            <View style={styles.selectorWrapper}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => {
                        setToggleCheckBox(newValue)
                        onCheckBoxTouch(newValue, {id: item.id, quantity: productQuantity})
                    }}
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
                    <TouchableOpacity
                        style={styles.imgWrapper}
                        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                    >
                        <Image style={styles.img} source={item.product.img[0]}></Image>
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
                                    onPress={() => {
                                        setProductQuantity(prev => {
                                            if (prev <= 1)
                                                return prev
                                            return prev - 1
                                        })
                                    }}
                                >
                                    <Icon2 name='minus' size={20} color={COLOR.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{productQuantity}</Text>
                                {/* thêm sản phẩm */}
                                <TouchableOpacity
                                    style={styles.quantityBtn}
                                    onPress={() => setProductQuantity(prev => prev + 1)}
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