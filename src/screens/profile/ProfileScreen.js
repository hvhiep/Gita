import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { COLOR } from '../../res';
import Customer from './Customer/Customer';
import Salesman from './Salesman/Salesman';
//dump:
import userData from './userData';

function ProfileScreen({ navigation }) {

    const user = userData.find((item) => item.id === 2);

    return (
        <View style={styles.container}>
            {user.type === 0 ?
                <Salesman navigation={navigation} user={user}/>
                :
                <Customer navigation={navigation} user={user}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE
    }
});

export default ProfileScreen;