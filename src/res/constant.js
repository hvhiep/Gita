import { StatusBar, Dimensions } from 'react-native';

const COLOR = {
    BACKGROUND_GREY: "#F0F0F0",
    BACKGROUND_WHITE: "#FFFFFF",
    UNSELECTED: "#B6B6B6",
    WHITE: "#FFFFFF",
    MAIN_COLOR: '#023047',
    SECOND_COLOR: '#FB8500',
    BLACK: "#000000",
    GREY: 'grey',
    YELLOW: '#FFB800',
    LIGHT_GREY: "#bdbdbd",
    BACKGROUND_MODAL: '#000000AA',
}
const FONT_SIZE = {
    BIG_TITLE: 26,
    NORMAL_TITLE: 20,
    SMALL_TITLE: 16,
    BIG_TEXT: 16,
    NORMAL_TEXT: 14,
    SMALL_TEXT: 12,
    TINY_TEXT: 8
}

const DIMENSION = {
    MARGIN_HORIZONTAL: 14,
}
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const { height, width } = Dimensions.get('window');
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

export { COLOR, FONT_SIZE, STATUSBAR_HEIGHT, height, width, DIMENSION, numberWithCommas, numFormatter };