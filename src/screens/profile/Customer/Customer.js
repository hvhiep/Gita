import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import { COLOR, FONT_SIZE, DIMENSION } from '../../../res';
import { OrderDeliveryState, ChangeSettingBtn } from '../../../components';
//firebase
import { auth } from '../../../../firebase';
import { signOut } from 'firebase/auth';

function Customer({ navigation, user }) {

    const orderState = [
        {
            id: 1,
            title: 'Chờ xác nhận',
            icon: 'clipboard-check',
        },
        {
            id: 2,
            title: 'Chờ vận chuyển',
            icon: 'truck',
        },
        {
            id: 3,
            title: 'Chờ giao hàng',
            icon: 'truck-loading',
        },
        {
            id: 4,
            title: 'Đã giao hàng',
            icon: 'check-square',
        },
        {
            id: 5,
            title: 'Đơn đã hủy',
            icon: 'window-close',
        },
    ];

    const handleSignOut = () => {
        if(auth){
            signOut(auth)
                .then(() => {
                    //đăng xuất thành công, thông báo trước khi đăng xuất
                })
                .catch((error) => {
                    //có lỗi khi đăng xuất
                    console.log('[SIGN_OUT] error: ', error.message);
                })
        }
    }

    return (
        <>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatar}>
                        <Image style={styles.avatarImg} source={user.img} />
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{user.phoneNumber}</Text>
                        <TouchableOpacity style={styles.changeInfoBtn}>
                            <Text style={styles.changeInfoBtnText}>Hoàn tất thông tin tài khoản</Text>
                            <Icon3 name='chevron-right' size={20} color={COLOR.GREY} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon2 name='settings-sharp' size={20} color={COLOR.GREY} />
                </TouchableOpacity>
            </View>
            {/* 2.ORDER DELIVERY STATE */}
            <OrderDeliveryState
                title='Đơn hàng của tôi'
                orderState={orderState}
                navigation={navigation}
            />
            {/* BUTTON LIST */}
            <ChangeSettingBtn title='Đổi mật khẩu' />
            <ChangeSettingBtn title='Liên hệ &amp; Góp ý' />
            <ChangeSettingBtn title='Trung tâm trợ giúp' />
            <ChangeSettingBtn title='Đăng xuất' onPress={handleSignOut}/>
        </>
    )
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: 60,
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: COLOR.GREY,
    },
    avatarImg: {
        borderRadius: 50,
        width: '95%',
        height: '95%',

    },
    headerInfo: {
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
    },
    changeInfoBtn: {
        flexDirection: 'row',
    },
    changeInfoBtnText: {
        fontFamily: 'Montserrat-Medium',
        color: COLOR.GREY,
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        // paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
        marginBottom: 10,
    },

})

export default Customer;