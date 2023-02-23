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
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStackNav />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
