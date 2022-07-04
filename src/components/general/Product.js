import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { memo } from 'react';
import { COLOR, WIDTH, DIMENSION, FONT_SIZE, numberWithCommas, numFormatter } from '../../res';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';

// chiều rộng của mỗi box sản phẩm
const cardWidth = (WIDTH - DIMENSION.MARGIN_HORIZONTAL * 3) / 2;

function Product({ product, onPress, style, isEven }) {
    console.log('-----re-render: ', product.id)
    product.discountPrice = Math.round(product.salePrice * (1 - product.discount.percent));

    return (
        <TouchableOpacity style={[styles.container, style && style, isEven && { marginRight: DIMENSION.MARGIN_HORIZONTAL }]} onPress={onPress}>
            <Image style={styles.img} source={{ uri: product.img[0] }}></Image>
            <Text style={styles.productName}>{product.name}</Text>
            {/* Giá sau khi đã giảm  */}
            <View style={styles.priceWrapper}>
                <Text style={styles.discountPrice}>{numberWithCommas(product.discountPrice)}đ</Text>
                <Text style={styles.discountPercent}>-{product.discount.percent * 100}%</Text>
            </View>
            <View style={styles.wrapper}>
                <Rating
                    style={styles.rating}
                    type='star'
                    ratingCount={5}
                    readonly
                    startingValue={product.rating}
                    imageSize={12}
                />
                <Text style={styles.sold}>Đã bán {numFormatter(product.soldQuantity)}</Text>
            </View>
            <View style={styles.location}>
                <Ionicons name='location' size={20} color={COLOR.BLACK} />
                <Text style={styles.locationText}>{product.shop.city}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        marginVertical: DIMENSION.MARGIN_HORIZONTAL / 2,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        
    },
    img: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        height: cardWidth,
        resizeMode: 'cover',
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        marginHorizontal: 5,
        color: COLOR.MAIN_COLOR,
        marginTop: 4,
        flex: 1
    },
    priceWrapper: {
        marginHorizontal: 5,
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
    },
    discountPercent: {
        marginLeft: 5,
        borderRadius: 5,
        paddingHorizontal: 2,
        fontFamily: 'Montserrat-Bold',
        color: COLOR.WHITE,
        fontSize: FONT_SIZE.SMALL_TEXT,
        backgroundColor: 'red'
        
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    rating: {
    },
    sold: {
        fontFamily: 'Montserrat-Light',
        color: COLOR.MAIN_COLOR,
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
    },
    locationText: {
        fontFamily: 'Montserrat-Light',
        color: COLOR.MAIN_COLOR,
        marginLeft: 4,
    }
})

export default memo(Product);