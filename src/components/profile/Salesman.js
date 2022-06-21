import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import GradientText from '../general/GradientText';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import { OrderDeliveryState, ChangeSettingBtn } from '../../components';

//dummy:
import shopData from '../../screens/home/shopData';

const Salesman = ({ navigation }) => {

    const orderState = [
        {
            id: 1,
            title: 'Đang xử lý',
            icon: 'clipboard-check',
        },
        {
            id: 2,
            title: 'Đang vận chuyển',
            icon: 'truck',
        },
        {
            id: 3,
            title: 'Đang giao hàng',
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

    const data = shopData.find((item) => item.id === 2);

    return (
        <View style={styles.container}>
            {/* 1. HEADER */}
            <ImageBackground source={data.backgroundImg} style={styles.headerWrapper} resizeMode='cover'>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoLeft}>
                        <Image source={data.avatarImg} style={styles.avatar} resizeMode='contain' />
                        <View style={styles.nameWrapper}>
                            <Text style={styles.shopName}>{data.name}</Text>
                            <View style={styles.locationWrapper}>
                                <Icon2 name='location-sharp' size={15} color={COLOR.WHITE} />
                                <Text style={styles.locationText}>{data.city}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.settingBtn}>
                        <Icon2 name='settings-sharp' size={20} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
                <View style={styles.desc1Wrapper}>
                    <Text style={styles.desc1Text}>100% Chính hãng</Text>
                    <Text style={styles.desc1Text}>Giá tốt vô đối</Text>
                    <Text style={styles.desc1Text}>Miễn phí giao hàng</Text>
                </View>
                <View style={styles.desc2Wrapper}>
                    <View style={styles.desc2ItemWrapper}>
                        <Text style={styles.desc2TextLeft}>20</Text>
                        <Text style={styles.desc2TextRight}>Sản phẩm</Text>
                    </View>
                    <View style={styles.desc2ItemWrapper}>
                        <Text style={styles.desc2TextLeft}>4.5</Text>
                        <Text style={styles.desc2TextRight}>Đánh giá</Text>
                    </View>
                    <View style={styles.desc2ItemWrapper}>
                        <Text style={styles.desc2TextLeft}>56%</Text>
                        <Text style={styles.desc2TextRight}>Phản hồi chat</Text>
                    </View>
                </View>
            </ImageBackground>

            {/* 2. CONTENT */}
            {/* statistic */}
            <View style={styles.statisticWrapper}>
                <View style={styles.statisticItemWrapper}>
                    <GradientText style={styles.statisticText}>Đơn bán năm</GradientText>
                    <GradientText style={styles.statisticText}>40</GradientText>
                </View>
                <View style={styles.statisticItemWrapper}>
                    <GradientText style={styles.statisticText}>Doanh thu năm</GradientText>
                    <GradientText style={styles.statisticText}>{numberWithCommas(123455000)} đ</GradientText>
                </View>
            </View>
            <OrderDeliveryState
                title='Quản lý đơn hàng' 
                orderState={orderState} 
                navigation={navigation}
            />
            {/* BUTTON LIST */}
            <ChangeSettingBtn title='Quản lý sản phẩm' onPress={() => navigation.navigate('TotalProduct', {shopId: data.id})}/>
            <ChangeSettingBtn title='Báo cáo doanh thu' />
            <ChangeSettingBtn title='Trung tâm trợ giúp' />
            <ChangeSettingBtn title='Đăng xuất' />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        width: '100%'
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 50,
        borderWidth: 0.2,
        borderColor: COLOR.LIGHT_GREY,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameWrapper: {
        marginLeft: 20,
    },
    shopName: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 5,
    },
    locationText: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.SMALL_TEXT,

    },
    settingBtn: {
    },
    desc1Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    desc1Text: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.WHITE,
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    desc2Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    desc2ItemWrapper: {
        flexDirection: 'row'
    },
    desc2TextLeft: {
        color: COLOR.SECOND_COLOR,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
    desc2TextRight: {
        marginLeft: 5,
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
    statisticWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,

    },
    statisticItemWrapper: {
        height: 100,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: COLOR.EXTRA_LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statisticText: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TITLE,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Salesman;