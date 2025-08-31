import React, { useEffect, useState } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { Colors } from './src/constants';
import NavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import SplashStack from './src/navigation/SplashStack';

import { Provider } from 'react-redux';
import { store } from './src/redux-store/store';
import InternetStatusPopup from './src/utils/InternetStatusPopup';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      NavigationBar.setNavigationColor(Colors.THEME, 'light');
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>

      <View style={{ flex: 1, backgroundColor: Colors.THEME }}>
        <StatusBar translucent backgroundColor={Colors.THEME} barStyle="light-content" />
        <NavigationContainer>
          <SplashStack />
        </NavigationContainer>
        <InternetStatusPopup />
      </View>
    </Provider>
  );
};

export default App;
