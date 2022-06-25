import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Image
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION, numberWithCommas, WIDTH } from '../../../res';
import { BackBtn, GradientText } from '../../../components';
import { LineChart } from 'react-native-chart-kit';
//dummy:
import productData from '../../home/productData';

const TurnoverScreen = ({ navigation, route }) => {

    const shopId = route?.params?.shopId;
    const data = productData.filter((item) => item.shopId === shopId);

    //tạm thời code giao diện trước, vì màn hình này cần phải xử lý dữ liệu rồi mới hiển thị được
    //dummy data:
    const statisticData = [
        {
            id: 1,
            title: 'Tổng đơn bán',
            value: 2315,
        },
        {
            id: 2,
            title: 'Tổng đơn hủy',
            value: 25,
        },
        {
            id: 3,
            title: 'Tổng doanh thu năm',
            value: 105420000,
        },
        {
            id: 4,
            title: 'Tổng lợi nhuận năm',
            value: 50213000,
        },
    ];

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
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    100,
                                    200,
                                    300,
                                    50,
                                    12,
                                    66
                                ]
                            }
                        ]
                    }}
                    width={WIDTH - 2 * DIMENSION.MARGIN_HORIZONTAL} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
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
                <View style={styles.statisticWrapper}>
                    {statisticData.map((item) => {

                        //money type
                        let newValue = item.id === 3 || item.id === 4 ? `${numberWithCommas(item.value)} đ` : item.value

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
                    {data.map((item) => {
                        return (
                            <View key={item.id} style={styles.productContentWrapper}>
                                {/* ảnh sp */}
                                <View style={styles.imgWrapper}>
                                    <Image style={styles.img} source={item.img[0]}></Image>
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
                    })}
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
        alignSelf:'center',
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
        width: '90%',
        height: '90%',
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