import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from 'react-native';

//firebase
import { getFirestore, collection, doc, getDoc, addDoc, getDocs } from "firebase/firestore";
//message
import { showMessage } from 'react-native-flash-message';
import products from './products';

const db = getFirestore();

function MessageScreen() {

    //màn hình thêm sản phẩm
    //1. lấy danh sách discount bằng shopId để hiển thị lên dropbox
    const discounts = [
        {
            id: 'TghBgAqBdYpgXvPE2ojQ',
            name: "Giảm giá hè(shop0) 1",
            percent: 0.2
        },
        {
            id: 'Qh2L5LUi1rvTnPxgf8zq',
            name: "Giảm giá hè(shop0) 2",
            percent: 0.25
        },
        {
            id: 'SdhevWrbp16h8vBJO5Lh',
            name: "Giảm giá tháng 7(shop0)",
            percent: 0.5
        },
    ]


    //2. lấy thông tin của shop, để chuẩn bị gán cho product
    const addProduct = async (shopId) => {
        //3.product mới sau khi người dùng nhập vào các trường (bây giờ lấy tạm bên products.js)

        //4.gọi api addDoc
        //shop0: 0 1 2 3 4,  shop1: 5, 6, 7, 8
        try {
            const result = await addDoc(collection(db, 'product'), products[0])
            console.log('message: ', result)
            showMessage({
                message: 'thêm thành công',
                type: "success",
                icon: 'auto',
                duration: 2500,
            });
        } catch (error) {
            console.log('message: ', error)
            showMessage({
                message: 'thêm thất bại',
                type: "danger",
                icon: 'auto',
                duration: 2500,
            });
        }
        //5.trả về message -> hiển thị message lên màn hình

    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tính năng đang được phát triển! Quay lại sau nhé 😊</Text>
            {/* */}
            <Button title='thêm product' onPress={() => {
                const shopId0 = 'suUQzTNtQG1iG0B7P4fl';
                const shopId1 = 'gNPWDkhyC6i3nK2rISqe';
                addProduct(shopId0);
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        textAlign: 'center',

    }
});

export default MessageScreen;