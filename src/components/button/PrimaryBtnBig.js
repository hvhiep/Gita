import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { COLOR } from '../../res/constant'

function PrimaryBtnBig(props) {
    let loading = false;
    if(props.isLoading !== undefined) 
        loading = props.isLoading;
    return (
        <TouchableOpacity 
        style={styles.btn} onPress={props.onPress}>
            {loading ? <ActivityIndicator size='small' color={COLOR.WHITE} /> 
            :
            <Text style={styles.btnText}>{props.title}</Text>}
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