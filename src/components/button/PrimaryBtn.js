import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLOR, FONT_SIZE } from '../../res/constant';

function PrimaryBtn(props) {

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
        backgroundColor: COLOR.SECOND_COLOR,
        borderRadius: 10,
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
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Medium'
    },
    textBig: {
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    textSmall: {
        fontSize: FONT_SIZE.SMALL_TITLE,
    },

})

export default PrimaryBtn;