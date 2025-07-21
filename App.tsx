import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Colors } from './src/constants';
import NavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import SplashStack from './src/navigation/SplashStack';

import { Provider } from 'react-redux';
import { store } from './src/redux-store/store';
import LoadingScreen from './src/screens/splash/LoadingScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setNavigationColor(Colors.THEME, 'light');
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.THEME} barStyle="light-content" />
      <NavigationContainer>
        <SplashStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
