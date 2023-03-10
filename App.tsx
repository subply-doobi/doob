import {NavigationContainer} from '@react-navigation/native';
import RootStackNav from './src/navigators/RootStackNav';
import React from 'react';
import {store} from './src/stores/store';
import {Provider} from 'react-redux';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/query/store';

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}
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
