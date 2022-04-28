import { StatusBar, Dimensions } from 'react-native';

const COLOR = {
    BACKGROUND: "#F3F5F7",
    UNSELECTED: "#B6B6B6",
    WHITE: "#FFFFFF",
    MAIN_COLOR: '#023047',
    SECOND_COLOR: '#FB8500',
    BLACK: "#000000",
}
const FONT_SIZE = {
    BIG_TITLE: 26,
    NORMAL_TITLE: 18,
    SMALL_TITLE: 16,
    BIG_TEXT: 14,
    NORMAL_TEXT: 12,
    SMALL_TEXT: 10,
    TINY_TEXT: 8

}
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const {height, width} = Dimensions.get('screen');

export { COLOR, FONT_SIZE, STATUSBAR_HEIGHT, height, width };