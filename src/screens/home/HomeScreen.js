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
import { Product } from '../../components';

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
    const bannerRef = useRef();
    const [bannerCurrentIndex, setBannerCurrentIndex] = useState(0);
    const bannerScrollX = useRef(new Animated.Value(0));

    // gọi api
    useEffect(() => {
        const allProductUnsubscribe = getAllProduct();
        // unsubscribe
        return () => {allProductUnsubscribe}
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
            productArr.push({id: doc.id, ...productData})
        }) 
        //cuối cùng set state để hiển thị
        setProducts(productArr);
        setProductListLoading(false);
    }

    // logic tự động scroll banner
    useEffect(() => {
        const interval = setInterval(() => {
            setBannerCurrentIndex(prev => {
                if (prev < bannerData.length - 1)
                    return prev + 1;
                return 0;
            })
        }, 3000)

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        bannerRef.current.scrollToOffset({ offset: bannerCurrentIndex * (WIDTH - DIMENSION.MARGIN_HORIZONTAL * 2), animated: true })
    }, [bannerCurrentIndex])


    const renderBanner = ({ item }) => {
        return (
            <TouchableOpacity key={item} style={styles.bannerItem}>
                <Image style={styles.bannerImg} source={{ uri: item }} resizeMode='contain' />
            </TouchableOpacity>
        )
    }

    const renderBigDiscountProducts = () => {
        return (
            <View style={styles.categoryWrapper}>
                {products.map((product, index) => {
                    // box product nào có index là số chẵn thì marginRight để responsive
                    let even = index % 2 === 0 ? true : false;
                    return (
                        <Product
                            isEven={even}
                            key={product.id}
                            product={product}
                            // tạm thời để id = 1 tránh bị lỗi
                            onPress={() => navigation.navigate('ProductDetail', { productId: 1 })}
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
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.searchWrapper}>
                <Text style={styles.searchText}>Tìm kiếm</Text>
                <Icon name='search' size={20} color={COLOR.UNSELECTED}></Icon>
            </TouchableOpacity>
            <ScrollView style={styles.scrollview}>

                {/* 1. Banner quảng cáo */}
                {/* Tạm thời cứ hiển thị ảnh đã, vì nhấn vào mỗi banner sẽ navigate đến trang sự kiện(chưa làm) */}
                <View>
                    <FlatList
                        ref={bannerRef}
                        style={styles.list}
                        data={bannerData}
                        renderItem={renderBanner}
                        keyExtractor={item => item}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        bounces={false}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: bannerScrollX.current } } }], { useNativeDriver: false })}
                        scrollEventThrottle={32}
                    />
                    {/* indicator cho banner */}
                    <View style={styles.indicatorWrapper}>
                        {bannerData.map((item, index) => {

                            const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];
                            const dotWidth = bannerScrollX.current.interpolate({
                                inputRange,
                                outputRange: [6, 15, 6],
                                extrapolate: 'clamp'
                            });
                            const opacity = bannerScrollX.current.interpolate({
                                inputRange,
                                outputRange: [0.5, 1, 0.5],
                                extrapolate: 'clamp'
                            })
                            return (
                                <Animated.View key={item} style={[styles.indicator, { width: dotWidth, opacity }]} />
                            )
                        })}
                    </View>
                </View>

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

    // banner style 
    list: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    bannerItem: {
        height: 200,
        width: WIDTH - DIMENSION.MARGIN_HORIZONTAL * 2,
        backgroundColor: COLOR.SECOND_COLOR,
        borderRadius: 10,
    },
    bannerImg: {
        height: 200,
        width: WIDTH - DIMENSION.MARGIN_HORIZONTAL * 2,
        borderRadius: 10,
    },
    indicatorWrapper: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        borderRadius: 50,
        width: 6,
        height: 6,
        backgroundColor: COLOR.MAIN_COLOR,
        marginRight: 10,
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