import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Order } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import CheckBox from '@react-native-community/checkbox';

// dump import
import orderData from './orderData';

function CartScreen({ navigation }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [orderCheckBoxState, setOrderCheckBoxState] = useState(false);
    const [orderSelected, setOrderSelected] = useState([]);

    // logic cho nút chọn tất cả order ở footer
    useEffect(() => {
        if (toggleCheckBox) {
            setOrderCheckBoxState(true);
        } else {
            setOrderCheckBoxState(false)
        }
    }, [toggleCheckBox])

    // logic cho việc chọn hay bỏ chọn một order
    const handleCheckBoxTouch = (checkBoxValue, order) => {
        if (checkBoxValue) {
            setOrderSelected(prev => {
                // kiểm tra order định thêm vào có tồn tại trong mảng orderSelected hay không
                let isExisted = orderSelected.some((item) => {
                    return item.id === order.id;
                });
                if (isExisted)
                    return prev;
                else
                    return [...prev, { id: order.id, quantity: order.quantity }];
            })
        } else {
            setOrderSelected(prev => {
                return prev.filter((item) => {
                    return item.id !== order.id;
                })
            })
        }
    };

    // xử lý việc thêm bớt sl sp trong danh sách đã chọn
    const handleProductQuantityChange = (orderId, productQuantity) => {
        // cập nhật state
        setOrderSelected(prev => {
            return prev.map((item) => {
                if (item.id === orderId)
                    return { id: orderId, quantity: productQuantity };
                else
                    return item;
            })
        })
        // update data trên server
        
    }

    // tính tổng tiền phải trả
    const handleTotalPrice = () => {
        const total = orderSelected.reduce((total, item) => {
            const order = orderData.find((orderItem) => {
                return orderItem.id === item.id;
            })
            return total + Math.round(order.product.discountPrice * item.quantity);
        }, 0);

        return numberWithCommas(total);
    }

    return (
        <View style={styles.container}>
            {/* A. HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Giỏ hàng của tôi ({orderData.length})</Text>
            </View>
            {/* B. CONTENT - FLATLIST */}
            <FlatList
                style={styles.listOrder}
                data={orderData}
                renderItem={({ item }) => {
                    return (
                        <Order
                            key={item.id}
                            item={item}
                            navigation={navigation}
                            isCheckedBySelectAll={orderCheckBoxState}
                            onCheckBoxTouch={handleCheckBoxTouch}
                            onProductQuantityChange={handleProductQuantityChange}
                        />
                    )
                }}
                keyExtractor={(item) => item.id}
            />
            {/* C. FOOTER */}
            <View style={styles.footer}>
                <View style={styles.checkBoxWrapper}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => {
                            setToggleCheckBox(newValue);
                        }}
                        tintColors={{
                            true: COLOR.SECOND_COLOR,
                            false: COLOR.GREY
                        }}
                    />
                    <Text style={styles.checkBoxText}>Tất cả</Text>
                </View>
                <View style={styles.totalPriceWrapper}>
                    <Text style={styles.totalPriceText}>Tổng cộng</Text>
                    <Text style={styles.totalPrice}>{handleTotalPrice()} đ</Text>
                </View>
                <TouchableOpacity
                    style={styles.orderBtn}
                    onPress={() => navigation.navigate('OrderVerification', { listOrderSelected: orderSelected })}
                >
                    <Text style={styles.orderBtnText}>Thanh toán {orderSelected.length !== 0 ? `(${orderSelected.length})` : ''}</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_GREY
    },
    header: {
        backgroundColor: COLOR.WHITE,
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR.LIGHT_GREY
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        alignSelf: 'center',
    },
    listOrder: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    footer: {
        height: 60,
        backgroundColor: COLOR.WHITE,
        borderTopWidth: 0.2,
        borderTopColor: "#d9d9d9",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    checkBoxWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    totalPriceWrapper: {
        alignItems: 'center'
    },
    totalPriceText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    totalPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR
    },
    orderBtn: {
        backgroundColor: COLOR.SECOND_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    orderBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.WHITE
    },
});

export default CartScreen;