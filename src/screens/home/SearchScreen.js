import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { COLOR, FONT_SIZE } from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome';
//firebase
import { getFirestore, collection, getDocs, query, orderBy, addDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function SearchScreen({ navigation }) {
    const db = getFirestore();
    const user = useSelector(state => state.user);

    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [search, setSearch] = useState('');

    //gọi api realtime
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, `user/${user.id}/searchHistory`), orderBy('timestamp', 'desc')), (snapshot) => {
            const searchArr = [];
            snapshot.forEach((doc) => {
                searchArr.push(doc.data());
            })
            setFilterData(searchArr);
            setInitialData(searchArr);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const renderSearchHistory = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    //truyền params qua 2 navigator lồng nhau stack -> drawer -> screen
                    navigation.navigate('FilterDrawer', { screen: 'SearchResult', params: { searchResult: item.value } })
                }
                }
                style={styles.searchHistoryItem}>
                <Text style={styles.searchHistoryText}>{item.value}</Text>
            </TouchableOpacity>
        )
    }

    // hàm xử lý filter khi search
    const handleSearchFilter = (text) => {
        //nếu có chữ trong TextInput
        if (text) {
            //Dùng hàm filter: trả về một mảng mới với các phần tử đạt điều kiện yêu cầu
            const newData = initialData.filter((item) => {
                const newItem = item.value ? item.value.toUpperCase() : ''.toUpperCase();
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
                    placeholder='Nhập tên cây đàn bạn muốn tìm...'
                    value={search}
                    onChangeText={(text) => handleSearchFilter(text)}
                    onSubmitEditing={async ({ nativeEvent }) => {
                        //lưu value mới lên db
                        const newHistory = {
                            value: nativeEvent.text,
                            timestamp: Timestamp.now(),
                        }
                        await addDoc(collection(db, `user/${user.id}/searchHistory`), newHistory);
                        navigation.navigate(
                            'FilterDrawer',
                            { screen: 'SearchResult', params: { searchResult: nativeEvent.text } }
                        )
                    }}
                ></TextInput>
                <TouchableOpacity style={styles.filter}>
                    <Icon name='search' size={20} color={COLOR.UNSELECTED}></Icon>
                </TouchableOpacity>
            </View>
            {
                loading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <FlatList
                        style={styles.listSearchHistory}
                        data={filterData}
                        renderItem={renderSearchHistory}
                        keyExtractor={item => item.value}
                    />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE,
    },
    loading: {
        flex: 1,
        alignSelf: 'center'
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
        backgroundColor: COLOR.BACKGROUND_GREY,
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
        backgroundColor: COLOR.BACKGROUND_GREY
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