import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLOR } from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome';

function SearchBar() {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>Tìm kiếm</Text>
            <Icon name='search' size={20} color={COLOR.UNSELECTED}></Icon>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,

    },
    text: {
        opacity: 0.5,
        fontFamily: 'Montserrat-Medium',
        flex: 1,
    }
})

export default SearchBar;