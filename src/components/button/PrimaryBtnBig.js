import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLOR } from '../../res/constant'

function PrimaryBtnBig(props) {
    return (
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
            <Text style={styles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLOR.SECOND_COLOR,
        width: '90%',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: COLOR.WHITE,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
})

export default PrimaryBtnBig;