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
import { Address } from '../../components';
//dump: 
import addressData from './addressData';

function AddressScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Chọn địa chỉ giao hàng</Text>
            </View>
            {/* 2.CONTENT */}
            {/* address */}
            <TouchableOpacity
                style={styles.addressBtn}
                onPress={() => navigation.navigate('AddressForm')}
            >
                <Icon name='plus' size={20} color={COLOR.SECOND_COLOR} />
                <Text style={styles.addressBtnText}>Thêm địa chỉ mới</Text>
            </TouchableOpacity>
            {/* orders list */}
            <FlatList
                style={styles.listOrder}
                data={addressData}
                renderItem={({ item }) => <Address key={item.id} navigation={navigation} address={item} />}
                keyExtractor={(item) => item.id}
            />
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
    addressBtn: {
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
    addressBtnText: {
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
})

export default AddressScreen;