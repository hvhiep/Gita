import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackBtn } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
import { FormInput, PrimaryBtn } from '../../components';
import { getFirestore, doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';
//form handler
import { Formik } from 'formik';
import { AddressSchema } from '../auth/validation';

const formInputArr = [
    {
        title: 'Tên người nhận',
        field: 'fullName',
    },
    {
        title: 'Số điện thoại',
        field: 'phoneNumber',
    },
    {
        title: 'Địa chỉ',
        field: 'address',
    },
    {
        title: 'Phường (Xã)',
        field: 'ward',
    },
    {
        title: 'Quận (Huyện)',
        field: 'district',
    },
    {
        title: 'Thành phố (Tỉnh)',
        field: 'city',
    },
]

function AddressFormScreen({ navigation, route }) {
    const user = useSelector(state => state.user);
    const db = getFirestore();
    const addressId = route?.params?.addressId;

    //phải lưu riêng id ra để tí còn check nhiều thứ
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        id: '',
        data: {
            fullName: '',
            phoneNumber: '',
            address: '',
            ward: '',
            district: '',
            city: ''
        }
    });

    useEffect(() => {
        //nếu có id truyền từ screen khác qua thì lấy dữ liệu trên db
        if (addressId !== undefined) {
            getAddressById();
        }
        else
            setLoading(false);
    }, [])

    const getAddressById = async () => {
        try {
            const snapshot = await getDoc(doc(db, `user/${user.id}/address/${addressId}`));
            if (snapshot.exists()) {
                const data = snapshot.data();
                const id = snapshot.id;
                setAddress({ id, data });
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    //lưu dữ liệu lên db
    const handleFormSubmit = async (values) => {
        try {
            //nếu id trong state không rỗng -> đã có address trên db -> updateDoc
            if (address.id)
                await updateDoc(doc(db, `user/${user.id}/address/${address.id}`), values);
            else
                //ngược lại thì tạo document mới trên db
                await addDoc(collection(db, `user/${user.id}/address`), values);
            // quay về trang chọn address
            navigation.goBack();
        } catch (error) {
            console.log('[AddressForm]: ', error);
        }
    }

    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thêm địa chỉ mới</Text>
            </View>
            {loading ?
                <View>
                    <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                </View>
                :
                <Formik
                    validationSchema={AddressSchema}
                    initialValues={{
                        fullName: address.data.fullName,
                        phoneNumber: address.data.phoneNumber,
                        address: address.data.address,
                        ward: address.data.ward,
                        district: address.data.district,
                        city: address.data.city,
                    }}
                    onSubmit={handleFormSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <KeyboardAvoidingView style={{ flex: 1 }}>
                                <ScrollView>
                                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                        <View style={styles.contentWrapper}>
                                            {formInputArr.map((item) => {
                                                let keyboardType = 'default';
                                                if (item.field === 'phoneNumber')
                                                    keyboardType = 'numeric';
                                                return (
                                                    <FormInput
                                                        key={item.field}
                                                        style={styles.form}
                                                        title={item.title}
                                                        type='small'
                                                        inputState={values[item.field]}
                                                        onInputStateChange={handleChange(item.field)}
                                                        onBlur={handleBlur(item.field)}
                                                        keyboardType={keyboardType}
                                                    />
                                                )
                                            })}
                                            {(errors && (touched.fullName || touched.phoneNumber || touched.address || touched.ward || touched.district || touched.city) && values.city === '') ? (
                                                <Text style={styles.errorText}>Bắt buộc nhập đầy đủ các trường!</Text>
                                            ) : null}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </KeyboardAvoidingView>
                            <PrimaryBtn
                                style={styles.saveBtn}
                                title='Lưu'
                                type='small'
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            }
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
    errorText: {
        color: 'red',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        marginTop: 10,
        alignSelf: 'center'
    },
    saveBtn: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginBottom: 10,
        paddingVertical: 10,
    }
})

export default AddressFormScreen;