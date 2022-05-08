import React from "react";
import { useState, useEffect } from 'react';
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
import { COLOR, FONT_SIZE, HEIGHT, WIDTH } from '../../../res';
import { FormInputBig, PrimaryBtnBig, TextBtn, BackBtn } from '../../../components'
import { customer, salesman } from '../../../assets'

function RegisterScreen({ navigation }) {

    const userRoles = [
        {
            id: 0,
            roleTitle: 'Người mua hàng',
            img: customer,
        },
        {
            id: 1,
            roleTitle: 'Người bán hàng',
            img: salesman,
        }
    ]
    
    const [userRole, setUserRole] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = () => {
        if (currentPage === 0){
            setCurrentPage(currentPage + 1);
        }
        else if (currentPage === 1)
            navigation.navigate('Login');
    }

    useEffect(() => {
        if(userRole === null)
            setDisabled(true);
        else
            setDisabled(false);
    }, [userRole])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}>
                    <View style={styles.wrapper}>
                        {currentPage == 1 && (<BackBtn
                            onPress={() => setCurrentPage(currentPage - 1)}
                            style={styles.backBtn}
                        />)}
                        <StatusBar
                            backgroundColor={'transparent'}
                            translucent
                            barStyle="dark-content"
                        ></StatusBar>
                        <Text style={styles.logoText}>Gita</Text>
                        <Text style={styles.title}>Đăng Ký</Text>
                        {currentPage === 0 && (<View style={styles.wrapperForm}>
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
                        </View>)}
                        {currentPage === 1 && (<View style={styles.wrapperForm}>
                            <FormInputBig title='Tên tài khoản' />
                            <FormInputBig title='Số điện thoại' />
                            <FormInputBig title='Mật khẩu' />
                            <FormInputBig title='Xác nhận mật khẩu' />
                        </View>)}

                        <PrimaryBtnBig
                            title={currentPage === 0 ? 'Tiếp Tục' : 'Đăng Ký'}
                            onPress={handleSubmit}
                            disabled={disabled}
                        />
                        <View style={styles.wrapperBottom}>
                            <Text style={styles.bottomText}>Đã có tài khoản?</Text>
                            <TextBtn onPress={() => navigation.navigate('Register')} title='Đăng Nhập' />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginBottom: 10,
        fontSize: FONT_SIZE.BIG_TITLE,
        color: COLOR.MAIN_COLOR,
        fontFamily: "Montserrat-Bold",
    },
    wrapperForm: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        height: 400,
    },
    wrapperBottom: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
        width: '90%',
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