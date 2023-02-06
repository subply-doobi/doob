/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import RootStackNav from './src/navigators/RootStackNav';
import React from 'react';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStackNav />
    </NavigationContainer>
  );
}

export default App;
