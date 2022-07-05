import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
    ActivityIndicator
} from 'react-native';
import { COLOR, DIMENSION, WIDTH, FONT_SIZE } from '../../res/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Product, Banner } from '../../components';

// firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore';
//dummy data
// dummy banner: 
const bannerData = [
    'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fbanner1.jpg?alt=media&token=27760a05-95f2-4f79-b5a4-8e57ba0a4fba',
    'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fbanner2.jpg?alt=media&token=2e8f40a4-c717-4a12-b792-17b5a9dc45e6',
    'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fbanner3.jpg?alt=media&token=41cf3f2f-386b-4c5b-bd05-6796ead9f116',
    'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fbanner4.jpg?alt=media&token=b0ad3c8d-758c-458e-b36e-022cbc47a46e'
];

function HomeScreen({ navigation }) {
    const db = getFirestore();
    const [productListLoading, setProductListLoading] = useState(false);
    const [products, setProducts] = useState([]);
    
    // gọi api
    useEffect(() => {
        const allProductUnsubscribe = getAllProduct();
        // unsubscribe
        return () => { allProductUnsubscribe }
    }, []);

    // API
    const getAllProduct = async () => {
        // loading
        setProductListLoading(true);

        //lấy dữ liệu
        const productArr = [];
        const snapshot = await getDocs(collection(db, 'product'));
        snapshot.forEach(doc => {
            // cho id và data của một product vào 1 object rồi push dần vào mảng
            const productData = doc.data();
            productArr.push({ id: doc.id, ...productData })
        })
        //cuối cùng set state để hiển thị
        setProducts(productArr);
        setProductListLoading(false);
    }

    const renderBigDiscountProducts = () => {
        return (
            <View style={styles.categoryWrapper}>
                {products.map((product, index) => {
                    // box product nào có index là số chẵn thì marginRight để responsive
                    let isEven = index % 2 === 0 ? true : false;
                    return (
                        <Product
                            isEven={isEven}
                            key={product.id}
                            product={product}
                            onPress={() => {
                                navigation.navigate('ProductDetail', { productId: product.id })
                            }}
                        />
                    )
                })}
            </View>

        )
    }

    // MAIN RENDER
    return (
        <View style={styles.container}>
            {/* Thanh tìm kiếm */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Search')
                }}
                style={styles.searchWrapper}
            >
                <Text style={styles.searchText}>Tìm kiếm</Text>
                <Icon name='search' size={20} color={COLOR.UNSELECTED}></Icon>
            </TouchableOpacity>
            <ScrollView style={styles.scrollview}>

                {/* 1. Banner quảng cáo */}
                {/* Tạm thời cứ hiển thị ảnh đã, vì nhấn vào mỗi banner sẽ navigate đến trang sự kiện(chưa làm) */}
                <Banner  data={bannerData}/>

                {/* 3. Danh sách các sản phẩm */}
                {/* 3.1 Sale đặc biệt (có mức giảm giá cao) */}
                <Text style={styles.categoryTitle}>Sale đặc biệt</Text>
                {productListLoading ?
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    renderBigDiscountProducts()
                }
                {/* 3.1 Bán chạy (có số lượng bán cao) */}
                {/* <Text style={styles.categoryTitle}>Bán chạy</Text>
                {productListLoading ?
                    //loading 
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    renderBigDiscountProducts()
                } */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE,

    },
    // nút search bar 
    searchWrapper: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: COLOR.BACKGROUND_GREY,
        borderRadius: 10,

    },
    searchText: {
        opacity: 0.5,
        fontFamily: 'Montserrat-Medium',
        flex: 1,
    },
    scrollview: {
        flex: 1,
        marginTop: 10,
        backgroundColor: COLOR.BACKGROUND_GREY
    },
    loadingWrapper: {
        alignItems: 'center',
    },

    // flatlist các sản phẩm
    categoryTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
        color: COLOR.MAIN_COLOR,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
    },
    categoryWrapper: {
        marginTop: 4,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
        // justifyContent: 'space-evenly'

    },
})

export default HomeScreen;