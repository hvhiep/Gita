import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function IntroScreen() {
    return (
        <View style={styles.container}><Text>intro screen</Text></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default IntroScreen;