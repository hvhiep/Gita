import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE } from '../../res/constant';

const DropDown = ({ data, open, selectedValue, containerStyle, title, placeholder, onSelectItem, onOpen }) => {

    //phải biến đổi dữ liệu của selectedValue về dạng {label: ,value: } trước khi cho vào DropDown (vì label để hiển thị cho người dùng khác với value để lưu trong database)

    return (
        <View style={[styles.container, containerStyle && containerStyle]}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.selectedItemBtn} onPress={onOpen}>
                <Text style={styles.selectedItemText}>{selectedValue ? selectedValue.label : placeholder}</Text>
                {open ?
                    <Icon name='chevron-up' size={20} color={COLOR.MAIN_COLOR} />
                    :
                    <Icon name='chevron-down' size={20} color={COLOR.MAIN_COLOR} />}
            </TouchableOpacity>
            {open && <View style={styles.dropDown}>
                {data.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item.value}
                            style={[styles.dropDownItem, selectedValue && item.value === selectedValue.value && styles.dropDownItemSelected]}
                            onPress={() => {
                                onSelectItem(item);
                                onOpen();
                            }}
                        >
                            <Text style={styles.dropDownItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        marginBottom: 4,
        fontSize: FONT_SIZE.SMALL_TITLE,
    },
    selectedItemBtn: {
        flexDirection: 'row',
        backgroundColor: COLOR.UNSELECTED,
        height: 40,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 6

    },
    selectedItemText: {
        fontSize: FONT_SIZE.SMALL_TITLE,
        fontFamily: 'Montserrat-Medium',
    },
    dropDown: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: 6,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.UNSELECTED
    },
    dropDownItem: {
        paddingVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    dropDownItemSelected: {
        backgroundColor: COLOR.SECOND_COLOR
    },
    dropDownItemText: {
        fontSize: FONT_SIZE.SMALL_TITLE,
        fontFamily: 'Montserrat-Medium',
        color: COLOR.MAIN_COLOR
    },
});

export default DropDown;
