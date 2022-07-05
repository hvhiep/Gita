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
import { transformErrorCode } from '../../../res';
//form handler
import { Formik } from 'formik';
import { SignInSchema } from '../validation';
//message
import { showMessage, hideMessage } from "react-native-flash-message";

function LoginScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(false);

    const handleSignInSubmit = (values) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                console.log('[SIGN_IN] user: ', userCredential);
                //- tự động vào màn hình Home
            })
            .catch((error) => {
                console.log('[LoginScreen] error: ', error.code);
                const message = transformErrorCode(error.code);
                setIsLoading(false);
                showMessage({
                    message: message,
                    type: "danger",
                    icon: 'auto',
                    duration: 2500,
                });
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
                <Formik
                    validationSchema={SignInSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => handleSignInSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <View style={styles.wrapperForm}>
                                <Text style={styles.title}>Đăng Nhập</Text>
                                <FormInput
                                    style={styles.formInput}
                                    title='Email'
                                    type='big'
                                    inputState={values.email}
                                    onInputStateChange={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {/* show validation error */}
                                {errors.email && touched.email ? (
                                    <Text style={styles.errorText}>
                                        {errors.email}
                                    </Text>
                                ) : null}
                                <FormInput
                                    style={styles.formInput}
                                    title='Mật khẩu'
                                    type='big'
                                    inputState={values.password}
                                    onInputStateChange={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secure={true}
                                />
                                {/* show validation error */}
                                {errors.password && touched.password ? (
                                    <Text style={styles.errorText}>
                                        {errors.password}
                                    </Text>
                                ) : null}
                                <TextBtn style={styles.forgetPass} title='Quên mật khẩu?' />
                            </View>
                            <PrimaryBtnBig
                                title='Đăng Nhập'
                                onPress={handleSubmit}
                                isLoading={isLoading}
                            />
                        </>
                    )}
                </Formik>
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
    errorText: {
        color: 'red',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        marginTop: 5,
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