import React, { useState, useEffect } from 'react';
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

//firebase
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// chiều rộng của mỗi box sản phẩm
const cardWidth = Math.round(WIDTH / 2 - DIMENSION.MARGIN_HORIZONTAL * 1.5);

function Product({ productId, productInfo, onPress, style }) {

    const [firstImg, setFirstImg] = useState();
    useEffect(() => {
        getFirstProductImg();
    }, [])

    const getFirstProductImg = async () => {
        try {
            const storage = getStorage();
            const url = await getDownloadURL(ref(storage, productInfo.img[0]))
            if (url !== null)
                setFirstImg(url);
        } catch (error) {
            console.log('[Product] error: ', error.message);
        }
    }

    return (
        <TouchableOpacity style={[styles.container, style && style]} onPress={onPress}>
            <Image style={styles.img} source={{uri: firstImg}}></Image>
            <Text style={styles.productName}>{productInfo.name}</Text>
            <Text style={styles.price}>{numberWithCommas(productInfo.salePrice)}đ</Text>
            <View style={styles.wrapper}>
                <Rating
                    type='star'
                    ratingCount={5}
                    readonly
                    startingValue={productInfo.rating}
                    imageSize={12}
                />
                <Text style={styles.sold}>Đã bán {numFormatter(productInfo.soldQuantity)}</Text>
            </View>
            <View style={styles.location}>
                <Ionicons name='location' size={20} color={COLOR.BLACK} />
                <Text style={styles.locationText}>chưa làm :v</Text>
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
        width: cardWidth - 5,
        height: cardWidth - 5,
        resizeMode: 'contain',
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        alignSelf: 'center',
        textAlign: 'center',
        color: COLOR.MAIN_COLOR,
        marginTop: 4,
        flex: 1
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
        justifyContent: 'space-around',
        alignItems: 'center'
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