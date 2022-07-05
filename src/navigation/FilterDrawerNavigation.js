import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    Animated,
    ScrollView,
    TouchableOpacity

} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SearchResultScreen } from '../screens/home';
import { WIDTH, COLOR, FONT_SIZE, DIMENSION } from '../res';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PrimaryBtn, SecondaryBtn } from '../components';
const FilterDrawer = createDrawerNavigator();
//FilterSection data
const filterSectionData = [
    {
        id: 1,
        title: 'Loại đàn',
        detail: [
            {
                id: 1,
                name: 'Acoustic'
            },
            {
                id: 2,
                name: 'Classic'
            },
        ],
    },
    {
        id: 2,
        title: 'Thương hiệu',
        detail: [
            {
                id: 1,
                name: 'Taylor'
            },
            {
                id: 2,
                name: 'Epiphone'
            },
            {
                id: 3,
                name: 'Martin'
            },
            {
                id: 4,
                name: 'Fender'
            },
            {
                id: 5,
                name: 'Takamine'
            },
            {
                id: 6,
                name: 'Yamaha'
            },
            {
                id: 7,
                name: 'Vietnam'
            },
        ],
    },
    {
        id: 3,
        title: 'EQ',
        detail: [
            {
                id: 1,
                name: 'Có'
            },
            {
                id: 2,
                name: 'Không'
            },
        ],
    },
    {
        id: 4,
        title: 'Nơi bán',
        detail: [
            {
                id: 1,
                name: 'Hà Nội'
            },
            {
                id: 2,
                name: 'Hồ Chí Minh'
            },
            {
                id: 3,
                name: 'Đà Nẵng'
            },
            {
                id: 4,
                name: 'Kon Tum'
            },
            {
                id: 5,
                name: 'Hải Phòng'
            },
            {
                id: 6,
                name: 'Bắc Ninh'
            },
        ],
    },
    {
        id: 5,
        title: 'Giá',
        detail: [
            {
                id: 1,
                name: 'Tối thiểu'
            },
            {
                id: 2,
                name: 'Tối đa'
            },
        ],
    },
];
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Tạm thời chưa làm chức năng này, vì tốn rất nhiều thời gian
function FilterDrawerNavigation() {
    //Nội dung trong drawer
    const CustomDrawerContent = () => {

        const [guitarType, setGuitarType] = useState([]);
        const [brand, setBrand] = useState([]);
        const [eq, setEq] = useState();
        const [location, setLocation] = useState([]);

        // logic chọn nhiều và bỏ chọn khi chọn một box cho từng loại section
        const handleSelectionBoxPress = (detail, sectionId) => {
            switch (sectionId) {
                case 1:
                    setGuitarType(prev => {
                        if (guitarType.includes(detail.id))
                            return prev.filter(item => item !== detail.id)
                        else
                            return [...prev, detail.id]
                    })
                    break;
                case 2:
                    setBrand(prev => {
                        if (brand.includes(detail.id))
                            return prev.filter(item => item !== detail.id)
                        else
                            return [...prev, detail.id]
                    })
                    break
                case 3:
                    setEq(detail.id)
                    break
                case 4:
                    setLocation(prev => {
                        if (location.includes(detail.id))
                            return prev.filter(item => item !== detail.id)
                        else
                            return [...prev, detail.id]
                    })
                    break
            }
        }
        // Một box lựa chọn
        const SelectionBox = ({ detail, sectionId }) => {
            let isSelected = false;
            switch (sectionId) {
                case 1:
                    if (guitarType.includes(detail.id))
                        isSelected = true;
                    break;
                case 2:
                    if (brand.includes(detail.id))
                        isSelected = true;
                    break;
                case 3:
                    if (eq === detail.id)
                        isSelected = true;
                    break
                case 4:
                    if (location.includes(detail.id))
                        isSelected = true;
                    break;
            }

            return (
                <Pressable
                    key={detail.id}
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? COLOR.WIDTH : COLOR.BACKGROUND_GREY },
                        isSelected && {
                            borderWidth: 1,
                            borderColor: COLOR.SECOND_COLOR
                        },
                        styles.selectionItem
                    ]}
                    onPress={() => handleSelectionBoxPress(detail, sectionId)}
                >
                    <Text style={[styles.selectionText, isSelected && { color: COLOR.SECOND_COLOR }]}>{detail.name}</Text>
                </Pressable>
            )
        }

        return (
            <View style={styles.customDrawer}>
                {/* phần header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bộ lọc</Text>
                </View>
                {/* phần content scrollview */}
                <ScrollView>
                    {/* Danh sách các section */}
                    {filterSectionData.map((item) => {
                        return (
                            <View key={item.id} style={styles.section}>
                                <Text style={styles.sectionTitle}>{item.title}</Text>

                                {/* Section về giá (id = 5) có kiểu render khác mấy cái còn lại nên phải dùng điều kiện để render */}
                                {item.id !== 5 ? (
                                    // Các lựa chọn của một section
                                    <View style={styles.sectionSelection}>
                                        {item.detail.map((detail) => {
                                            return (
                                                <SelectionBox key={detail.id} detail={detail} sectionId={item.id} />
                                            )
                                        })}
                                    </View>
                                ) : (
                                    // section giá
                                    <View style={styles.priceWrapper}>
                                        <TextInput keyboardType='numeric' style={styles.priceTextInput} placeholder='Tối thiểu' />
                                        <View style={styles.priceLine} />
                                        <TextInput keyboardType='numeric' style={styles.priceTextInput} placeholder='Tối đa' />
                                    </View>
                                )
                                }
                                {/* Nút xem thêm */}
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed ? COLOR.BACKGROUND_GREY : COLOR.WHITE
                                        },
                                        styles.sectionReadMore
                                    ]}
                                >
                                    <View>
                                        <Icon style={styles.sectionReadMoreIcon} name='angle-down' size={20} color={COLOR.UNSELECTED} />
                                    </View>
                                </Pressable>
                                <View style={styles.line}></View>
                            </View>
                        )
                    })}
                    {/* Các button */}
                    <View style={styles.btnWrapper}>
                    <SecondaryBtn title='Thiết lập lại' type='small'/>
                    <PrimaryBtn title='Xác nhận' type='small'/>
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <FilterDrawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: {
                    width: WIDTH * 0.85,
                }
            }}
        >
            {/* Các screen drawer quản lý */}
            <FilterDrawer.Screen
                name='SearchResult'
                component={SearchResultScreen}
                options={{
                    headerShown: false,
                }}
            />
        </FilterDrawer.Navigator>
    )
};

const styles = StyleSheet.create({
    customDrawer: {
        flex: 1,
    },
    text: {
        marginVertical: 20,
        borderWidth: 2,
        borderColor: 'yellow',
        width: '80%',
        height: 200,

    },
    header: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: COLOR.MAIN_COLOR,
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TITLE,
        color: COLOR.WHITE
    },
    contentScrollView: {

    },
    section: {
        width: '100%',
        paddingHorizontal: DIMENSION.MARGIN_HORIZONTAL,

    },
    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.BIG_TEXT,
        color: COLOR.MAIN_COLOR,
        marginVertical: 10,
    },
    sectionSelection: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    selectionItem: {
        padding: 10,
        borderRadius: 10,
        margin: 5

    },
    selectionText: {
        fontFamily: 'Montserrat-Medium',
        color: COLOR.GREY
    },
    sectionReadMore: {
        borderRadius: 10,
        height: 25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2
    },
    sectionReadMoreIcon: {

    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: COLOR.UNSELECTED
    },
    priceWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    priceTextInput: {
        width: '40%',
        fontFamily: 'Montserrat-Medium',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.GREY,
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.GREY,
    },
    priceLine: {
        width: '5%',
        height: 1,
        backgroundColor: COLOR.GREY
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL
    },
})

export default FilterDrawerNavigation;