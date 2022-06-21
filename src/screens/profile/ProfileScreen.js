import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { COLOR, FONT_SIZE, DIMENSION} from '../../res';
import { Customer, Salesman } from '../../components';
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