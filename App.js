import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigation } from './src/navigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <MainStackNavigation></MainStackNavigation>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;
