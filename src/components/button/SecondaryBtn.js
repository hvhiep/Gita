import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLOR, FONT_SIZE } from '../../res/constant';

function SecondaryBtn(props) {

    let styleBtn = null;
    let styleText = null;
    switch(props.type){
        case 'big':
            styleBtn = 'btnBig';
            styleText = 'textBig';
            break;
        case 'small':
            styleBtn = 'btnSmall';
            styleText = 'textSmall';
            break;
        case 'long':
            styleBtn = 'btnLong';
            styleText = 'textLong';
            break;
    }  

    return (
        <TouchableOpacity 
            style={[styles.btn, styleBtn && styles[styleBtn]]}
            onPress={props.onPress}
        >
            <Text style={[styles.text, styleText && styles[styleText]]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.SECOND_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnBig: {
        width: '100%',
        paddingVertical: 15,
    },
    btnSmall: {
        paddingVertical: 5,
        paddingHorizontal: 25,
    },
    text: {
        color: COLOR.SECOND_COLOR,
        fontFamily: 'Montserrat-Medium'
    },
    textBig: {
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    textSmall: {
        fontSize: FONT_SIZE.SMALL_TITLE,
    },

})

export default SecondaryBtn;