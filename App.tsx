/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import RootStackNav from './src/navigators/RootStackNav';
import React from 'react';
import {store} from './src/stores/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNav />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
