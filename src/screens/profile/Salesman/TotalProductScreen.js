import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../../res';
import { BackBtn } from '../../../components';

//dummy data
import productData from '../../home/productData';

const TotalProductScreen = ({ navigation, route }) => {

    //lọc các product từ productData mà thuộc shopId hiện tại
    const shopId = route?.params?.shopId;
    const data = productData.filter((item) => item.shopId === shopId);

    const [filterData, setFilterData] = useState(data);
    const [initialData, setInitialData] = useState(data);
    const [search, setSearch] = useState('');

    const renderProductItem = ({item}) => {
        return (
            <TouchableOpacity key={item.id} style={styles.productContentWrapper}>
                {/* ảnh sp */}
                <View style={styles.imgWrapper}>
                    <Image style={styles.img} source={item.img[0]}></Image>
                </View>
                {/* info sp */}
                <View style={styles.productInfoWrapper}>
                    <Text style={styles.productName}>{item.name}</Text>
                    {/* số lượng  */}
                    <Text style={[styles.text, { marginBottom: 5 }]}>Tồn kho: {item.quantity}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.text}>Giá bán: </Text>
                        <Text style={styles.discountPrice}>{numberWithCommas(item.salePrice)} đ</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    // hàm xử lý filter khi search
    const handleSearchFilter = (text) => {
        //nếu có chữ trong TextInput
        if (text) {
            //Dùng hàm filter: trả về một mảng mới với các phần tử đạt điều kiện yêu cầu(tìm theo tên product)
            const newData = initialData.filter((item) => {
                const newItem = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const searchText = text.toUpperCase();
                return newItem.indexOf(searchText) > -1;
            })
            setFilterData(newData);
            setSearch(text);
        }
        else {
            setFilterData(initialData);
            setSearch(text);
        }
    }

    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Quản lý sản phẩm</Text>
                </View>
                {/* 2. SEARCH BAR */}
                <View style={styles.searchWrapper}>
                    <Icon name='search' size={20} color={COLOR.MAIN_COLOR} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Tìm kiếm sản phẩm'
                        value={search}
                    onChangeText={(text) => handleSearchFilter(text)}
                    />
                </View>
            </View>
            {/* 3. PRODUCT LIST */}
            <FlatList 
                style={styles.productList}
                data={filterData}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
            />
            {/* 4. ADD BTN */}
            <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate('AddProduct')}>
                <Icon name='plus' size={30} color={COLOR.WHITE} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        backgroundColor: COLOR.BACKGROUND_WHITE,
    },
    header: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        marginLeft: 10,
    },
    searchWrapper: {
        flexDirection: 'row',
        backgroundColor: COLOR.BACKGROUND_GREY,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        borderRadius: 10,
        height: 40,

    },
    searchInput: {
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },

    //product flatlist
    productList: {
        marginTop: 10,
    },
    
    // product item
    productContentWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginBottom: 10,
        backgroundColor: COLOR.BACKGROUND_WHITE,
        padding: 10,
        borderRadius: 10,
    },
    imgWrapper: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain'
    },
    productInfoWrapper: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        flexWrap: 'wrap',
        maxWidth: '90%',
        marginBottom: 5,
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
    },
    
    btnAdd: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: COLOR.SECOND_COLOR,
        zIndex: 1000
    },
});

export default TotalProductScreen;