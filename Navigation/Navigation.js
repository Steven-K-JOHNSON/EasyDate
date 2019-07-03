// Navigation/Navigations.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import HomePage from '../Components/HomePage'
import EventDetail from '../Components/EventDetail'
import NewEvent from '../Components/NewEvent'
import AuthLoadingScreen from '../Components/AuthLoadingScreen'
import InvitedPeopleDetail from '../Components/InvitedPeopleDetail'

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: 'Mes évènements'
    }
  },
  EventDetail: {
    screen: EventDetail,
    navigationOptions: {
      title: 'Détail évènement'
    }
  },
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      title: 'Ajout évènement'
    }
  },
  InvitedPeopleDetail: {
    screen: InvitedPeopleDetail
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
