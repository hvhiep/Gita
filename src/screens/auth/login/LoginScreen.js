import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { COLOR, FONT_SIZE, HEIGHT } from '../../../res';
import { FormInputBig, PrimaryBtnBig, TextBtn } from '../../../components'

function LoginScreen({ navigation }) {
    return (
        <TouchableWithoutFeedback
            style={styles.container}
            onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                    barStyle="dark-content"
                ></StatusBar>
                <Text style={styles.logoText}>Gita</Text>
                <View style={styles.wrapperForm}>
                    <Text style={styles.title}>Đăng Nhập</Text>
                    <FormInputBig title='Tên tài khoản' />
                    <FormInputBig title='Mật khẩu' />
                    <TextBtn title='Quên mật khẩu?' />
                </View>
                <PrimaryBtnBig title='Đăng Nhập' />
                <View style={styles.wrapperBottom}>
                    <Text style={styles.bottomText}>Chưa có tài khoản?</Text>
                    <TextBtn onPress={() => navigation.navigate('Register')} title='Đăng Ký' />
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        alignItems: "center",
    },
    logoText: {
        textAlignVertical: "center",
        textAlign: "center",
        width: '100%',
        height: 200,
        fontSize: 60,
        color: COLOR.MAIN_COLOR,
        fontFamily: "Montserrat-Bold",
        
    },
    title: {
        marginBottom: 10,
        fontSize: FONT_SIZE.BIG_TITLE,
        color: COLOR.MAIN_COLOR,
        fontFamily: "Montserrat-Bold",
    },
    wrapperForm: {
        alignItems: "center",
        width: '100%',
        marginBottom: 30,
    },
    wrapperBottom: {
        position: 'absolute',
        top: HEIGHT * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
    }
})

export default LoginScreen;