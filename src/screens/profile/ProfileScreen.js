import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { COLOR } from '../../res';
import Customer from './Customer/Customer';
import Salesman from './Salesman/Salesman';
//redux
import { useSelector } from 'react-redux';

//dump:
import userData from './userData';

function ProfileScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector(state => state.user);

    if (isLoading && user === undefined)
        return <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }} size='large' color={COLOR.SECOND_COLOR} />
    return (
        < View style={styles.container} >
            {
                user.type === 0 ?
                    <Salesman navigation={navigation} user={user} />
                    :
                    <Customer navigation={navigation} user={user} />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUND_WHITE
    }
});

export default ProfileScreen;