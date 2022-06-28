import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { COLOR, DIMENSION, FONT_SIZE, HEIGHT } from '../../../res';
import { FormInput, PrimaryBtnBig, TextBtn } from '../../../components';
//firebase
import { auth } from '../../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('[SIGN_IN] user: ', userCredential);

                //- gọi api getMe() lấy thông tin trong bảng users

                //- lưu thông tin vào redux để dùng

                //- tự động vào màn hình Home
            })
            .catch((error) => {
                // Nếu có lỗi thì đưa ra thông báo (phải làm 1 component thông báo lỗi riêng)
                const errorMessage = error.message;
                console.log('[LoginScreen] error: ', errorMessage);
            });
    }

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
                    <FormInput
                        style={styles.formInput}
                        title='Email'
                        type='big'
                        inputState={email}
                        onInputStateChange={(text) => setEmail(text)}
                    />
                    <FormInput
                        style={styles.formInput}
                        title='Mật khẩu'
                        type='big'
                        inputState={password}
                        onInputStateChange={(text) => setPassword(text)}
                        secure={true}
                    />
                    <TextBtn style={styles.forgetPass} title='Quên mật khẩu?' />
                </View>
                <PrimaryBtnBig title='Đăng Nhập' onPress={handleSignIn} />
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
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: FONT_SIZE.BIG_TITLE,
        color: COLOR.MAIN_COLOR,
        fontFamily: "Montserrat-Bold",
    },
    wrapperForm: {
        width: '100%',
        marginBottom: 30,
    },
    formInput: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    forgetPass: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
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