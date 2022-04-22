import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLOR } from '../../res';

function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gita</Text>
            <ActivityIndicator color={COLOR.SECOND_COLOR} size="large"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-evenly',
        backgroundColor: COLOR.MAIN_COLOR
    },
    title: {
        fontSize: 80,
        color: COLOR.SECOND_COLOR,
        fontFamily: "Montserrat-Bold"
    }
    
})

export default SplashScreen;