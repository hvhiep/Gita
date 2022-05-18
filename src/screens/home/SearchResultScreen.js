import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    ScrollView
} from 'react-native';
import { SearchBar } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Product } from '../../components';

//dummy data
import productData from './productData';

function SearchResultScreen({ navigation, route }) {

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

    const { searchResult } = route?.params;
    const [headerFilterSelected, setHeaderFilterSelected] = useState(1);

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
            <ScrollView>
                <View style={styles.categoryWrapper}>
                    {productData.map((item) => {
                        return (
                            <Product key={item.id} item={item}></Product>
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_GREY,
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
        justifyContent: 'space-evenly'

    },
})

export default SearchResultScreen;