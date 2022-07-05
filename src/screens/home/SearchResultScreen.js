import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { SearchBar } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION, HEIGHT } from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Product } from '../../components';
//firebase
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

//dummy data
import productData from './productData';

const headerFilter = [
    {
        id: 1,
        title: 'Bán chạy',
        icon: 'fire'
    },
    {
        id: 2,
        title: 'Mới nhất',
        icon: 'new-box'
    },
    {
        id: 3,
        title: 'Giá',
        icon: 'arrow-up'
    },
    {
        id: 4,
        title: 'Giá',
        icon: 'arrow-down'
    },
];

function SearchResultScreen({ navigation, route }) {
    // Lưu ý: firestore không thể search một chuỗi có nằm trong một chuỗi nào hay không
    //nên muốn search xịn thì phải dùng thêm phần mềm bên thứ 3 như: https://typesense.org/
    //còn giải pháp tạm thời là lấy hết tên các product trên db về, cho vào mảng và search thôi (vì số lượng sp không nhiều
    //nên có thể làm cách này!)
    const db = getFirestore();
    const searchResult = route?.params?.searchResult;

    const [loading, setLoading] = useState(true);
    // isProductsEmpty === true: không có kết quả phù hợp với từ search, === false thì ngược lại
    const [isProductsEmpty, setIsProductsEmpty] = useState(true);
    const [headerFilterSelected, setHeaderFilterSelected] = useState(1);
    const [filterProducts, setFilterProducts] = useState([]);

    //gọi api
    useEffect(() => {
        getAllProduct();
    }, [])
    //API
    const getAllProduct = async () => {
        try {
            //lấy dữ liệu
            const productArr = [];
            const snapshot = await getDocs(collection(db, 'product'));
            snapshot.forEach(doc => {
                // cho id và data của một product vào 1 object rồi push dần vào mảng
                const productData = doc.data();
                productArr.push({ id: doc.id, ...productData })
            })
            //lọc product theo tên
            if (searchResult !== undefined) {
                //Dùng hàm filter: trả về một mảng mới với các phần tử đạt điều kiện yêu cầu
                const newProductArr = productArr.filter((item) => {
                    const newItem = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                    const searchText = searchResult.toUpperCase();
                    return newItem.indexOf(searchText) > -1;
                })
                if (newProductArr.length > 0) {
                    setFilterProducts(newProductArr);
                    setIsProductsEmpty(false);
                }
                setLoading(false);

            }
            else {
                setLoading(false);
            }
        } catch (error) {
            console.log('[SearchResult] lỗi lấy product!');
        }
    }

    const renderFilterProducts = () => {
        // nếu không có sp nào thì hiển thị text thông báo
        if (isProductsEmpty) {
            return (
                <View style={styles.messageEmptyWrapper}>
                    <Text style={styles.messageEmptyText}>Rất tiếc! Không có loại đàn bạn đang tìm kiếm 😭</Text>
                </View>
            )
        }
        return (
            <View style={styles.categoryWrapper}>
                {filterProducts.map((product, index) => {
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

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle="dark-content"
            ></StatusBar>
            {/* Phần header */}
            <View style={styles.headerWrapper}>
                <View style={styles.headerSearchWrapper}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Icon name='arrow-left' size={20} color={COLOR.UNSELECTED}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.search} onPress={() => navigation.goBack()}><Text>{searchResult}</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={styles.filter}
                    >
                        <Icon name='filter' size={20} color={COLOR.UNSELECTED}></Icon>
                    </TouchableOpacity>
                </View>
                {/* header filter */}
                <View style={styles.headerFilterWrapper}>
                    {headerFilter.map((item) => {
                        let isSelected = item.id === headerFilterSelected;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.headerFilter,
                                    isSelected && { borderWidth: 1, borderColor: COLOR.SECOND_COLOR }
                                ]}
                                onPress={() => setHeaderFilterSelected(item.id)}

                            >
                                <MaterialIcons name={item.icon} size={20} color={isSelected ? COLOR.SECOND_COLOR : COLOR.UNSELECTED}></MaterialIcons>
                                <Text
                                    style={[
                                        styles.headerFilterText,
                                        isSelected && { fontFamily: 'Montserrat-Bold', color: COLOR.SECOND_COLOR }
                                    ]}
                                >{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            {/* Danh sách sản phẩm */}
            <ScrollView style={styles.scrollview}>
                {loading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    renderFilterProducts()
                }
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_GREY,
    },
    loading: {
        alignSelf: 'center'
    },
    headerWrapper: {
        backgroundColor: COLOR.BACKGROUND_WHITE,
        paddingBottom: 10,
    },
    headerSearchWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    backBtn: {
        padding: 5,
        borderRadius: 50
    },
    search: {
        backgroundColor: COLOR.BACKGROUND_GREY,
        height: 40,
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 10,
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        paddingHorizontal: 10,
        justifyContent: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT
    },
    filter: {
        padding: 5,
        borderRadius: 50
    },
    // price filter
    headerFilterWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    headerFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        borderRadius: 10,
        backgroundColor: COLOR.BACKGROUND_GREY,
        marginRight: 10,
    },
    headerFilterText: {
        marginHorizontal: 5,
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT
    },
    categoryWrapper: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL

    },

    messageEmptyWrapper: {
        width: '100%',
        height: HEIGHT * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    messageEmptyText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TITLE,
        color: COLOR.MAIN_COLOR,
        textAlign: 'center'
    },
    scrollview: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_GREY
    },
})

export default SearchResultScreen;