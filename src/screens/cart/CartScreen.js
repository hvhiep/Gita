import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Order } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
import CheckBox from '@react-native-community/checkbox';

// dump import
import orderData from './orderData';

function CartScreen({ navigation }) {
 
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [orderCheckBoxState, setOrderCheckBoxState] = useState(false);
    const [orderSelected, setOrderSelected] = useState([]);

    useEffect(() => {
        if (toggleCheckBox) {
            setOrderCheckBoxState(true);
            setOrderSelected(orderData.map((item) => item.id ))
        } else {
            setOrderCheckBoxState(false)
            setOrderSelected([])

        }
    }, [toggleCheckBox])

    const handleCheckBoxTouch = (checkBoxValue, orderId) => {
    
        // logic cho việc chọn hay bỏ chọn một order
        checkBoxValue ? setOrderSelected(prev => [...prev, orderId]) : setOrderSelected(prev => {
            return prev.filter((id) => {
                return id !== orderId;
            })
        })
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
                            isChecked={orderCheckBoxState}
                            onCheckBoxTouch={handleCheckBoxTouch}
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
                    <Text style={styles.totalPrice}>14.900.000 đ</Text>
                </View>
                <TouchableOpacity
                    style={styles.orderBtn}
                    onPress={() => navigation.navigate('OrderVerification')}
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
        borderTopColor: COLOR.EXTRA_LIGHT_GREY,
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