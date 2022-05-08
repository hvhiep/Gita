import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { memo } from 'react';
import { COLOR, WIDTH, DIMENSION, FONT_SIZE, numberWithCommas } from '../../res';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';


const cardWidth = Math.round(WIDTH / 2 - DIMENSION.MARGIN_HORIZONTAL * 1.5);

function Product({ item }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.img} source={item.img}></Image>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{numberWithCommas(item.salePrice)}đ</Text>
            <View style={styles.wrapper}>
                <Rating
                    type='star'
                    ratingCount={5}
                    readonly
                    startingValue={item.stars}
                    imageSize={12}
                />
                <Text style={styles.sold}>Đã bán {item.soldQuantity}</Text>
            </View>
            <View style={styles.location}>
                <Ionicons name='location' size={20} color={COLOR.BLACK}/>
                <Text style={styles.locationText}>{item.location}</Text>
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
        width: cardWidth,
        height: cardWidth,
        resizeMode: 'contain',
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        alignSelf: 'center',
        textAlign: 'center',
        color: COLOR.MAIN_COLOR,
        marginTop: 4
    },
    price: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        alignSelf: 'center',
        marginVertical: 4,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    stars: {

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