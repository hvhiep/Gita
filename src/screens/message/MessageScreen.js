import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 function MessageScreen() {
    return (
        <View style={styles.container}><Text>message</Text></View>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MessageScreen;