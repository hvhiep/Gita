import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigation } from './src/navigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/app/store';

function App() {
  LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ])
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainStackNavigation></MainStackNavigation>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}

export default App;
