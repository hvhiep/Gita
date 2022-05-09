import React from 'react';
import {
    View,
    Text
} from 'react-native';

function SearchResultScreen({ navigation, route }) {

    const { searchResult } = route?.params

    return (
        <Text>{searchResult}</Text>
    )
};

export default SearchResultScreen;