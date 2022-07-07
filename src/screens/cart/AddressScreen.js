import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BackBtn, VerifiedOrder } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
import { Address } from '../../components';
import { useSelector } from 'react-redux';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

function AddressScreen({ navigation }) {
    const user = useSelector(state => state.user);
    const db = getFirestore();

    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //lắng nghe dữ liệu thay đổi realtime
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, `user/${user.id}/address`), (snapshot) => {
            const arr = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                arr.push({ ...data })
            })
            setAddress(arr);
            setLoading(false);
        })

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Chọn địa chỉ giao hàng</Text>
            </View>
            {/* 2.CONTENT */}
            {/* address */}
            <TouchableOpacity
                style={styles.addressBtn}
                onPress={() => navigation.navigate('AddressForm')}
            >
                <Icon name='plus' size={20} color={COLOR.SECOND_COLOR} />
                <Text style={styles.addressBtnText}>Thêm địa chỉ mới</Text>
            </TouchableOpacity>
            {/* orders list */}
            <View style={{ flex: 1 }}>
                {
                    loading ?
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                        :
                        <FlatList
                            style={styles.listOrder}
                            data={address}
                            renderItem={({ item, index }) => <Address key={index} navigation={navigation} item={item} />}
                            keyExtractor={(item, index) => index}
                        />
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        marginLeft: 10,
    },
    addressBtn: {
        marginVertical: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.SECOND_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    addressBtnText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
    listOrder: {
        flex: 1,
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
})

export default AddressScreen;