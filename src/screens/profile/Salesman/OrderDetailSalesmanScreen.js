import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas, orderStatusLookup } from '../../../res';
import { BackBtn, PrimaryBtn } from '../../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { getFirestore, getDoc, doc, Timestamp, onSnapshot, runTransaction, getDocs, where, query, collection } from 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';

const OrderDetailSalesmanScreen = ({ navigation, route }) => {
    const db = getFirestore();
    const orderId = route?.params?.orderId;

    const [loading, setLoading] = useState(true);
    const [addressLoading, setAddressLoading] = useState(true);
    const [order, setOrder] = useState(null);
    // một vài thông tin của order cần biến đổi để hiển thị lên
    const [displayInfo, setDisplayInfo] = useState({
        orderStatus: '',
        orderDate: '',
        deliveryDate: ''
    });
    const [address, setAddress] = useState({});

    // lắng nghe realtime
    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(doc(db, `order/${orderId}`), (doc) => {
            if (!doc.exists())
                console.log('[OrderDetail] order không tồn tại!');
            else {
                const data = doc.data();
                data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
                data.id = doc.id;
                setOrder(data);
                setLoading(false);
            }
        })

        return () => unsub();
    }, []);


    //lấy địa chỉ giao hàng của người mua để hiển thị
    useEffect(() => {
        if (order !== null) {
            getUserAddressById();
            //đổi status thành chữ để hiển thị
            const orderStatus = orderStatusLookup.find((item) => item.id === order.status);
            //đổi timestamp sang date để hiển thị
            const orderDate = new Timestamp(order.orderDate.seconds, order.orderDate.nanoseconds);
            //một vài đơn hàng sẽ không có deliveryDate
            if (order.deliveryDate === null)
                setDisplayInfo({ orderStatus, orderDate, deliveryDate: '' });
            else {
                const deliveryDate = new Timestamp(order.deliveryDate.seconds, order.deliveryDate.nanoseconds);
                setDisplayInfo({ orderStatus, orderDate, deliveryDate });
            }
        }
    }, [order]);
    const getUserAddressById = async () => {
        try {
            setAddressLoading(true);
            const snapshot = await getDoc(doc(db, `user/${order.userId}/address/${order.deliveryAddressId}`));
            if (!snapshot.exists())
                throw '[OrderDetail] Không tồn tại address!';
            const data = snapshot.data();
            data.id = snapshot.id;
            setAddress(data);
            setAddressLoading(false);
        } catch (error) {
            console.log('[OrderDetail]: ', error);
        }
    };
    const renderBtn = () => {
        try {
            // chờ xác nhận
            if (order.status === 0) {
                return (
                    <>
                        <PrimaryBtn
                            style={styles.btn}
                            title='Xác nhận đơn hàng'
                            type='small'
                            onPress={handleConfirmOrder}
                        />
                    </>
                )

            }
            // đang vận chuyển
            else if (order.status === 1) {
                return (
                    <>
                        <PrimaryBtn
                            style={styles.btn}
                            title='Xác nhận vận chuyển'
                            type='small'
                            onPress={handleConfirmOrderDelivery}
                        />
                    </>
                )
            } else return null;
        } catch (error) {
            console.log('[OrderDetailSalesman]: ', error);
        }

    }
    //------------------------------------------HANDLE
    //XỬ LÝ VIỆC XÁC NHẬN ĐƠN HÀNG Ở 'CHỜ XÁC NHẬN'
    const handleConfirmOrder = async () => {
        try {
            //1. kiểm tra số lượng sp có đủ hay không?
            if (order.product.quantity === 0)
                throw 'Số lượng sản phẩm không đủ!';
            // + lấy mảng id của các order có productId và chưa giao hàng(received == false) có liên quan
            const productId = order.product.id;
            const orderIdArr = [];
            const snapshot = await getDocs(query(collection(db, 'order'), where('product.id', '==', productId), where('received', '==', false)));
            snapshot.forEach((doc) => {
                orderIdArr.push(doc.id);
            });
            // + dùng transaction để update cùng một lúc 2 bảng product và order
            const quantityTrans = await runTransaction(db, async (transaction) => {
                //read: lấy quantity của product muốn update
                const product = await transaction.get(doc(db, `product/${productId}`));
                if (!product.exists())
                    throw 'không có product!';
                //change data: 
                const newQuantity = product.data().quantity - order.quantity;
                const newSoldQuantity = product.data().soldQuantity + order.quantity;
                //write:
                //số lượng thì không được là số âm
                if (newQuantity >= 0) {
                    //write product
                    transaction.update(doc(db, `product/${productId}`), { quantity: newQuantity, soldQuantity: newSoldQuantity });
                    //write orders
                    orderIdArr.forEach((id) => {
                        transaction.update(doc(db, `order/${id}`), { 'product.quantity': newQuantity, 'product.soldQuantity': newSoldQuantity });
                    })
                    //cập nhật deliveryDate của order hiện tại là cách 3 ngày so với orderDate và tăng status == 1
                    const newDeliveryDate = new Timestamp(order.orderDate.seconds + 259200, order.orderDate.nanoseconds);
                    transaction.update(doc(db, `order/${order.id}`), {deliveryDate: newDeliveryDate, status: 1})
                } else {
                    throw 'không còn hàng!';
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirmOrderDelivery = () => {
        //chuyển trạng thái từ 'Chờ vận chuyển' -> 'Chờ giao hàng'
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thông tin đơn hàng</Text>
            </View>
            {
                addressLoading ?
                    <View>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <>
                        <View style={[styles.messageWrapper, displayInfo.orderStatus && { backgroundColor: displayInfo.orderStatus.color }]}>
                            {(order.status === 0 || order.status === 1 || order.status === 2) && <Icon2 name={displayInfo.orderStatus.icon} size={30} color={COLOR.WHITE} />}

                            {(order.status === 3 || order.status === 4) && <Icon name={displayInfo.orderStatus.icon} size={30} color={COLOR.WHITE} />}
                            <Text style={styles.messageText}>{displayInfo.orderStatus.title2}</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Thông tin người nhận</Text>
                        <View style={styles.addressWrapper}>
                            <Icon2 name='map-marked-alt' size={20} color={COLOR.MAIN_COLOR} />
                            <View style={styles.addressInfoWrapper}>
                                <View style={styles.nameWrapper}>
                                    <Text style={styles.fullName}>{address.fullName}</Text>
                                    <Text style={styles.phoneNumber}>{address.phoneNumber}</Text>
                                </View>
                                <Text style={styles.infoAddress}>{address.address}, {address.ward}, {address.district}, {address.city}</Text>
                            </View>
                        </View>
                    </>
            }
            {
                loading ?
                    <View>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <>
                        <View style={styles.orderContentWrapper}>
                            {/* ảnh sp */}
                            <View style={styles.imgWrapper}>
                                <Image style={styles.img} source={{ uri: order.product.img[0] }}></Image>
                            </View>
                            {/* info sp */}
                            <View style={styles.orderInfoWrapper}>
                                <Text style={styles.productName}>{order.product.name}</Text>
                                {/* số lượng  */}
                                <Text style={[styles.text, { marginBottom: 5 }]}>Số lượng: {order.quantity}</Text>
                                <View style={styles.priceWrapper}>
                                    <Text style={styles.text}>Tổng cộng: </Text>
                                    <Text style={styles.discountPrice}>{numberWithCommas(order.product.discountPrice * order.quantity)} đ</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.orderTimeWrapper}>
                            <Text style={styles.boldText}>Mã đơn hàng:</Text>
                            <Text style={styles.orderIdText}>{order.id}</Text>
                        </View>
                        <View style={styles.orderTimeWrapper}>
                            <Text style={styles.orderDateTitle}>Thời gian đặt hàng: </Text>
                            <Text style={styles.orderDate}>{displayInfo.orderDate.toDate().toISOString()}</Text>
                        </View>
                        {
                            displayInfo.deliveryDate === '' ?
                                null
                                :
                                <View style={styles.orderTimeWrapper}>
                                    <Text style={styles.orderDateTitle}>Thời gian giao hàng:</Text>
                                    <Text style={styles.orderDate}>{displayInfo.deliveryDate.toDate().toISOString()}</Text>
                                </View>

                        }
                        {renderBtn()}

                    </>
            }

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE
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
    messageWrapper: {
        height: 130,
        backgroundColor: COLOR.GREEN,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.WHITE,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        marginTop: 10,
    },
    priceText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: '20%',
    },
    price: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        alignSelf: 'center',
        marginTop: 10,

    },

    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
        marginBottom: 5,
    },
    addressWrapper: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    },
    addressInfoWrapper: {
        flex: 1,
        marginLeft: 10,
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
    orderContentWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
        marginBottom: 10,
    },
    imgWrapper: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain'
    },
    orderInfoWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        flexWrap: 'wrap',
        maxWidth: '90%',
        marginBottom: 5,
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginBottom: 10,

    },
    orderTimeWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginBottom: 10,
    },
    boldText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        width: '35%',
    },
    orderIdText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        width: '65%',
        textAlign: 'right',
        flexWrap: 'wrap'
    },
    orderDateTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        width: '40%',
    },
    orderDate: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        width: '60%',
        textAlign: 'right',
        flexWrap: 'wrap'
    },
    btn: {
        height: 45,
        marginVertical: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
});

export default OrderDetailSalesmanScreen;