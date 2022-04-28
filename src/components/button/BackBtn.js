import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../res/constant'

function BackBtn(props) {
    return (
        <TouchableOpacity style={[styles.btn, props.style]} onPress={props.onPress}>
            <Icon name='arrow-left' size={30} color={COLOR.SECOND_COLOR}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default BackBtn;