// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import HomePage from '../Components/HomePage'
import EventDetail from '../Components/EventDetail'

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  HomePage: {
    screen: HomePage,
  },
  EventDetail: {
    screen: EventDetail,
  }
})

const EasyDateTabNavigator = createBottomTabNavigator({
  HomePage: {
    screen: HomePage
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(LoginStackNavigator)
