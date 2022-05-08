import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 function ProfileScreen() {
    return (
        <View style={styles.container}><Text>profile</Text></View>
    )
 }

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ProfileScreen;