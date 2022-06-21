import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useState } from 'react';
import { COLOR, DIMENSION, WIDTH, FONT_SIZE } from '../../res/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Product } from '../../components';

//dummy data
import productData from "./productData";
function HomeScreen({ navigation }) {

    const bannerData = [
        {
            id: 1,
            imgUrl: 'url banner sau này 1'
        },
        {
            id: 2,
            imgUrl: 'url banner sau này 2'
        },
        {
            id: 3,
            imgUrl: 'url banner sau này 3'
        },
        {
            id: 4,
            imgUrl: 'url banner sau này 4'
        }
    ];
    const guitarTypeData = [
        {
            id: 1,
            title: 'Tất cả',
            color: COLOR.SECOND_COLOR,
        },
        {
            id: 2,
            title: 'Đàn Acoustic',
            color: COLOR.A,
        },
        {
            id: 3,
            title: 'Đàn Classic',
            color: COLOR.B,
        },
        {
            id: 4,
            title: 'Đàn Điện',
            color: COLOR.C,
        },
    ];
    

    const [guitarTypeSelected, setGuitarTypeSelected] = useState(1);

    const renderBanner = ({ item }) => {
        return (
            <TouchableOpacity style={styles.bannerItem}>
                <Text>{item.imgUrl}</Text>
            </TouchableOpacity>
        )
    }
    const renderGuitarTypeData = ({ item }) => {
        let iconName = item.id === 1 ? 'border-all' : 'guitar';
        let selectedColor = guitarTypeSelected === item.id ? COLOR.SECOND_COLOR : COLOR.UNSELECTED;
        return (
            <TouchableOpacity
                style={styles.guitarTypeItem}
                onPress={() => setGuitarTypeSelected(item.id)}
            >
                <Icon name={iconName} size={20} color={selectedColor} />
                <Text style={[styles.guitarTypeText, { color: selectedColor }]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            {/* Thanh tìm kiếm */}
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.searchWrapper}>
                <Text style={styles.searchText}>Tìm kiếm</Text>
                <Icon name='search' size={20} color={COLOR.UNSELECTED}></Icon>
            </TouchableOpacity>
            <ScrollView style={styles.scrollview}>

                {/* 1. Banner quảng cáo */}
                <FlatList
                    style={styles.list}
                    data={bannerData}
                    renderItem={renderBanner}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                />
                {/* 2. filter chọn loại guitar */}
                <FlatList
                    style={[styles.list, {marginTop: 10}]}
                    data={guitarTypeData}
                    renderItem={renderGuitarTypeData}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

                {/* 3. Danh sách các sản phẩm */}
                    {/* 3.1 Sale đặc biệt (có mức giảm giá cao) */}
                <Text style={styles.categoryTitle}>Sale đặc biệt</Text>
                <View style={styles.categoryWrapper}>
                    {productData.map((item) => {
                        return (
                            <Product
                                key={item.id}
                                item={item} 
                                onPress={() => navigation.navigate('ProductDetail', {productId: item.id})}
                            />
                        )
                    })}
                </View>
                    {/* 3.1 Bán chạy (có số lượng bán cao) */}
                <Text style={styles.categoryTitle}>Bán chạy</Text>
                <View style={styles.categoryWrapper}>
                    {productData.map((item) => {
                        return (
                            <Product
                                key={item.id}
                                item={item} 
                                onPress={() => navigation.navigate('ProductDetail', {productId: item.id})}
                            />
                        )
                    })}
                </View>
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
        width: WIDTH - DIMENSION.MARGIN_HORIZONTAL*2,
        backgroundColor: COLOR.SECOND_COLOR,
        borderRadius: 10,
        marginRight: 20
    },

    // guitar type style 
    guitarTypeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        marginRight: DIMENSION.MARGIN_HORIZONTAL,
    },
    guitarTypeText: {
        marginLeft: 5,
        fontFamily: 'Montserrat-Medium'
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
        justifyContent: 'space-evenly'

    },
})

export default HomeScreen;