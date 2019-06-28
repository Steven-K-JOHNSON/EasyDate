// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import Login from '../Components/Login'
import HomePage from '../Components/HomePage'
import EventDetail from '../Components/EventDetail'
import NewEvent from '../Components/NewEvent'
import AuthLoadingScreen from '../Components/AuthLoadingScreen'

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  }
})

const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
  },
  EventDetail: {
    screen: EventDetail,
  }
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStackNavigator,
    Auth: LoginStackNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))
