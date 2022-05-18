import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable

} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { SearchResultScreen } from '../screens/home';
import { WIDTH, COLOR, FONT_SIZE, DIMENSION } from '../res';
import Icon from 'react-native-vector-icons/FontAwesome';
const FilterDrawer = createDrawerNavigator();

function FilterDrawerNavigation() {

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
                {
                    id: 3,
                    name: 'Bass'
                },
                {
                    id: 4,
                    name: 'Electric'
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
                    name: 'Tp Hồ Chí Minh'
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

    // Một box lựa chọn
    const SelectionBox = ({ detail, sectionId }) => {
        return (
            // Một box lựa chọn
            <Pressable
                key={detail.id}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? COLOR.WIDTH : COLOR.BACKGROUND_GREY
                    },
                    styles.selectionItem
                ]}
            >
                <Text style={styles.selectionText}>{detail.name}</Text>
            </Pressable>
        )
    }
    // ???????????????????? chưa làm phần highlight khi chọn 1 box

    //Nội dung trong drawer
    const CustomDrawerContent = (props) => {
        return (
            <View style={styles.customDrawer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bộ lọc</Text>
                </View>
                <DrawerContentScrollView style={styles.contentScrollView}>
                    {filterSectionData.map((item) => {
                        return (
                            <View key={item.id} style={styles.section}>
                                <Text style={styles.sectionTitle}>{item.title}</Text>
                                {/* Các lựa chọn của một section */}
                                <View style={styles.sectionSelection}>
                                    {item.detail.map((detail) => {
                                        return (<SelectionBox detail={detail} sectionId={item.id}/>)
                                    })}
                                </View>

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
                </DrawerContentScrollView>
            </View>
        )
    }

    return (
        <FilterDrawer.Navigator
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

    },
    sectionReadMore: {
        borderRadius: 10,
        height: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    sectionReadMoreIcon: {

    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: COLOR.UNSELECTED
    },
})

export default FilterDrawerNavigation;