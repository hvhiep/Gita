import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text>splash screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default SplashScreen;