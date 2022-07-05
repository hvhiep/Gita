import React, { useState, useEffect, useRef, memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    FlatList
} from 'react-native';
import { COLOR, WIDTH, DIMENSION } from '../../res';

const Banner = ({ data }) => {

    const bannerRef = useRef();
    const [bannerCurrentIndex, setBannerCurrentIndex] = useState(0);
    const bannerScrollX = useRef(new Animated.Value(0));
    // logic tự động scroll banner
    useEffect(() => {
        // console.log('-------------------interval')
        // khởi tạo interval
        const interval = setInterval(() => {
            setBannerCurrentIndex(prev => {
                // chỉ cộng thêm khi không vượt quá độ dài mảng
                if (prev < data.length - 1)
                    return prev + 1;
                return 0;
            })
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    });
    useEffect(() => {
        bannerRef.current.scrollToOffset({ offset: bannerCurrentIndex * (WIDTH - DIMENSION.MARGIN_HORIZONTAL * 2), animated: true })
    }, [bannerCurrentIndex])

    return (
        <View>
            <FlatList
                ref={bannerRef}
                style={styles.list}
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item} style={styles.bannerItem}>
                            <Image style={styles.bannerImg} source={{ uri: item }} resizeMode='contain' />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: bannerScrollX.current } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            />
            {/* indicator cho banner */}
            <View style={styles.indicatorWrapper}>
                {data.map((item, index) => {

                    const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];
                    const dotWidth = bannerScrollX.current.interpolate({
                        inputRange,
                        outputRange: [6, 15, 6],
                        extrapolate: 'clamp'
                    });
                    const opacity = bannerScrollX.current.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp'
                    })
                    return (
                        <Animated.View key={item} style={[styles.indicator, { width: dotWidth, opacity }]} />
                    )
                })}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    // banner style 
    list: {
        marginHorizontal: DIMENSION.MARGIN_HORIZONTAL,
    },
    bannerItem: {
        height: 200,
        width: WIDTH - DIMENSION.MARGIN_HORIZONTAL * 2,
        backgroundColor: COLOR.SECOND_COLOR,
        borderRadius: 10,
    },
    bannerImg: {
        height: 200,
        width: WIDTH - DIMENSION.MARGIN_HORIZONTAL * 2,
        borderRadius: 10,
    },
    indicatorWrapper: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        borderRadius: 50,
        width: 6,
        height: 6,
        backgroundColor: COLOR.MAIN_COLOR,
        marginRight: 10,
    },
})

export default memo(Banner);