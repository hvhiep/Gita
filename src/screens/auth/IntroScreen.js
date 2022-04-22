import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import Video from "react-native-video";
import guitar_intro from '../../assets/videos/guitar_intro.mp4';
import { COLOR, FONT_SIZE, TEXT } from '../../res'
import { PrimaryBtnBig, SecondaryBtnBig } from '../../components'
function IntroScreen({ navigation }) {

    const handleRegister = () => {
        navigation.navigate('Register')
    }

    const handleLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'transparent'}
                translucent
            ></StatusBar>
            <Video
                style={styles.bgVideo}
                source={guitar_intro}
                repeat
                resizeMode="cover"
                muted={true}>
            </Video>
            <Text style={styles.title}>Gita</Text>
            <View style={styles.wrapperBottom}>
                <View style={{width: '90%',  marginBottom: 30}}>
                <Text style={styles.desc}>{TEXT.IntroScreen.intro1}</Text>
                <Text style={styles.desc}>{TEXT.IntroScreen.intro2}</Text>
                </View>
            <PrimaryBtnBig title='Đăng Ký' onPress={handleRegister}></PrimaryBtnBig>
            <SecondaryBtnBig title='Đăng Nhập' onPress={handleLogin}></SecondaryBtnBig>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-around',
    },
    bgVideo: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 80,
        color: COLOR.SECOND_COLOR,
        fontFamily: "Montserrat-Bold"
    },
    wrapperBottom: {
        width: '100%',
        alignItems: "center", 
    },
    desc: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    primaryBtn: {
        backgroundColor: COLOR.SECOND_COLOR,
        width: '90%',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryBtnText: {
        color: COLOR.WHITE,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    secondaryBtn: {
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
    secondaryBtnText: {
        color: COLOR.SECOND_COLOR,
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
})

export default IntroScreen;