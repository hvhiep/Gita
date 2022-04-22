import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { COLOR } from '../../res/constant'

function SecondaryBtnBig(props) {
    return (
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
            <Text style={styles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        backgroundColor: 'transparent',
        width: '90%',
        height: 55,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.SECOND_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: COLOR.SECOND_COLOR,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
})

export default SecondaryBtnBig;