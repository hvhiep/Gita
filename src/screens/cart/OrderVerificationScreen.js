import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION } from '../../res';

const OrderVerificationScreen = ({ navigation, route }) => {

    const listOrder = route?.params?.listOrder;
    // console.log(listOrder);

    return (
        <Text>xac minh ne</Text>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default OrderVerificationScreen;