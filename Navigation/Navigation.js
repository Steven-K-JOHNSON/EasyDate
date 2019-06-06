// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import Calendar from '../Components/Calendar'

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  Calendar: {
    screen: Calendar,
  }
})

const EasyDateTabNavigator = createBottomTabNavigator({
  Calendar: {
    screen: Calendar
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(LoginStackNavigator)
