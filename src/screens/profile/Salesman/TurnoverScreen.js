import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas, WIDTH } from '../../../res';
import { BackBtn, GradientText } from '../../../components';
import { LineChart } from 'react-native-chart-kit';
import { getFirestore, collection, getDocs, where, query, limit, Timestamp } from 'firebase/firestore';
//dummy:
import productData from '../../home/productData';
//tạm thời code giao diện trước, vì màn hình này cần phải xử lý dữ liệu rồi mới hiển thị được
//dummy data:
const TotalStatisticData = [
    {
        id: 1,
        title: 'Tổng đơn bán',
        value: 0,
    },
    {
        id: 2,
        title: 'Tổng số lượng',
        value: 0,
    },
    {
        id: 3,
        title: 'Tổng doanh thu 6 tháng',
        value: 0,
    },
    {
        id: 4,
        title: 'Tổng lợi nhuận 6 tháng',
        value: 0,
    },
];


const TurnoverScreen = ({ navigation, route }) => {
    const db = getFirestore();
    const shopId = route?.params?.shopId;

    const [orderLoading, setOrderLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    const [products, setProducts] = useState(null);

    const [months, setMonths] = useState(['T1', 'T2', 'T3', 'T4', 'T5', 'T6']);
    const [monthTurnover, setMonthTurnover] = useState([100, 200, 300, 400, 500, 600]);

    const [monthStatistic, setMonthStatistic] = useState(null); //format: [{month: 1, totalTurnover, totalProfit, totalSuccessfulOrder, totalQuantity}, ...]
    const [totalStatistic, setTotalStatistic] = useState(TotalStatisticData);

    //LẤY CÁC ORDER ĐÃ BÁN ĐƯỢC
    useEffect(() => {
        getAllOrderByShopId();
    }, []);
    const getAllOrderByShopId = async () => {
        try {
            setOrderLoading(true);
            //mảng các order có received == true (đã giao hàng thành công)
            const arr = [];
            const snapshot = await getDocs(query(collection(db, 'order'), where('product.shop.shopId', '==', shopId), where('received', '==', true), where('orderCancellation', '==', null)));
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                data.product.discountPrice = data.product.salePrice * (1 - data.product.discount.percent);
                arr.push(data);
            });
            setOrders(arr);
            setOrderLoading(false);

        } catch (error) {
            console.log(error);
        }
    };

    //TÍNH DOANH THU 6 THÁNG GẦN NHẤT
    useEffect(() => {
        if (orders !== null) {
            getTurnover();
        }
    }, [orders]);
    const getTurnover = () => {
        const currentDate = new Date();
        //tháng phải cộng 1 vì T1 = 0
        const month = currentDate.getMonth() + 1;
        const monthArr = [];
        const monthStatisticArr = [];
        //count để đếm đủ 6 tháng gần nhất thì ngưng vòng for
        let monthCount = 1;
        let monthStatisticCount = 1;
        //dữ liệu mảng label tháng
        for (let i = month; i >= 0; i--) {
            if (monthCount === 7)
                break;
            //nếu đang ở tháng 1 trừ tiếp i thì đến tháng 12
            if (i === 0)
                i = 12;
            monthArr.push(`T${i}`);
            monthCount += 1;
        };
        setMonths(monthArr.reverse());
        //dữ liệu doanh thu tương ứng với mảng tháng bên trên
        for (let i = month; i >= 0; i--) {
            if (monthStatisticCount === 7)
                break;
            if (i === 0)
                i = 12;
            //thống kê của tháng thứ i
            let totalTurnover = 0;
            let totalProfit = 0;
            let totalSuccessfulOrder = 0;
            let totalQuantity = 0;
            orders.forEach((item) => {
                let date = new Timestamp(item.deliveryDate.seconds, item.deliveryDate.nanoseconds);
                date = date.toDate().getMonth() + 1;
                if (date === i) {
                    totalTurnover += item.product.salePrice;
                    totalProfit += item.product.salePrice - item.product.discountPrice;
                    totalSuccessfulOrder += 1;
                    totalQuantity += item.quantity;
                }
            })
            monthStatisticArr.push({ month: i, totalTurnover, totalProfit, totalSuccessfulOrder, totalQuantity });
            monthStatisticCount += 1;
        };
        setMonthStatistic(monthStatisticArr.reverse());
    };
    //TÍNH TỔNG SỐ LIỆU TRONG 6 THÁNG GẦN NHẤT
    useEffect(() => {
        if (monthStatistic !== null) {
            //Mảng tổng doanh thu mỗi tháng
            setMonthTurnover(() => {
                return monthStatistic.map((item) => item.totalTurnover);
            });
            //Tổng đơn thành công 6 tháng
            const totalOrder = monthStatistic.reduce((total, item) => {
                return total + item.totalSuccessfulOrder;
            }, 0);
            //Tổng số lượng bán được 6 tháng
            const totalQuantity = monthStatistic.reduce((total, item) => {
                return total + item.totalQuantity;
            }, 0);
            //Tổng doanh thu 6 tháng
            const totalTurnover = monthStatistic.reduce((total, item) => {
                return total + item.totalTurnover;
            }, 0);
            //Tổng lợi nhuận 6 tháng
            const totalProfit = monthStatistic.reduce((total, item) => {
                return total + item.totalProfit;
            }, 0);
            setTotalStatistic(prev => {
                return prev.map((item) => {
                    switch (item.id) {
                        case 1:
                            return { ...item, value: totalOrder };
                        case 2:
                            return { ...item, value: totalQuantity };
                        case 3:
                            return { ...item, value: totalTurnover };
                        case 4:
                            return { ...item, value: totalProfit };
                    }
                })
            })
        }
    }, [monthStatistic])

    //LẤY TOP 3 SẢN PHẨM BÁN NHIỀU NHẤT
    useEffect(() => {
        if (shopId !== undefined)
            getTopSaleProductByShopId();
    }, []);
    const getTopSaleProductByShopId = async () => {
        try {
            setProductLoading(true);
            let arr = [];
            const snapshot = await getDocs(query(collection(db, 'product'), where('shop.shopId', '==', shopId), limit(3)));
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                data.discountPrice = data.salePrice * (1 - data.discount.percent);
                arr.push(data);
            });
            const results = arr.sort((productA, productB) => {
                return productA.soldQuantity - productB.soldQuantity;
            }).reverse();
            setProducts(results);
            setProductLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const renderTopProduct = () => {
        return products.map((item) => {
            return (
                <View key={item.id} style={styles.productContentWrapper}>
                    {/* ảnh sp */}
                    <View style={styles.imgWrapper}>
                        <Image style={styles.img} source={{ uri: item.img[0] }}></Image>
                    </View>
                    {/* info sp */}
                    <View style={styles.productInfoWrapper}>
                        <Text style={styles.productName}>{item.name}</Text>
                        {/* số lượng  */}
                        <Text style={[styles.text, { marginBottom: 5 }]}>Đã bán: {item.soldQuantity}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.text}>Giá bán: </Text>
                            <Text style={styles.discountPrice}>{numberWithCommas(item.salePrice)} đ</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Báo cáo doanh số</Text>
            </View>
            <ScrollView>
                <View style={styles.chartTitleWrapper}>
                    <Text style={styles.chartTitleText}>Năm 2022</Text>
                    <Text style={styles.chartTitleText}>6 tháng gần nhất</Text>
                </View>
                {
                    orderLoading ?
                        <View>
                            <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                        </View>
                        :
                        <LineChart
                            data={{
                                labels: months,
                                datasets: [{ data: monthTurnover }],
                                legend: ["Doanh thu mỗi tháng"]
                            }}
                            width={WIDTH - 2 * DIMENSION.MARGIN_HORIZONTAL} // from react-native
                            height={220}
                            yAxisLabel="đ"
                            yAxisSuffix="đ"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 10,
                                alignSelf: 'center',
                                borderRadius: 16
                            }}
                        />
                }
                <View style={styles.statisticWrapper}>
                    {totalStatistic.map((item) => {
                        //money type
                        let newValue = item.id === 3 || item.id === 4 ? `${numberWithCommas(item.value)} đ` : item.value;

                        return (
                            <View key={item.id} style={styles.statisticItemWrapper}>
                                <GradientText style={[styles.statisticText, styles.statisticItemTitle]}>{item.title}</GradientText>
                                <GradientText style={styles.statisticText}>{newValue}</GradientText>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.chartWrapper}>
                    <GradientText style={[styles.statisticText, styles.chartTitle]}>Top 3 sản phẩm bán chạy nhất</GradientText>
                    {
                        productLoading ?
                            <View>
                                <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                            </View>
                            :
                            renderTopProduct()
                    }
                </View>
            </ScrollView>
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
        alignItems: 'center',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        marginLeft: 10,
    },
    chartTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    chartTitleText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
    },
    statisticWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    statisticItemWrapper: {
        height: 100,
        width: (WIDTH - 2 * DIMENSION.MARGIN_HORIZONTAL) / 2 - 10,
        margin: 5,
        backgroundColor: COLOR.EXTRA_LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    statisticItemTitle: {
        width: '70%',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 5,
    },
    statisticText: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TITLE,
        justifyContent: 'center',
        alignItems: 'center'
    },

    chartWrapper: {
        backgroundColor: COLOR.EXTRA_LIGHT_GREY,
        borderRadius: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        padding: 10,
        marginTop: 5,
    },
    chartTitle: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    // product item
    productContentWrapper: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
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
    productInfoWrapper: {
        flex: 1,
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
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
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
});

export default TurnoverScreen;