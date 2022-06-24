import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackBtn } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
import { FormInput, PrimaryBtn } from '../../components';

//dump:
import addressData from './addressData';

function AddressFormScreen({ navigation, route }) {

    const addressId = route?.params?.addressId;
    const address = addressData.find((item) => item.id === addressId)

    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thêm địa chỉ mới</Text>
            </View>
            <KeyboardAvoidingView style={{flex: 1}}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.contentWrapper}>
                            <FormInput style={styles.form} title='Tên người nhận' type='small' initValue={address?.fullName}/>
                            <FormInput style={styles.form} title='Số điện thoại' type='small'initValue={address?.phoneNumber}/>
                            <FormInput style={styles.form} title='Địa chỉ' type='small'initValue={address?.address}/>
                            <FormInput style={styles.form} title='Phường (Xã)' type='small'initValue={address?.ward}/>
                            <FormInput style={styles.form} title='Quận (Huyện)' type='small'initValue={address?.district}/>
                            <FormInput style={styles.form} title='Thành phố (Tỉnh)' type='small'initValue={address?.city}/>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
            <PrimaryBtn style={styles.saveBtn} title='Lưu' type='small'></PrimaryBtn>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    header: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        marginLeft: 10,
    },
    contentWrapper: {
        flex: 1,
    },
    form: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    saveBtn: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginBottom: 10,
        paddingVertical: 10,
    }
})

export default AddressFormScreen;