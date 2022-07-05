import React from "react";
import { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image
} from 'react-native';
import { COLOR, DIMENSION, FONT_SIZE, HEIGHT, WIDTH } from '../../../res';
import { FormInput, PrimaryBtnBig, TextBtn, BackBtn } from '../../../components';
import { customer, salesman } from '../../../assets';
//firebase
import { auth } from '../../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { storeUser } from '../../../features/users/userSlice';
import { transformErrorCode } from '../../../res';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
//db api
import { createUserAPI } from '../../../api';
//form handler
import { Formik } from 'formik';
import { SignUpSchema } from '../validation';
//message
import { showMessage, hideMessage } from "react-native-flash-message";

function RegisterScreen({ navigation }) {
    const db = getFirestore();
    const dispatch = useDispatch();

    const userRoles = [
        {
            id: 0,
            roleTitle: 'Người bán hàng',
            img: salesman,
        },
        {
            id: 1,
            roleTitle: 'Người mua hàng',
            img: customer,
        }
    ]

    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // slider state
    const [currentXOffset, setCurrentXOffset] = useState(0);
    const scrollXRef = useRef();

    const handleSignupSubmit = (values) => {
        // loading
        setIsLoading(true);
        // LOGIC ĐĂNG KÝ
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('[SIGN_UP] user.uid: ', user.uid);
                // dữ liệu để lưu lên db
                const userData = {
                    id: user.uid,
                    fullName: '',
                    phoneNumber: '',
                    avatarImg: '',
                    sex: null,
                    birthday: '',
                    type: userRole,
                };
                //đẩy lên db
                setDoc(doc(db, `user/${user.uid}`), userData);
                // createUserAPI(userData);
                //Lưu luôn instance này vào redux
                dispatch(storeUser(userData));
                //=> navigation sẽ tự động kiểm tra auth và điều hướng vào Home
            })
            .catch((error) => {
                // Nếu có lỗi thì đưa ra thông báo (phải làm 1 component thông báo lỗi riêng)
                setIsLoading(false);
                const message = transformErrorCode(error.code);
                showMessage({
                    message: message,
                    type: "danger",
                    icon: 'auto',
                    duration: 2500,
                });
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}>
                    <View style={styles.wrapper}>
                        <StatusBar
                            backgroundColor={'transparent'}
                            translucent
                            barStyle="dark-content"
                        ></StatusBar>

                        {currentXOffset === WIDTH ?
                            <BackBtn
                                onPress={() => {
                                    // nếu đang ở trang 2
                                    if (currentXOffset === WIDTH) {
                                        setCurrentXOffset(0);
                                        scrollXRef.current?.scrollTo({ x: 0, y: 0, animated: true })
                                    }
                                }}
                                style={styles.backBtn}
                            /> : null
                        }
                        <Text style={styles.logoText}>Gita</Text>
                        <Text style={styles.title}>Đăng Ký</Text>

                        {/* formik bao slider(scrollView) */}
                        <Formik
                            validationSchema={SignUpSchema}
                            initialValues={{ email: '', password: '', passwordVerification: '' }}
                            onSubmit={(values) => handleSignupSubmit(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <ScrollView
                                        ref={scrollXRef}
                                        style={styles.slider}
                                        horizontal
                                        pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {/* page để chọn type cho user */}
                                        < View style={styles.wrapperForm}>
                                            {userRoles.map((item) => {
                                                const borderColor = userRole === item.id ? COLOR.SECOND_COLOR : COLOR.UNSELECTED;
                                                return (
                                                    <TouchableOpacity
                                                        key={item.id}
                                                        style={[styles.roleWrapper, { borderColor: borderColor }]}
                                                        onPress={() => setUserRole(item.id)}
                                                    >
                                                        <Image style={styles.roleImg} source={item.img} />
                                                        <Text style={styles.roleText}>{item.roleTitle}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View>
                                        {/* page để nhập thông tin đăng ký  */}
                                        <View style={styles.wrapperForm}>
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
                                            <FormInput
                                                style={styles.formInput}
                                                title='Xác nhận mật khẩu'
                                                type='big'
                                                inputState={values.passwordVerification}
                                                onInputStateChange={handleChange('passwordVerification')}
                                                onBlur={handleBlur('passwordVerification')}
                                                secure={true}
                                            />
                                            {/* show validation error */}
                                            {errors.passwordVerification && touched.passwordVerification ? (
                                                <Text style={styles.errorText}>
                                                    {errors.passwordVerification}
                                                </Text>
                                            ) : null}
                                        </View>
                                    </ScrollView>
                                    <PrimaryBtnBig
                                        title={currentXOffset === 0 ? 'Tiếp theo' : 'Đăng ký'}
                                        isLoading={isLoading}
                                        onPress={() => {
                                            // nếu đang ở page 1 thì scroll đến page2
                                            if (userRole !== null) {
                                                if (currentXOffset === 0) {
                                                    setCurrentXOffset(WIDTH);
                                                    scrollXRef.current?.scrollTo({ x: WIDTH, y: 0, animated: true })
                                                }
                                                // còn ở page 2 thì submit form
                                                else handleSubmit()
                                            } else {
                                                showMessage({
                                                    message: "Vui lòng chọn lựa chọn!",
                                                    type: "warning",
                                                    icon: 'auto'
                                                })
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </Formik >
                        <View style={styles.wrapperBottom}>
                            <Text style={styles.bottomText}>Đã có tài khoản?</Text>
                            <TextBtn onPress={() => navigation.navigate('Login')} title='Đăng Nhập' />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView >
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,

    },
    wrapper: {
        flex: 1,
        alignItems: "center",
    },
    logoText: {
        textAlignVertical: "center",
        textAlign: "center",
        width: '100%',
        height: 150,
        fontSize: 60,
        color: COLOR.MAIN_COLOR,
        fontFamily: "Montserrat-Bold",
    },
    title: {
        fontSize: FONT_SIZE.BIG_TITLE,
        color: COLOR.MAIN_COLOR,
        fontFamily: "Montserrat-Bold",
    },
    slider: {

    },
    wrapperForm: {
        justifyContent: 'center',
        width: WIDTH,
        marginBottom: 10,
        height: 400,
    },
    wrapperBottom: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    formInput: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    errorText: {
        color: 'red',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        marginTop: 5,
    },
    bottomText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    backBtn: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 100,
        elevation: 100,
    },
    roleWrapper: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: '40%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLOR.UNSELECTED,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginVertical: 5,
    },
    roleImg: {
        width: '40%',
        height: '100%'
    },
    roleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
        color: COLOR.MAIN_COLOR,
    }
})

export default RegisterScreen;