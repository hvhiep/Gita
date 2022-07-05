import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from 'react-native';

//firebase
import { getFirestore, collection, doc, getDoc, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
//message
import { showMessage } from 'react-native-flash-message';
import products from './products';

const db = getFirestore();

function MessageScreen() {


    //2. lấy thông tin của shop, để chuẩn bị gán cho product
    const addProduct = async (shopId) => {
        //3.product mới sau khi người dùng nhập vào các trường (bây giờ lấy tạm bên products.js)

        //4.gọi api addDoc
        //shop0: 0 1 2 3 4,  shop1: 5, 6, 7, 8 done
        try {
            const result = await addDoc(collection(db, 'product'), products[8])
            console.log('message: ', result.path)

        //5.trả về message -> hiển thị message lên màn hình
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
    };

    const getUser = async () => {
        try {
            console.log('dung ham cua firestore luon khoi dung Date: ', Timestamp.now());
            console.log('-------------------------');
            const q = query(collection(db, '/user/OlOnxRH71chi07tvZQKdmQOAbNi2/searchHistory'), orderBy('timestamp', 'asc'))
            const result = await getDocs(q);
            result.forEach((doc) => {
                
                console.log('history: ', doc.id, doc.data())
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tính năng đang được phát triển! Quay lại sau nhé 😊</Text>
        {/* //shop0: 0 1 2 3 4,  shop1: 5, 6, 7, 8 */}
            {/*      0                             */}
            <Button title='get user' onPress={() => {
                // const shopId0 = 'suUQzTNtQG1iG0B7P4fl';
                // const shopId1 = 'gNPWDkhyC6i3nK2rISqe';
                // addProduct(shopId1);
                getUser();
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