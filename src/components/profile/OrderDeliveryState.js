import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
import { Badge } from '@rneui/themed';

const OrderDeliveryState = ({ title, orderState, navigation }) => {
    return (
        <>
            <View style={styles.orderTitleWrapper}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.seeAll} onPress={() => navigation.navigate('OrderList')}>Xem tất cả</Text>
                    <Icon name='chevron-right' size={10} color={COLOR.GREY} />
                </TouchableOpacity>
            </View>
            <View style={styles.orderStateList}>
                {orderState.map((item) => {
                    return (
                        <TouchableOpacity style={styles.orderState} key={item.id}>
                            {/* 1,2,3 thì dùng Icon; 4,5 dùng Icon2 vì các icon cần phải solid mà một vài bộ icon k có solid */}
                            <View style={styles.orderStateItem}>
                                {(item.id === 1 || item.id === 2 || item.id === 3) && <Icon name={item.icon} size={30} color={COLOR.MAIN_COLOR} />}
                                {(item.id === 4 || item.id === 5) && <Icon4 name={item.icon} size={30} color={COLOR.MAIN_COLOR} />}
                                <Badge containerStyle={styles.orderBadge} value={25} badgeStyle={{ backgroundColor: COLOR.SECOND_COLOR }}></Badge>
                            </View>

                            <Text style={styles.orderStateText}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    orderTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        // paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
        marginBottom: 10,
    },
    seeAll: {
        fontFamily: 'Montserrat-Regular',
        color: COLOR.GREY,
        fontSize: FONT_SIZE.SMALL_TEXT,
        marginRight: 5,
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
    orderStateItem: {
        width: 45,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderBadge: {
        position: 'absolute',
        right: -8,
        top: -5,
    },
    orderStateText: {
        marginTop: 5,
        width: 61,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TEXT,
    },
});

export default OrderDeliveryState;