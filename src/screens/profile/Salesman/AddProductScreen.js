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
    Image,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR, FONT_SIZE, DIMENSION, WIDTH } from '../../../res';
import { BackBtn, FormInput, PrimaryBtn, DropDown } from '../../../components';
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage } from 'react-native-flash-message';
//form handler
import { Formik } from 'formik';
import { ProductSchema } from '../../auth/validation';
import { getFirestore, collection, getDocs, query, where, getDoc, doc, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

// Chiều rộng ảnh phải trừ đi margin trái phải của container lớn rồi chia 3 ra để có được 3 ảnh trên 1 hàng, cuối cùng trừ đi margin ngang của chính nó (do dùng hàm làm tròn nên trừ margin cứ cho lệch thêm lên 2 giá trị để cân bằng với số làm tròn)
const imageMarginHorizontal = 1;
const imageWidth = Math.round((WIDTH - 2 * DIMENSION.MARGIN_HORIZONTAL) / 3 - (imageMarginHorizontal * 2 + 2));
const stringAdjData = [
    {
        label: 'Có',
        value: true,
    },
    {
        label: 'Không',
        value: false,
    },
];
const AddProductScreen = ({ navigation, route }) => {
    const shopId = route?.params?.shopId;
    const db = getFirestore();
    const storage = getStorage();

    const [discountLoading, setDiscountLoading] = useState(true);
    const [confirmBtnLoading, setConfirmBtnLoading] = useState(false);
    const [shop, setShop] = useState(null);
    const [initialDiscounts, setInitialDiscounts] = useState(null);
    //discount đã được biến đổi về dạng {label, value} để có thể hiển thị trong dropdown
    const [discounts, setDiscounts] = useState(null);
    const [images, setImages] = useState([]);
    //discount dropdown
    const [discountOpen, setDiscountOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    //ty chỉnh cần dropdown
    const [stringAdjOpen, setStringAdjOpen] = useState(false);
    const [selectedStringAdj, setSelectedStringAdj] = useState(null);

    //LẤY MẢNG CÁC DISCOUNT CỦA SHOP
    useEffect(() => {
        if (shopId !== undefined) {
            setDiscountLoading(true);
            getAllDiscountByShopId();
            getShopInfoByShopId();
        }
    }, []);
    const getAllDiscountByShopId = async () => {
        try {
            const arr = [];
            const snapshot = await getDocs(collection(db, `shop/${shopId}/discount`));
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                arr.push(data);
            });
            //phải biến đổi dữ liệu về dạng {label: ,value: } trước khi cho vào DropDown
            const newDiscountData = arr.map((item) => ({ label: `${item.name} (${item.percent * 100}%)`, value: item.id }));
            setInitialDiscounts(arr);
            setDiscounts(newDiscountData);
            setDiscountLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    //LẤY THÔNG TIN SHOP ĐỂ KHI ADD PRODUCT THÌ GẮN VÀO
    const getShopInfoByShopId = async () => {
        try {
            const snapshot = await getDoc(doc(db, `shop/${shopId}`));
            if (!snapshot.exists())
                throw 'Không có thông tin shop!';
            const data = snapshot.data();
            data.shopId = snapshot.id;
            setShop(data);
        } catch (error) {
            console.log(error);
        }
    };

    //LẤY ẢNH
    // đặt biến để tối ưu tránh gọi .length nhiều lần, giảm performance
    const IMAGES_LIST_LENGTH = images === undefined ? -1 : images.length;
    const handlePickImage = async () => {
        try {
            // gọi thư viện lấy ảnh
            const images = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                multiple: true
            })
            setImages(images);
        } catch (error) {
            console.log(error);
        }
    };
    //-------------------------------HANDLE

    //HANDLE FORM SUBMIT
    const handleFormSubmit = async (values) => {
        try {
            setConfirmBtnLoading(true);
            //lấy ra discount người bán đã chọn
            const discountData = initialDiscounts.find((item) => item.id === selectedDiscount.value);
            //chuyển đổi uri ảnh sang blob thì firestore mới chấp nhận
            const imagePromises = images.map(async (image) => {
                const temp = await fetch(image.path);
                const bytes = await temp.blob();
                const imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
                const snapshot = await uploadBytes(ref(storage, `client/${imgName}`), bytes);
                return snapshot.metadata.fullPath;
            })
            //image path
            const imagePathArr = await Promise.all(imagePromises);
            //chuyển đổi mảng image path thành mảng image path tuyệt đối (có chứa token truy cập do storage của firebase yêu cầu)
            const pathPromises = imagePathArr.map(async(path) => {
                return await getDownloadURL(ref(storage, path));
            })
            const imageURLs = await Promise.all(pathPromises);
            const data = {
                shop: shop,
                name: values.name,
                standardCost: parseInt(values.standardCost),
                salePrice: parseInt(values.salePrice),
                quantity: parseInt(values.quantity),
                soldQuantity: 0,
                rating: 0,
                type: 1,
                img: imageURLs,
                discount: discountData,
                specifications: {
                    brand: values.brand,
                    origin: values.origin,
                    shape: values.shape,
                    paintStyle: values.paintStyle,
                    top: values.top,
                    sideAndBack: values.sideAndBack,
                    headstockAndNeck: values.headstockAndNeck,
                    saddle: values.saddle,
                    string: values.string,
                    stringAdjustment: selectedStringAdj.value,
                    warranty: parseInt(values.warranty),
                    eq: values.eq,
                },
                information: values.information,
            };
            console.log('data: ', data);
            await addDoc(collection(db, 'product'), data);
            setConfirmBtnLoading(false);
            showMessage({
                message: 'Thêm sản phẩm mới thành công!',
                type: 'success',
                icon: 'auto',
                duration: 1500,
            });
        } catch (error) {
            console.log('[AddProduct]: ', error);
        }
    };


    //MAIN RETURN
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
                                            source={{ uri: item.path }}
                                            resizeMode='cover'
                                        />
                                    )
                                })}

                            </View>
                            {/* INPUT FORM */}
                            {
                                discountLoading ?
                                    <View>
                                        <ActivityIndicator size='large' color={COLOR.MAIN_COLOR} />
                                    </View>
                                    :
                                    <Formik
                                        validationSchema={ProductSchema}
                                        initialValues={{
                                            name: '',
                                            quantity: '',
                                            standardCost: '',
                                            salePrice: '',
                                            brand: '',
                                            origin: '',
                                            shape: '',
                                            paintStyle: '',
                                            top: '',
                                            sideAndBack: '',
                                            headstockAndNeck: '',
                                            saddle: '',
                                            string: '',
                                            warranty: '',
                                            eq: '',
                                            information: '',
                                            type: 0
                                        }}
                                        onSubmit={handleFormSubmit}
                                    >
                                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                            <>
                                                <FormInput
                                                    style={styles.form}
                                                    title='Tên sản phẩm'
                                                    type='small'
                                                    inputState={values.name}
                                                    onInputStateChange={handleChange('name')}
                                                    onBlur={handleBlur('name')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Số lượng'
                                                    type='small'
                                                    inputState={values.quantity}
                                                    keyboardType='numeric'
                                                    onInputStateChange={handleChange('quantity')}
                                                    onBlur={handleBlur('quantity')}
                                                />
                                                <DropDown
                                                    containerStyle={styles.dropDown}
                                                    title='Giảm giá'
                                                    placeholder='Chọn mã giảm giá'
                                                    open={discountOpen}
                                                    selectedValue={selectedDiscount}
                                                    data={discounts}
                                                    onOpen={() => setDiscountOpen(!discountOpen)}
                                                    onSelectItem={(item) => setSelectedDiscount(item)}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Giá gốc (VND)'
                                                    type='small'
                                                    keyboardType='numeric'
                                                    inputState={values.standardCost}
                                                    onInputStateChange={handleChange('standardCost')}
                                                    onBlur={handleBlur('standardCost')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Giá bán (VND)'
                                                    type='small'
                                                    keyboardType='numeric'
                                                    inputState={values.salePrice}
                                                    onInputStateChange={handleChange('salePrice')}
                                                    onBlur={handleBlur('salePrice')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Thương hiệu'
                                                    type='small'
                                                    inputState={values.brand}
                                                    onInputStateChange={handleChange('brand')}
                                                    onBlur={handleBlur('brand')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Xuất xứ'
                                                    type='small'
                                                    inputState={values.origin}
                                                    onInputStateChange={handleChange('origin')}
                                                    onBlur={handleBlur('origin')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Kiểu dáng'
                                                    type='small'
                                                    inputState={values.shape}
                                                    onInputStateChange={handleChange('shape')}
                                                    onBlur={handleBlur('shape')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Kiểu sơn'
                                                    type='small'
                                                    inputState={values.paintStyle}
                                                    onInputStateChange={handleChange('paintStyle')}
                                                    onBlur={handleBlur('paintStyle')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Mặt đàn'
                                                    type='small'
                                                    inputState={values.top}
                                                    onInputStateChange={handleChange('top')}
                                                    onBlur={handleBlur('top')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Lưng &amp; Hông'
                                                    type='small'
                                                    inputState={values.sideAndBack}
                                                    onInputStateChange={handleChange('sideAndBack')}
                                                    onBlur={handleBlur('sideAndBack')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Đầu đàn &amp; Cần'
                                                    type='small'
                                                    inputState={values.headstockAndNeck}
                                                    onInputStateChange={handleChange('headstockAndNeck')}
                                                    onBlur={handleBlur('headstockAndNeck')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Ngựa đàn'
                                                    type='small'
                                                    inputState={values.saddle}
                                                    onInputStateChange={handleChange('saddle')}
                                                    onBlur={handleBlur('saddle')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Dây đàn'
                                                    type='small'
                                                    inputState={values.string}
                                                    onInputStateChange={handleChange('string')}
                                                    onBlur={handleBlur('string')}
                                                />
                                                <DropDown
                                                    containerStyle={styles.dropDown}
                                                    title='Ty chỉnh cần'
                                                    placeholder='Chọn ty chỉnh cần'
                                                    open={stringAdjOpen}
                                                    selectedValue={selectedStringAdj}
                                                    data={stringAdjData}
                                                    onOpen={() => setStringAdjOpen(!stringAdjOpen)}
                                                    onSelectItem={(item) => setSelectedStringAdj(item)}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Bảo hành (Tháng)'
                                                    type='small'
                                                    keyboardType='numeric'
                                                    inputState={values.warranty}
                                                    onInputStateChange={handleChange('warranty')}
                                                    onBlur={handleBlur('warranty')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='EQ'
                                                    type='small'
                                                    inputState={values.eq}
                                                    onInputStateChange={handleChange('eq')}
                                                    onBlur={handleBlur('eq')}
                                                />
                                                <FormInput
                                                    style={styles.form}
                                                    title='Thông tin chi tiết'
                                                    type='small'
                                                    multiline={true}
                                                    inputState={values.information}
                                                    onInputStateChange={handleChange('information')}
                                                    onBlur={handleBlur('information')} />
                                                {(errors && (touched.name || touched.standardCost || touched.salePrice || touched.brand || touched.origin || touched.shape || touched.paintStyle || touched.top || touched.sideAndBack || touched.headstockAndNeck || touched.saddle || touched.string || touched.warranty || touched.eq || touched.information) && values.information === '') ? (
                                                    <Text style={styles.errorText}>Bắt buộc nhập đầy đủ các trường!</Text>
                                                ) : null}
                                                <PrimaryBtn
                                                    style={styles.saveBtn}
                                                    title='Thêm'
                                                    type='small'
                                                    onPress={handleSubmit}
                                                    isLoading={confirmBtnLoading}
                                                     />
                                            </>
                                        )}
                                    </Formik>
                            }

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