import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
    return (
        <View style={styles.container}><Text>home screen</Text></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default HomeScreen;