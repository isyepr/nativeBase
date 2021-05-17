import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home.page'
import Login from './pages/Login.page'
import SplashScreen from './pages/SplashScreen.page'

import { Provider } from 'react-redux'
import Storage from './redux/Storage'

const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <Provider store={Storage}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen"
            screenOptions={{
              headerShown: false
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}