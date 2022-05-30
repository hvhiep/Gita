import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackBtn, VerifiedOrder } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';

// dump import:
import orderData from './orderData';

const OrderVerificationScreen = ({ navigation, route }) => {

    const listOrderSelected = route?.params?.listOrderSelected;

    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Kiểm tra</Text>
            </View>
            {/* 2.CONTENT */}
            {/* location */}
            <TouchableOpacity
                style={styles.locationBtn}
                onPress={() => navigation.navigate('Address')}    
            >
                <Icon name='plus' size={20} color={COLOR.SECOND_COLOR} />
                <Text style={styles.locationBtnText}>Thêm địa chỉ nhận hàng</Text>
            </TouchableOpacity>
            {/* orders list */}
            <FlatList
                style={styles.listOrder}
                data={listOrderSelected}
                renderItem={({ item }) => <VerifiedOrder key={item.id} order={item} />}
                keyExtractor={(item) => item.id}
            />
            {/* 3.FOOTER */}
            <View style={styles.footer}>
                <View style={styles.totalPriceWrapper}>
                    <Text style={styles.totalPriceText}>Tổng cộng:</Text>
                    <Text style={styles.totalPrice}>5.000.000 đ</Text>
                </View>
                <TouchableOpacity
                    style={styles.orderBtn}
                    
                >
                    <Text style={styles.orderBtnText}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>

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
    locationBtn: {
        marginVertical: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.SECOND_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    locationBtnText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
    listOrder: {
        flex: 1,
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
    totalPriceWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    totalPriceText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    totalPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
        marginLeft: 10,
    },
    orderBtn: {
        backgroundColor: COLOR.SECOND_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.WHITE
    },
});

export default OrderVerificationScreen;