import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard
} from 'react-native';
import { COLOR, FONT_SIZE } from '../../res/constant'

function FormInputBig(props) {

    const [isFocus, setIsFocus] = useState(false);
    const [isError, setIsError] = useState(false);
    const [text, setText] = useState();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                style={[
                    styles.textInput,
                    isFocus && styles.selected,
                    isError && styles.error
                ]}
                onChange={() => setText(text)}
                value={text}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                spellCheck={false}
                underlineColorAndroid='transparent'
            ></TextInput>
            {isError && <Text style={styles.errorMessage}>Nhập trùng rồi condi !</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginTop: 10,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
        color: COLOR.MAIN_COLOR,
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: COLOR.UNSELECTED,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: FONT_SIZE.NORMAL_TITLE,
        fontFamily: 'Montserrat-Medium',
        paddingHorizontal: 6
    },
    selected: {
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.SECOND_COLOR,
        borderWidth: 2,
    },
    errorMessage: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginTop: 2,
        color: 'red'
    },
    error: {
        backgroundColor: COLOR.WHITE,
        borderColor: 'red',
        borderWidth: 2,
    }
})

export default FormInputBig;