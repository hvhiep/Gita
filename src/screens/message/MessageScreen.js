import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from 'react-native';

//firebase
import { getFirestore, collection, doc, getDoc, addDoc, getDocs, query, orderBy, Timestamp, setDocn, runTransaction, where } from "firebase/firestore";
//message
import { COLOR } from '../../res';
import { showMessage } from 'react-native-flash-message';
import products from './products';
import orderTestData from './orderTestData';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function MessageScreen() {
    const db = getFirestore();
    const [toggleCheckbox, setToggleCheckBox] = useState(false)

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
            console.log('-------------------------');
            const q = query(collection(db, '/user/OlOnxRH71chi07tvZQKdmQOAbNi2/searchHistory'), orderBy('timestamp', 'asc'))
            const result = await getDocs(q);
            result.forEach((doc) => {
                const data = doc.data();
                console.log('history: ', doc.id, data)

                const date = data.timestamp.toDate();

                console.log('timestamp: ', date)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const createOrder = async () => {
        await addDoc(collection(db, 'order'), orderTestData[2]);
    }


    const createAddress = () => {
        const userId = 'jb5n1dhF7geNMX8TVHnjCFwOvdo2';
        const addressData = {
            fullName: 'Hoàng Văn Hiệp',
            phoneNumber: '0356562378',
            address: '81B, Lê Văn Lương',
            ward: 'Sa Thầy',
            district: 'Sa Thầy',
            city: 'Kon Tum'
        }
        addDoc(collection(db, `user/${userId}/address`), addressData);
    }

    const updateMultipleDocUseTransaction = async () => {
        //có: productId -> update quantity
        const productId = 'p1';
        // lấy mảng id của các order
        let orderIdArr = [];
        const snapshot = await getDocs(query(collection(db, 'test'), where('product.id', '==', productId)));
        snapshot.forEach((doc) => {
            orderIdArr.push(doc.id);
        });
        try {
            const quantityTrans = await runTransaction(db, async (transaction) => {
                //read: lấy quantity của product muốn update
                const product = await transaction.get(doc(db, `productTest/${productId}`));
                if (!product.exists())
                    throw 'không có product!';
                //change data: 
                const newQuantity = product.data().quantity - 1;
                //write
                if (newQuantity >= 0) {
                    //write product
                    transaction.update(doc(db, `productTest/${productId}`), {quantity: newQuantity});
                    //write order
                    orderIdArr.forEach((id) => {
                        transaction.update(doc(db, `test/${id}`), {'product.quantity': newQuantity});
                    })
                } else {
                    throw 'không còn hàng!';
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/client%2FIMG_20220710_193004.jpg?alt=media&token=6e8d7a1d-b4dc-44c4-bd8d-e899f3260e58'}} style={{width: 200, height: 200, resizeMode:'contain', borderWidth: 1}} />
            <Text style={styles.text}>Tính năng đang được phát triển! Quay lại sau nhé 😊</Text>
            {/* //shop0: 0 1 2 3 4,  shop1: 5, 6, 7, 8 */}
            {/*      0                             */}
            <Button title='get user' onPress={() => {
                // const shopId0 = 'suUQzTNtQG1iG0B7P4fl';
                // const shopId1 = 'gNPWDkhyC6i3nK2rISqe';
                // addProduct(shopId1);
                getUser();
            }} />

            <Button title='create address' onPress={() => {
                createAddress();
            }} />
            <Button title='update quantity' onPress={() => {
                updateMultipleDocUseTransaction();
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