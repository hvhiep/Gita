import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Order } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas } from '../../res';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getFirestore, collection, query, where, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function CartScreen({ navigation }) {
    console.log('re-render')
    const db = getFirestore();
    const user = useSelector(state => state.user);

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    //state cho  selectAllCheckbox
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [orderIdsSelected, setOrderIdsSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    //-----------------------------Lắng nghe thay đổi dữ liệu của những order thuộc user.id hiện tại đang dùng app
    useEffect(() => {
        const q = query(collection(db, 'order'), where('userId', '==', user.id))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLoading(true);
            const orderArr = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                //tính discountPrice
                data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
                orderArr.push({ id: doc.id, ...data });
            })
            setOrders(orderArr);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    //-----------------------------mỗi khi có 1 order được chọn sẽ tính lại tổng cộng tiền cho những order được chọn
    useEffect(() => {
        if (orders.length > 0) {
            setOrderIdsSelected(() => {
                const ordersTemp = orders;
                const selectedOrders = ordersTemp.filter((item) => item.selected === true);
                const selectedOrderIds = selectedOrders.map((item) => item.id);
                return selectedOrderIds;
            })
            setTotalPrice(() => {
                const ordersTemp = orders;
                const total = ordersTemp.reduce((total, item) => {
                    //order nào có trường selected === true thì mới tính tổng tiền
                    if (item.selected) {
                        return total + (item.product.discountPrice * item.quantity);
                    }
                    return total;
                }, 0)
                return numberWithCommas(total);
            })
        }
    }, [orders])

    //----------------------------- logic cho việc chọn hay bỏ chọn một order
    const handleCheckBoxTouch = async (checkBoxValue, orderId) => {
        //cập nhật lại trường selected với giá trị mới cho order có orderId 
        setLoading(true);
        await updateDoc(doc(db, `order/${orderId}`), { selected: checkBoxValue });
        setLoading(false);
    }

    //----------------------------- xử lý việc thêm bớt trường quantity của mỗi order
    const handleProductQuantityChange = async (orderId, quantity) => {
        try {
            setLoading(true);
            const result = await updateDoc(doc(db, `order/${orderId}`), { quantity })
            setLoading(false);
        } catch (error) {
            console.log('[Cart] lỗi khi cập nhật quantity của order: ', error)
        }
    }
    // MAIN VIEW
    return (
        <View style={styles.container}>
            {/* A. HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Giỏ hàng của tôi ({orders.length})</Text>
            </View>
            {/* B. CONTENT - FLATLIST */}
            {loading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={styles.listOrder}
                        data={orders}
                        renderItem={({ item }) => {
                            return (
                                <Order
                                    key={item.id}
                                    item={item}
                                    navigation={navigation}
                                    onCheckBoxTouch={handleCheckBoxTouch}
                                    onProductQuantityChange={handleProductQuantityChange}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            }
            {/* C. FOOTER */}
            <View style={styles.footer}>
                <View style={styles.checkBoxWrapper}>
                    <BouncyCheckbox
                        size={25}
                        fillColor={COLOR.SECOND_COLOR}
                        unfillColor={COLOR.WHITE}
                        iconStyle={{ borderColor: COLOR.LIGHT_GREY }}
                        isChecked={toggleCheckBox}
                        onPress={() => setToggleCheckBox(!toggleCheckBox)}
                    />
                    <Text style={styles.checkBoxText}>Tất cả</Text>
                </View>
                <View style={styles.totalPriceWrapper}>
                    <Text style={styles.totalPriceText}>Tổng cộng</Text>
                    <Text style={styles.totalPrice}>{totalPrice} đ</Text>
                </View>
                <TouchableOpacity
                    style={styles.orderBtn}
                    onPress={() => {
                        navigation.navigate('OrderVerification', { listOrderSelected: orderIdsSelected })
                    }}
                >
                    <Text style={styles.orderBtnText}>Thanh toán {orderIdsSelected.length !== 0 ? `(${orderIdsSelected.length})` : ''}</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_GREY
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: COLOR.WHITE,
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR.LIGHT_GREY
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        alignSelf: 'center',
    },
    listOrder: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    footer: {
        height: 60,
        backgroundColor: COLOR.WHITE,
        borderTopWidth: 0.2,
        borderTopColor: "#d9d9d9",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    checkBoxWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    totalPriceWrapper: {
        alignItems: 'center'
    },
    totalPriceText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    totalPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR
    },
    orderBtn: {
        backgroundColor: COLOR.SECOND_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    orderBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.WHITE
    },
});

export default CartScreen;