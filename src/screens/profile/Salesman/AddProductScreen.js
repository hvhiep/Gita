import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE, DIMENSION, WIDTH } from '../../../res';
import { BackBtn, FormInput, PrimaryBtn, DropDown } from '../../../components';
import { launchImageLibrary } from 'react-native-image-picker';


// Chiều rộng ảnh phải trừ đi margin trái phải của container lớn rồi chia 3 ra để có được 3 ảnh trên 1 hàng, cuối cùng trừ đi margin ngang của chính nó (do dùng hàm làm tròn nên trừ margin cứ cho lệch thêm lên 2 giá trị để cân bằng với số làm tròn)
const imageMarginHorizontal = 1;
const imageWidth = Math.round((WIDTH - 2 * DIMENSION.MARGIN_HORIZONTAL) / 3 - (imageMarginHorizontal * 2 + 2));


const AddProductScreen = ({ navigation }) => {

    // dummy data
    const discountData = [
        {
            id: 1,
            shopId: 2,
            name: 'Giảm giá toàn shop',
            percent: 0.2,
        },
        {
            id: 2,
            shopId: 2,
            name: 'Giảm giá hè',
            percent: 0.3,
        },
        {
            id: 3,
            shopId: 2,
            name: 'Giảm giá tựu trường',
            percent: 0.5,
        },
    ];
    const stringAdjData = [
        {
            label: 'Có',
            value: 1,
        },
        {
            label: 'Không',
            value: 0,
        },
    ]
    //dummy: Biến đối dữ liệu(chưa biết nên đổi ngay từ database hay trên giao diện? để xem sau...)
    //phải biến đổi dữ liệu về dạng {label: ,value: } trước khi cho vào DropDown
    const newDiscountData = discountData.map((item) => ({ label: `${item.name} (${item.percent * 100}%)`, value: item.id }))
    //discount dropdown
    const [discountOpen, setDiscountOpen] = useState(false);
    const [selectedDiscountValue, setSelectedDiscountValue] = useState(null);
    //ty chỉnh cần dropdown
    const [stringAdjOpen, setStringAdjOpen] = useState(false);
    const [selectedStringAdjValue, setSelectedStringAdjValue] = useState(null);


    //lấy ảnh
    const [images, setImages] = useState([]);
    // đặt biến để tối ưu tránh gọi .length nhiều lần, giảm performance
    const IMAGES_LIST_LENGTH = images.length;
    const handlePickImage = async () => {
        try {
            // gọi thư viện lấy ảnh
            const results = await launchImageLibrary({ selectionLimit: 0 });
            // cho các ảnh vào mảng state
            setImages(results?.assets)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => console.log(images))


    return (
        <View style={styles.container}>
            {/* 1.HEADER */}
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Thêm sản phẩm mới</Text>
            </View>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.contentWrapper}>
                            {/* IMAGES PICKER */}
                            {/* khi chưa có ảnh nào thì style nút bấm to */}
                            {IMAGES_LIST_LENGTH <= 0 &&
                                <TouchableOpacity style={styles.addImageBtn} onPress={handlePickImage}>
                                    <Icon name='camera' size={30} color={COLOR.SECOND_COLOR} />
                                    <Text style={styles.addImageText}>Thêm ảnh minh họa</Text>
                                </TouchableOpacity>
                            }
                            {/* IMAGES GALLERY */}
                            <View style={styles.imgList}>
                                {/* khi có ảnh thì style nút bấm nhỏ vừa với ảnh cho đẹp */}
                                {IMAGES_LIST_LENGTH > 0 &&
                                    <TouchableOpacity style={styles.addImageBtnSmall} onPress={handlePickImage}>
                                        <Icon name='camera' size={30} color={COLOR.SECOND_COLOR} />
                                    </TouchableOpacity>
                                }
                                {IMAGES_LIST_LENGTH > 0 && images.map((item, index) => {
                                    return (
                                        <Image
                                            key={index}
                                            style={styles.imgItem}
                                            source={item}
                                            resizeMode='cover'
                                        />
                                    )
                                })}

                            </View>

                            {/* INPUT FORM */}
                            <FormInput style={styles.form} title='Tên sản phẩm' type='small' />
                            <DropDown
                                containerStyle={styles.dropDown}
                                title='Giảm giá'
                                placeholder='Chọn mã giảm giá'
                                open={discountOpen}
                                selectedValue={selectedDiscountValue}
                                data={newDiscountData}
                                onOpen={() => setDiscountOpen(!discountOpen)}
                                onSelectItem={(value) => setSelectedDiscountValue(value)}
                            />
                            <FormInput style={styles.form} title='Giá gốc (VND)' type='small' />
                            <FormInput style={styles.form} title='Giá bán (VND)' type='small' />
                            <FormInput style={styles.form} title='Thương hiệu' type='small' />
                            <FormInput style={styles.form} title='Xuất xứ' type='small' />
                            <FormInput style={styles.form} title='Kiểu dáng' type='small' />
                            <FormInput style={styles.form} title='Kiểu sơn' type='small' />
                            <FormInput style={styles.form} title='Mặt đàn' type='small' />
                            <FormInput style={styles.form} title='Lưng &amp; Hông' type='small' />
                            <FormInput style={styles.form} title='Đầu đàn &amp; Cần' type='small' />
                            <FormInput style={styles.form} title='Ngựa đàn' type='small' />
                            <FormInput style={styles.form} title='Dây đàn' type='small' />
                            <DropDown
                                containerStyle={styles.dropDown}
                                title='Ty chỉnh cần'
                                placeholder='Chọn ty chỉnh cần'
                                open={stringAdjOpen}
                                selectedValue={selectedStringAdjValue}
                                data={stringAdjData}
                                onOpen={() => setStringAdjOpen(!stringAdjOpen)}
                                onSelectItem={(value) => setSelectedStringAdjValue(value)}
                            />
                            <FormInput style={styles.form} title='Bảo hành (Tháng)' type='small' />
                            <FormInput style={styles.form} title='EQ' type='small' />
                            <FormInput style={styles.form} title='Thông tin chi tiết' type='small' multiline={true} />
                            <PrimaryBtn style={styles.saveBtn} title='Thêm' type='small'></PrimaryBtn>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
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
    contentWrapper: {
        flex: 1,
    },
    addImageBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLOR.SECOND_COLOR,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        height: 150,
        justifyContent: 'center',
    },
    addImageBtnSmall: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLOR.SECOND_COLOR,
        marginHorizontal: imageMarginHorizontal,
        height: imageWidth,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImageText: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.SECOND_COLOR,
        fontSize: FONT_SIZE.SMALL_TITLE,
        marginLeft: 10,
    },
    imgList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    imgItem: {
        width: imageWidth,
        height: imageWidth,
        marginHorizontal: imageMarginHorizontal,
        marginBottom: 2,

    },
    form: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    dropDown: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 10,
    },
    saveBtn: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 10,
    },
});

export default AddProductScreen;