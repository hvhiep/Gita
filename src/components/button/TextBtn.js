import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLOR, FONT_SIZE } from '../../res/constant'

function TextBtn(props) {
    return (
            <TouchableOpacity style={[styles.btn, props.style]} onPress={props.onPress}>
                <Text style={styles.btnText}>{props.title}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 6
    },
    btnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
    },
})

export default TextBtn;