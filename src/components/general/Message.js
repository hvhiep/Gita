import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR, FONT_SIZE } from '../../res';

function Message(props) {

    const lookup = [
        {
            state: 'success',
            icon: 'check-circle'
        },
        {
            state: 'error',
            icon: 'times-circle'
        },
    ]
    const type = lookup.find((item) => {
        return item.state === props.state;
    })
    
    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            transparent
            onShow={props.onShow}
        >
            <View style={styles.container}>
            <View style={[styles.box, type && styles[type.state]]}>
                <Icon name={type.icon} size={50} color={COLOR.WHITE} />
                <Text style={styles.text}>{props.content} !</Text>
            </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        padding: 20,
        backgroundColor: COLOR.GREY,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    success: {
        backgroundColor: COLOR.GREEN,
    },
    error: {
        backgroundColor: COLOR.RED,
    },
    text: {
        marginTop: 10,
        fontFamily: 'Montserrat-Bold',
        fontSize: FONT_SIZE.NORMAL_TEXT,
        color: COLOR.WHITE,
    },
});

export default Message;