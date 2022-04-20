import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigation } from './src/navigation';
function App() {
  return(
    <NavigationContainer>
      <MainStackNavigation></MainStackNavigation>
    </NavigationContainer>
  )
}

export default App;
