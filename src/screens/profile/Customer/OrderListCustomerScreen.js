import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas, orderStatusLookup } from '../../../res';
import { BackBtn } from '../../../components';
import { getFirestore, getDocs, collection, where, query, onSnapshot, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
//dummy:
import orderData from '../../cart/orderData';

const OrderListCustomerScreen = ({ navigation }) => {
    const user = useSelector(state => state.user);
    const db = getFirestore();

    const sectionTitleList = [
        'Tất cả',
        'Chờ xác nhận',
        'Chờ vận chuyển',
        'Chờ giao hàng',
        'Đã giao hàng',
        'Đơn đã hủy',
    ];
    const [loading, setLoading] = useState(true);
    const [sectionTitle, setSectionTitle] = useState(0);
    const [filterOrderData, setFilterOrderData] = useState([]);
    const [initialOrderData, setInitialOrderData] = useState([]);

    useEffect(() => {
        setLoading(true);
        //lấy những orders không nằm trong giỏ hàng
        const unsubscribe = onSnapshot(query(collection(db, 'order'), where('userId', '==', user.id), where('status', '!=', -1)), (snapshot) => {
            const arr = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
                arr.push({ ...data })
            })
            setInitialOrderData(arr);
            setFilterOrderData(arr);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    // logic hiển thị danh sách item trong flatlist có status đúng với section đã chọn phía trên
    useEffect(() => {
        setFilterOrderData(prev => {
            if (sectionTitle === 0)
                return initialOrderData;
            return initialOrderData.filter((item) => item.status === sectionTitle - 1);
            // phải trừ 1 vì sectionTile có status là 'Tất cả', cái mà không thực sự tồn tại trong database,
            // nên index so sánh sẽ lệch 1 đơn vị
        })
    }, [sectionTitle])

    const renderSectionTitle = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.sectionTitleItem}
                onPress={() => setSectionTitle(index)}
            >
                <Text style={[styles.sectionTitleItemText, sectionTitle === index && { color: COLOR.SECOND_COLOR, fontFamily: 'Montserrat-Bold' }]}>{item}</Text>
            </TouchableOpacity>
        )
    };

    const renderOrderList = ({ item, index }) => {

        const orderItemStatus = orderStatusLookup.find((value) => value.id === item.status);
        const date = new Timestamp(item.orderDate.seconds, item.orderDate.nanoseconds);
        return (
            <View key={item.id} style={styles.orderItem}>
                <View style={styles.orderItemHeader}>
                    <TouchableOpacity style={styles.orderItemHeaderTextLeft} onPress={() => navigation.navigate('OrderDetailCustomer', { orderId: item.id })}>
                        <Text style={styles.orderId}>Mã đơn hàng: {item.id}</Text>
                        <Text style={styles.orderDate}>Ngày đặt hàng: {date.toDate().toISOString()}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.orderItemStatus, orderItemStatus && { backgroundColor: orderItemStatus.color }]}>{orderItemStatus.title}</Text>
                </View>
                <View style={styles.orderContentWrapper}>
                    {/* ảnh sp */}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.img} source={{ uri: item.product.img[0] }}></Image>
                    </View>
                    {/* info sp */}
                    <View style={styles.orderInfoWrapper}>
                        <Text style={styles.productName}>{item.product.name}</Text>
                        {/* số lượng  */}
                        <Text style={styles.quantityText}>Số lượng: {item.quantity}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.quantityText}>Tổng cộng: </Text>
                            <Text style={styles.discountPrice}>{numberWithCommas(item.product.discountPrice * item.quantity)} đ</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Đơn hàng của tôi</Text>
            </View>
            <FlatList
                style={styles.sectionTitleList}
                data={sectionTitleList}
                horizontal
                renderItem={renderSectionTitle}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
            />
            {
                loading ?
                    <View>
                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                    </View>
                    :
                    <FlatList
                        style={styles.orderList}
                        data={filterOrderData}
                        renderItem={renderOrderList}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
            }
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
    sectionTitleList: {
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        paddingVertical: 10,
        height: 40,
        maxHeight: 40,
    },
    sectionTitleItem: {
        marginRight: 20,
    },
    sectionTitleItemText: {
        fontFamily: 'Montserrat-Medium',
        color: COLOR.GREY,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },

    orderList: {
        flex: 1,
        width: '100%'
    },
    orderItem: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        backgroundColor: COLOR.WHITE,
        marginBottom: 10,
        borderRadius: 10,
        // padding: 10,
    },
    orderItemHeader: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    orderItemHeaderTextLeft: {
        maxWidth: '72%',
    },
    orderId: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginBottom: 5,
        marginLeft: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 5,
    },
    orderDate: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginBottom: 5,
        marginLeft: DIMENSION.MARGIN_HORIZONTAL,

    },
    orderItemStatus: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: 'green',
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.WHITE,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 5,
        width: '28%',
        height: 40,
    },
    orderContentWrapper: {
        flexDirection: 'row',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
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
        width: '90%',
        height: '90%',
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
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.SECOND_COLOR,
    },
    quantityText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
});

export default OrderListCustomerScreen;