import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { COLOR } from '../../res';
import { useSelector } from 'react-redux';
import OrderListCustomerScreen from './Customer/OrderListCustomerScreen';
import OrderListSalesmanScreen from './Salesman/OrderListSalesmanScreen';

const OrderListScreen = ({ navigation }) => {
    const user = useSelector(state => state.user);
    return (
        < View style={styles.container} >
            {
                user.type === 0 ?
                    <OrderListSalesmanScreen navigation={navigation}/>
                    :
                    <OrderListCustomerScreen navigation={navigation}/>
            }
        </View >
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE
    }
});
export default OrderListScreen;