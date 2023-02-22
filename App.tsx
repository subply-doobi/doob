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
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <RootStackNav />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
