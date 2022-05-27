import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Order } from '../../components';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';
// dump import
import { guitarImg, guitarImg2, guitarImg3 } from '../../assets';

function CartScreen() {


    //dump data: data = bảng 'Đơn hàng'(lấy số lượng) join 'Sản phẩm'(lấy id, tên, giá bán, ảnh) join 'Cửa hàng'(lấy id, tên cửa hàng) join 'Giảm giá'(lấy phần trăm giảm)
    //Tạm thời cứ giả sử tất cả thông tin cần để hiển thị đều có hết
    const orderData = [
        {
            id: 1,
            quantity: 2,
            product: {
                id: 1,
                name: 'Greg Bennett GD-100SGE',
                salePrice: 5660000,
                img: [
                    guitarImg,
                    guitarImg2,
                    guitarImg3
                ],
                discount: {
                    id: 1,
                    name: 'Giảm giá hè',
                    percent: 0.21,
                },
            },
            shop: {
                id: 1,
                name: 'Ba Đờn',
            },
        },
        {
            id: 2,
            quantity: 1,
            product: {
                id: 2,
                name: 'Greg Bennett 2',
                salePrice: 2660000,
                img: [
                    guitarImg,
                    guitarImg2,
                    guitarImg3
                ],
                discount: {
                    id: 1,
                    name: 'Giảm giá hè',
                    percent: 0.21,
                },
            },
            shop: {
                id: 2,
                name: 'Việt Thương',
            },
        },
        {
            id: 3,
            quantity: 1,
            product: {
                id: 2,
                name: 'Greg Bennett 2',
                salePrice: 2660000,
                img: [
                    guitarImg,
                    guitarImg2,
                    guitarImg3
                ],
                discount: {
                    id: 1,
                    name: 'Giảm giá hè',
                    percent: 0.21,
                },
            },
            shop: {
                id: 2,
                name: 'Việt Thương',
            },
        },
        {
            id: 4,
            quantity: 1,
            product: {
                id: 2,
                name: 'Greg Bennett 2',
                salePrice: 2660000,
                img: [
                    guitarImg,
                    guitarImg2,
                    guitarImg3
                ],
                discount: {
                    id: 1,
                    name: 'Giảm giá hè',
                    percent: 0.21,
                },
            },
            shop: {
                id: 2,
                name: 'Việt Thương',
            },
        },
        {
            id: 5,
            quantity: 2,
            product: {
                id: 1,
                name: 'Greg Bennett GD-100SGE',
                salePrice: 5660000,
                img: [
                    guitarImg,
                    guitarImg2,
                    guitarImg3
                ],
                discount: {
                    id: 1,
                    name: 'Giảm giá hè',
                    percent: 0.21,
                },
            },
            shop: {
                id: 1,
                name: 'Ba Đờn',
            },
        },
        {
            id: 6,
            quantity: 2,
            product: {
                id: 1,
                name: 'Greg Bennett GD-100SGE',
                salePrice: 5660000,
                img: [
                    guitarImg,
                    guitarImg2,
                    guitarImg3
                ],
                discount: {
                    id: 1,
                    name: 'Giảm giá hè',
                    percent: 0.21,
                },
            },
            shop: {
                id: 1,
                name: 'Ba Đờn',
            },
        },
    ];

    return (
        <View style={styles.container}>
            {/* A. HEADER */}
            <View style={styles.header}>
            <Text style={styles.headerText}>Giỏ hàng của tôi (6)</Text>
            </View>
            {/* B. CONTENT - FLATLIST */}
            <FlatList
                style={styles.listOrder}
                data={orderData}
                renderItem={({ item }) => {
                    return (
                        <Order key={item.id} item={item} />
                    )
                }}
                keyExtractor={(item) => item.id}
            />
            {/* C. FOOTER */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_GREY
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
    }
});

export default CartScreen;