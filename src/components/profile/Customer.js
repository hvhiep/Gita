import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';

function Customer({ user }) {

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

    const ChangeSettingBtn = ({ title, onPress }) => {
        return (
            <TouchableOpacity style={styles.btn}>
                <View style={styles.btnWrapper}>
                    <Text style={styles.btnText}>{title}</Text>
                    <Icon3 name='chevron-right' size={20} color={COLOR.MAIN_COLOR} />
                </View>
            </TouchableOpacity>
        )
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
            <Text style={styles.sectionTitle}>Đơn hàng của tôi</Text>
            <View style={styles.orderStateList}>
                {orderState.map((item) => {
                    return (
                        <TouchableOpacity style={styles.orderState} key={item.id}>
                            {/* 1,2,3 thì dùng Icon; 4,5 dùng Icon2 vì các icon cần phải solid mà một vài bộ icon k có solid */}
                            {(item.id === 1 || item.id === 2 || item.id === 3) && <Icon name={item.icon} size={30} color={COLOR.MAIN_COLOR} />}
                            {(item.id === 4 || item.id === 5) && <Icon4 name={item.icon} size={30} color={COLOR.MAIN_COLOR} />}

                            <Text style={styles.orderStateText}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {/* BUTTON LIST */}
            <ChangeSettingBtn title='Đổi mật khẩu' />
            <ChangeSettingBtn title='Liên hệ &amp; Góp ý' />
            <ChangeSettingBtn title='Trung tâm trợ giúp' />
            <ChangeSettingBtn title='Đăng xuất' />
            <View>

            </View>
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
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
        marginBottom: 10,
    },
    orderStateList: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        justifyContent: 'space-around',
        backgroundColor: COLOR.WHITE,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    orderState: {
        alignItems: 'center',

    },
    orderStateText: {
        marginTop: 5,
        width: 60,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TEXT,
    },

    btn: {
        backgroundColor: COLOR.WHITE,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginBottom: 3,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,

        borderBottomWidth: 0.5,
        borderBottomColor: COLOR.GREY
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
})

export default Customer;