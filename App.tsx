import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import { Colors } from './src/constants';
import NavigationBar from 'react-native-system-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import SplashStack from './src/navigation/SplashStack';
import { Provider } from 'react-redux';
import { store } from './src/redux-store/store';
import InternetStatusPopup from './src/utils/InternetStatusPopup';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? 24 : 20;
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      StatusBar.setBackgroundColor(Colors.THEME);
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
        {Platform.OS === 'android' && Platform.Version < 21 && (
          <View style={[styles.statusBar, { backgroundColor: Colors.THEME }]} />
        )}

        <StatusBar
          backgroundColor={Colors.THEME}
          barStyle="light-content"
        />

        <NavigationContainer>
          <SplashStack />
        </NavigationContainer>
        <InternetStatusPopup />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width: '100%',
  },
});
