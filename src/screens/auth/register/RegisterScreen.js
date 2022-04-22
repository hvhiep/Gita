import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../../res';

function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>register screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLOR.MAIN_COLOR
    },
    title: {
        fontSize: 80,
        color: COLOR.SECOND_COLOR,
        fontFamily: "Montserrat-Bold"
    }
    
})

export default RegisterScreen;