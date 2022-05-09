import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    FlatList
} from 'react-native';
import { SearchBar } from '../../components';
import { COLOR, FONT_SIZE } from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome';



function SearchScreen({ navigation }) {

    const searchHistory = [
        {
            id: 1,
            content: 'dan dien tot nhat'
        },
        {
            id: 2,
            content: 'dan daaaa'
        },
        {
            id: 3,
            content: 'đàn bình thường thôi'
        },
        {
            id: 4,
            content: 'đàn taylor'
        },
        {
            id: 5,
            content: 'đàn ba đờn'
        },
    ];

    const [filterData, setFilterData] = useState(searchHistory);
    const [initialData, setInitialData] = useState(searchHistory);
    const [search, setSearch] = useState('');

    const renderSearchHistory = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SearchResult', {searchResult: item.content})} style={styles.searchHistoryItem}>
                <Text style={styles.searchHistoryText}>{item.content}</Text>
            </TouchableOpacity>
        )
    }

    // hàm xử lý filter khi search
    const handleSearchFilter = (text) => {
        //nếu có chữ trong TextInput
        if(text){
            //Dùng hàm filter: trả về một mảng mới với các phần tử đạt điều kiện yêu cầu
            const newData = initialData.filter((item) => {
                const newItem = item.content ? item.content.toUpperCase() : ''.toUpperCase();
                const searchText = text.toUpperCase();
                return newItem.indexOf(searchText) > -1;
            })
            console.log('newData: ', newData);
            setFilterData(newData);
            setSearch(text);
        }
        else{
            setFilterData(initialData);
            setSearch(text);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle="dark-content"
            ></StatusBar>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' size={20} color={COLOR.UNSELECTED}></Icon>
                </TouchableOpacity>
                <TextInput
                    style={styles.search}
                    placeholder='Tìm kiếm gì đó'
                    value={search}
                    onChangeText={(text) => handleSearchFilter(text)}
                    onSubmitEditing={({ nativeEvent }) => {
                        navigation.navigate('SearchResult', {searchResult: nativeEvent.text})
                    }}
                ></TextInput>
                <TouchableOpacity style={styles.filter}>
                    <Icon name='search' size={20} color={COLOR.UNSELECTED}></Icon>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.listSearchHistory}
                data={filterData}
                renderItem={renderSearchHistory}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND,
    },
    headerWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    backBtn: {
        padding: 4,
        borderRadius: 50
    },
    search: {
        backgroundColor: COLOR.WHITE,
        height: 40,
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 10,
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        paddingHorizontal: 10,

    },
    filter: {
        padding: 4,
        borderRadius: 50
    },
    listSearchHistory: {
        width: '100%',
        marginTop: 10,
    },
    searchHistoryItem: {
        height: 60,
        backgroundColor: COLOR.WHITE,
        marginVertical: 1,
        justifyContent: 'center',
        paddingHorizontal: 14
    },
    searchHistoryText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.BIG_TEXT
    }
})

export default SearchScreen;