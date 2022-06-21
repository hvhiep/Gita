import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon3 from 'react-native-vector-icons/Feather';
import { COLOR, DIMENSION, FONT_SIZE } from '../../res';

const ChangeSettingBtn = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <View style={styles.btnWrapper}>
                <Text style={styles.btnText}>{title}</Text>
                <Icon3 name='chevron-right' size={20} color={COLOR.MAIN_COLOR} />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLOR.EXTRA_LIGHT_GREY,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginBottom: 3,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
})

export default ChangeSettingBtn;