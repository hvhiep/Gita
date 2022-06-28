import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 function MessageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tính năng đang được phát triển! Quay lại sau nhé 😊</Text>
        </View>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        textAlign: 'center',
        
    }
});

export default MessageScreen;