import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res/constant'

function FormInput({ style, title, type, inputState, onInputStateChange, multiline, secure  }) {

    const [isFocus, setIsFocus] = useState(false);
    const [isError, setIsError] = useState(false);

    let styleTitle = null;
    let styleInput = null;
    switch (type) {
        case 'big':
            styleTitle = 'titleBig';
            styleInput = 'inputBig';
            break;
        case 'small':
            styleTitle = 'titleSmall';
            styleInput = 'inputSmall';
            break;
    }

    return (
        <View style={[styles.container, style && style]}>
            <Text style={[styles.title, styleTitle && styles[styleTitle]]}>{title}</Text>
            <TextInput
                style={[
                    styles.textInput,
                    styleInput && styles[styleInput],
                    isFocus && styles.selected,
                    isError && styles.error,
                    multiline && {height: 150, textAlignVertical: 'top'}
                ]}
                onChangeText={onInputStateChange}
                value={inputState}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                spellCheck={false}
                underlineColorAndroid='transparent'
                multiline={multiline}
                secureTextEntry={secure}
            ></TextInput>
            {isError && <Text style={styles.errorMessage}>Nhập trùng rồi condi !</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        marginBottom: 4,
    },
    titleBig: {
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    titleSmall: {
        fontSize: FONT_SIZE.SMALL_TITLE,
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
    inputBig: {
        height: 55,
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    inputSmall: {
        height: 40,
        fontSize: FONT_SIZE.SMALL_TITLE,
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

export default FormInput;