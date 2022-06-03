import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE, numberWithCommas, DIMENSION } from '../../res';

function Address({ navigation, address }) {
    return (
        <TouchableOpacity
            style={styles.container}
            
        >
            <View style={styles.contentWrapper}>
                <Icon2 name='map-marked-alt' size={20} color={COLOR.MAIN_COLOR} />
                <View style={styles.infoWrapper}>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.fullName}>{address.fullName}</Text>
                        <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
                    </View>
                    <Text style={styles.infoAddress}>{address.address}, {address.ward}, {address.district}, {address.city}</Text>
                </View>
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => navigation.navigate('AddressForm', {addressId: address.id})}
                >
                    <Text style={styles.editBtnText}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: COLOR.WHITE,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        paddingBottom: 20,
        height: 110,
        maxHeight: 300,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoWrapper: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
    },
    nameWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    fullName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    phoneNumber: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginLeft: 10,
    },
    infoAddress: {
        marginTop: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    editBtn: {
        alignSelf: 'flex-start',
        padding: 5,
    },
    editBtnText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.SECOND_COLOR,
    },
})

export default Address;