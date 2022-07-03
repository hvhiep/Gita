import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    FlatList,
    Animated,
    Modal,
} from 'react-native';
import { BackBtn, Message } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Feather';
import { COLOR, DIMENSION, FONT_SIZE, numberWithCommas, numFormatter, specificationsFormat, WIDTH } from '../../res';
import shopLogo from '../../assets/images/shopLogo.png';
import productData from './productData';

import { Rating } from 'react-native-ratings';
import { Product } from '../../components';
import { Badge } from '@rneui/themed';

//dummy: 
const shopData = {
    id: 1,
    userId: 1,
    name: 'Ba Đờn',
    avatarImg: shopLogo,
    backgroundImg: '',
    city: 'Tp Hồ Chí Minh',
    district: 'Thủ Đức',
    ward: 'Linh Trung',
    address: '41A đường Trần Hưng Đạo',
};

const discountData = [
    {
        id: 1,
        name: 'Giảm giá hè',
        percent: 0.21,
        startDate: '',
        endDate: '',
    },
    {
        id: 2,
        name: 'Giảm giá ngày độc thân 11/11',
        percent: 0.32,
        startDate: '',
        endDate: '',
    },
    {
        id: 3,
        name: 'Giảm giá giữa tháng',
        percent: 0.32,
        startDate: '',
        endDate: '',
    },
];

function ProductDetailScreen({ navigation, route }) {
    const productId = route?.params?.productId;

    const [currentImg, setCurrentImg] = useState(1);
    const [isBottomModalShow, setIsBottomModalShow] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [isMessageShowed, setIsMessageShowed] = useState(false);

    // lấy sản phẩm từ id truyền qua navigation
    const product = productData.find((item) => 1 === item.id);

    //tính giá sau khi đã giảm(giá giảm = giá bán - phần trăm khuyến mãi, tạm thời cứ tính đơn giản thế này đã)
    const discount = discountData.find((item) => item.id === product.discountId)
    product.discountPrice = Math.round(product.salePrice * (1 - discount.percent));

    // animation cho header
    const ScrollViewScrollY = useRef(new Animated.Value(0)).current;
    const animatedHeaderBackgroundColor = ScrollViewScrollY.interpolate({
        inputRange: [0, 300],
        outputRange: ['transparent', COLOR.WHITE],
        extrapolate: 'clamp'
    });
    const animatedHeaderBorderWidth = ScrollViewScrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 0.5],
        extrapolate: 'clamp'
    });
    
    const handleAddToCart = () => {
        // thêm sản phẩm mới vào cart của user

        // hiển thị modal thông báo thành công
        setIsMessageShowed(!isMessageShowed);
    }
    const handleMessageShowed = () => {
        setTimeout(() => {
            setIsMessageShowed(!isMessageShowed);
            setIsBottomModalShow(!isBottomModalShow);
            setOrderQuantity(1);
        }, 1000)
    }

    return (
        <View style={styles.container}>
            {/* A. HEADER */}
            <Animated.View style={[styles.header, { backgroundColor: animatedHeaderBackgroundColor, borderBottomWidth: animatedHeaderBorderWidth }]}>
                <BackBtn onPress={() => navigation.goBack()} />
                <TouchableOpacity style={styles.cart}>
                    <Icon name='shopping-cart' size={20} color={COLOR.MAIN_COLOR} />
                    <Badge containerStyle={styles.cartBadge} value={25} badgeStyle={{ backgroundColor: COLOR.SECOND_COLOR }}></Badge>
                </TouchableOpacity>
            </Animated.View>
            <Animated.ScrollView
                style={styles.scrollView}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: ScrollViewScrollY } } }], { useNativeDriver: false })}
            >

                {/* B. CONTENT */}
                {/* 1. Carousel ảnh sản phẩm */}
                <View style={styles.carousel}>
                    <FlatList
                        style={styles.listImg}
                        data={product.img}
                        renderItem={({ item }) => {
                            return (
                                <View key={item}>
                                    <Image source={item} style={styles.img} />
                                </View>
                            )
                        }}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onMomentumScrollEnd={(event) => {
                            setCurrentImg(Math.round(event.nativeEvent.contentOffset.x / WIDTH) + 1)
                        }}
                    />
                    <Text style={styles.pagination}>{currentImg}/{product.img.length}</Text>
                </View>
                {/* 2. Thông tin giá, tên sp*/}
                <View style={styles.sectionFirst}>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.discountPrice}>{numberWithCommas(product.discountPrice)} đ</Text>
                        <View style={styles.ratingWrapper}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                readonly
                                startingValue={product.stars}
                                imageSize={12}
                            />
                            <Text style={styles.rating}>{product.stars}</Text>
                        </View>
                    </View>
                    <View style={styles.salePriceWrapper}>
                        <Text style={styles.salePrice}>{numberWithCommas(product.salePrice)} đ</Text>
                        <Text style={styles.discountPercent}>-{discount.percent * 100}%</Text>

                    </View>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.soldQuantity}>{numFormatter(product.soldQuantity)} Đã bán</Text>
                    </View>
                </View>
                {/* 3. Thông tin người bán */}
                <View style={styles.section}>
                    <View style={styles.shopWrapper}>
                        <View style={styles.shopInfoWrapper}>
                            <TouchableOpacity style={styles.shopLogo}>
                                <Image style={styles.shopLogoImg} source={shopLogo} ></Image>
                            </TouchableOpacity>
                            <View style={styles.shopInfo}>
                                <Text style={styles.shopName}>{shopData.name}</Text>
                                <Text style={styles.shopLocation}>{shopData.city}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.shopBtn}>
                            <Text style={styles.shopBtnText}>Ghé shop</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shopDetailWrapper}>
                        <View style={[styles.shopDetail, { marginLeft: 0 }]}>
                            <Text style={styles.shopDetailNumber}>20</Text>
                            <Text style={styles.shopDetailText}>Sản phẩm</Text>
                        </View>
                        <View style={styles.shopDetail}>
                            <Text style={styles.shopDetailNumber}>4.5</Text>
                            <Text style={styles.shopDetailText}>Đánh giá</Text>
                        </View>
                        <View style={styles.shopDetail}>
                            <Text style={styles.shopDetailNumber}>56%</Text>
                            <Text style={styles.shopDetailText}>Phản hồi chat</Text>
                        </View>
                    </View>
                </View>
                {/* 4. Carousel các sp khác của shop */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Các sản phẩm khác của Shop</Text>
                    {/* <FlatList
                        style={styles.listShopProduct}
                        data={productData}
                        renderItem={({ item }) => {
                            return (
                                <Product
                                    style={styles.product}
                                    key={item.id}
                                    item={item}
                                // onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    /> */}
                </View>
                {/* 5. Thông số kĩ thuật / specifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
                    <View style={styles.table}>
                        {Object.entries(product.specifications).map(([key, value], index) => {
                            let val = value;
                            if (key === 'stringAdjustment') {
                                val = value ? 'Có' : 'Không'
                            }
                            return (
                                <View key={key} style={styles.tableRow}>
                                    <Text style={styles.tableColumn1}>{specificationsFormat(index)}</Text>
                                    <Text style={styles.tableColumn2}>{val}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
                {/* 6. Thông tin chi tiết */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
                    <Text style={styles.information}>{product.information}</Text>
                </View>
            </Animated.ScrollView>

            {/* C. FOOTER */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerSmallBtn}>
                    <Icon2 name='store' size={20} color={COLOR.SECOND_COLOR} />
                    <Text style={styles.smallBtnText}>Gian hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerSmallBtn}>
                    <Icon name='commenting' size={22} color={COLOR.SECOND_COLOR} />
                    <Text style={styles.smallBtnText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerOrderBtn}
                    onPress={() => setIsBottomModalShow(!isBottomModalShow)}
                >
                    <Icon name='cart-plus' size={30} color={COLOR.WHITE} />
                    <Text style={styles.orderBtnText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>

            {/* D. BOTTOM MODAL */}
            <Modal
                animationType='fade'
                visible={isBottomModalShow}
                transparent
            >
                <View style={styles.modal}>
                    <Pressable
                        style={styles.modalOutsideBg}
                        onPress={() => setIsBottomModalShow(!isBottomModalShow)}
                    ></Pressable>
                    <View style={styles.sheetWrapper}>
                        <TouchableOpacity style={styles.sheetClose} onPress={() => setIsBottomModalShow(!isBottomModalShow)}>
                            <Icon name='remove' size={20} color={COLOR.GREY}></Icon>
                        </TouchableOpacity>
                        <View style={styles.sheetHeaderWrapper}>
                            <View style={styles.sheetImgWrapper}>
                                <Image style={styles.sheetImg} source={product.img[0]} />
                            </View>
                            <View style={styles.sheetInfoWrapper}>
                                <View style={styles.sheetHeaderInfoWrapper}>
                                    <Text style={styles.discountPrice}>{numberWithCommas(product.discountPrice)} đ</Text>
                                    <View style={styles.salePriceWrapper}>
                                        <Text style={styles.salePrice}>{numberWithCommas(product.salePrice)} đ</Text>
                                        <Text style={styles.discountPercent}>-{discount.percent * 100}%</Text>
                                    </View>
                                </View>
                                <View style={styles.sheetQuantityWrapper}>
                                    <Text style={styles.sheetQuantityText}>Số lượng</Text>
                                    <View style={styles.sheetQuantity}>
                                        <TouchableOpacity
                                            style={styles.quantityBtn}
                                            onPress={() => setOrderQuantity(prev => {
                                                if (prev <= 1)
                                                    return prev
                                                return prev - 1
                                            })}
                                        >
                                            <Icon3 name='minus' size={20} color={COLOR.BLACK} />
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{orderQuantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityBtn}
                                            onPress={() => setOrderQuantity(prev => prev + 1)}
                                        >
                                            <Icon3 name='plus' size={20} color={COLOR.BLACK} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sheetBtn}>
                            <TouchableOpacity
                                style={styles.footerOrderBtn}
                                onPress={handleAddToCart}
                            >
                                <Icon name='cart-plus' size={30} color={COLOR.WHITE} />
                                <Text style={styles.orderBtnText}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Thông báo thêm vào giỏ hàng thành công */}
            <Message
                state='success'
                content='Thêm vào giỏ hàng thành công'
                visible={isMessageShowed}
                onShow={handleMessageShowed}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: COLOR.BACKGROUND_GREY,
        flex: 1,
    },
    //header
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        width: '100%',
        borderBottomColor: COLOR.LIGHT_GREY
    },
    cart: {
        width: 45,
        padding: 10,
        borderRadius: 50,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    // carousel ảnh sản phẩm
    carousel: {
        height: 400,
        width: '100%',
    },
    listImg: {
        height: '100%',
        width: '100%',
    },
    img: {
        height: '100%',
        width: WIDTH,
        resizeMode: 'contain',
    },
    pagination: {
        position: 'absolute',
        left: 14,
        bottom: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 15,
        backgroundColor: COLOR.GREY,
        color: COLOR.WHITE
    },

    // section 1
    sectionFirst: {
        backgroundColor: COLOR.BACKGROUND_WHITE,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    priceWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    discountPrice: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.BIG_TITLE,

    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    rating: {
        marginLeft: 5,
        fontFamily: 'Montserrat-Medium',
        color: COLOR.YELLOW,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
    salePriceWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    salePrice: {
        fontFamily: 'Montserrat-Medium',
        textDecorationLine: 'line-through',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
    discountPercent: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productName: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TITLE,
        flexWrap: 'wrap',
        maxWidth: '75%'
    },
    soldQuantity: {
        fontFamily: 'Montserrat-Medium',
        color: COLOR.MAIN_COLOR,
        fontSize: FONT_SIZE.NORMAL_TEXT,
    },

    // section 2
    section: {
        marginTop: 10,
        backgroundColor: COLOR.BACKGROUND_WHITE,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    shopWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    shopInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shopLogo: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'grey'
    },
    shopLogoImg: {
        borderRadius: 50,
        width: 70,
        height: 70
    },
    shopInfo: {
        marginLeft: 5,
    },
    shopName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    shopLocation: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    shopBtn: {
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: COLOR.BACKGROUND_GREY,
    },
    shopBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.SECOND_COLOR
    },
    shopDetailWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
    },
    shopDetail: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    shopDetailNumber: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.SECOND_COLOR
    },
    shopDetailText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.SMALL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginLeft: 4,
    },

    // section 3
    sectionTitle: {
        marginTop: 15,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.SMALL_TITLE,
        color: COLOR.MAIN_COLOR,
    },
    listShopProduct: {
        width: '100%',
        marginBottom: 15,
        marginTop: 5,
    },
    product: {
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GREY,
        marginRight: 10,
    },
    // section 4
    table: {
        marginTop: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLOR.MAIN_COLOR,
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    tableColumn1: {
        width: '30%',
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    tableColumn2: {
        width: '70%',
        marginLeft: 8,
        flexWrap: 'wrap',
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
    },
    //section 5
    information: {
        fontFamily: 'Montserrat-Regular',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR,
        marginTop: 10,
        marginBottom: 15,
        lineHeight: 30
    },

    //FOOTER
    footer: {
        borderTopWidth: 0.5,
        borderTopColor: COLOR.UNSELECTED,
        backgroundColor: COLOR.BACKGROUND_WHITE,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    footerSmallBtn: {
        alignItems: 'center',
        marginRight: 30

    },
    smallBtnText: {
        fontFamily: 'Montserrat-Medium',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.SMALL_TEXT,

    },
    footerOrderBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: COLOR.SECOND_COLOR,
        borderRadius: 10,

    },
    orderBtnText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.WHITE,
        fontSize: FONT_SIZE.SMALL_TEXT,
        marginLeft: 15,
    },
    modal: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_MODAL,
    },
    modalOutsideBg: {
        flex: 1,
    },
    sheetWrapper: {
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetClose: {
        padding: 5,
        borderRadius: 50,
        alignSelf: 'flex-end',
    },
    sheetHeaderWrapper: {
        flexDirection: 'row',

    },
    sheetImgWrapper: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GREY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sheetImg: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    sheetInfoWrapper: {
        marginLeft: 10,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    sheetHeaderInfoWrapper: {

    },
    sheetQuantityWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    sheetQuantityText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.MAIN_COLOR
    },
    sheetQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40,
    },
    quantityBtn: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 5,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityText: {
        marginHorizontal: 15,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
        color: COLOR.MAIN_COLOR
    },
    sheetBtn: {
        flexDirection: 'row',
        marginVertical: 20,
    }
})

export default ProductDetailScreen;