import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 function CartScreen() {
    return (
        <View style={styles.container}><Text>cart</Text></View>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default CartScreen;