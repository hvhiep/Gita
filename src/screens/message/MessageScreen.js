import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from 'react-native';

//firebase
import { db, storage } from '../../../firebase';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref, push, set } from 'firebase/database';
//message
import { showMessage } from 'react-native-flash-message';

import products from './products';

function MessageScreen() {

    const [img, setImg] = useState();

    const addProduct = () => {
        const productData = {
            name: 'hiepga',
            img: ['hehe', 'haha', 'cc']
        }
        const productRef = ref(db, 'product');
        const newProductRef = push(productRef);
        set(newProductRef, productData)
            .then(() => {
                showMessage({
                    message: 'thanh cong',
                    type: "success",
                    icon: 'auto',
                    duration: 2000,
                })
            })
            .catch((error) => {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: 'auto',
                    duration: 2000,
                });
            })
    }

    //{solved}CASE: có một mảng các imgRef, làm sao để chuyển từ ref -> url để hiển thị lên
    const [imgURL, setImgURL] = useState([]);
    const imgRefArr = [
        'server/sample1.jpg',
        'server/sample2.png'
    ];
    const getImg = async () => {
        let promises = imgRefArr.map(async (imgRef) => {
            // lấy url
            try {
                return await getDownloadURL(storageRef(storage, imgRef));
            } catch (error) {
                console.log(error)
            }
        })
        const results = await Promise.all(promises);
        setImgURL(results);
    }

    // thêm SHOP
    const sale0 = {
        userId: 'jb5n1dhF7geNMX8TVHnjCFwOvdo2',
        name: 'Shop 0',
        avatarImg: 'server/shopAvatar0.png',
        backgroundImg: 'server/shopBg0.jpg',
        city: 'Kon Tum',
        district: 'Sa Thầy',
        ward: 'Thị trấn Sa Thầy',
        address: '999 Quang Trung'
    };
    const discount01 = {
        shopId: '-N5orBlfPXJ49qk6nOh_',
        name: 'Giảm giá hè(shop0) 1',
        percent: 0.5
    };
    const discount02 = {
        shopId: '-N5orBlfPXJ49qk6nOh_',
        name: 'Giảm giá hè(shop0) 2',
        percent: 0.2
    };
    const discount03 = {
        shopId: '-N5orBlfPXJ49qk6nOh_',
        name: 'Giảm giá hè(shop0) 3',
        percent: 0.4
    };
    const sale1 = {
        userId: 'OlOnxRH71chi07tvZQKdmQOAbNi2',
        name: 'Shop 1',
        avatarImg: 'server/shopAvatar1.png',
        backgroundImg: 'server/shopBg1.jpg',
        city: 'Hồ Chí Minh',
        district: 'Thủ Đức',
        ward: 'Linh Trung',
        address: '81A Võ Văn Kiệt'
    };
    const discount11 = {
        shopId: '-N5orDJPkLtAxKuIjgOv',
        name: 'Giảm giá 1/7(shop1) 1',
        percent: 0.4
    };
    const discount12 = {
        shopId: '-N5orDJPkLtAxKuIjgOv',
        name: 'Giảm giá cho vui(shop1) 2',
        percent: 0.7
    };
    const createRecord = (path, data) => {

        const tableRef = ref(db, path);
        const newRecordRef = push(tableRef);
        set(newRecordRef, data)
            .then(() => {
                showMessage({
                    message: 'thanh cong',
                    type: "success",
                    icon: 'auto',
                    duration: 2000,
                })
            })
            .catch((error) => {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: 'auto',
                    duration: 2000,
                });
            })
    }

    // thêm DISCOUNT
    return (
        <View style={styles.container}>
            {imgURL.map((item, index) => {
                return (
                    <Image key={index} source={{ uri: item }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                )
            })}
            <Text style={styles.text}>Tính năng đang được phát triển! Quay lại sau nhé 😊</Text>
            <Button title='thêm product vào data' onPress={addProduct} />
            <Button title='thêm shop vào data' onPress={addProduct} />
            <Button title='lấy ảnh' onPress={getImg} />
            {/* 0 1 */}
            <Button title='tạo record' onPress={() => createRecord('product', products[1])} />
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