
import React from 'react'
import { StyleSheet, View, Text, Image, TextInput, InputAccessoryView, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Calendar from './Calendar'


class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  _tryToLogin() {
    console.log("Yes")
    this.props.navigation.navigate('Calendar')
  }

  render() {
    return (
      <LinearGradient colors={['#79DDFC', '#0079D6']} style={styles.main_container}>
        <Image
          source={require('../Images/logo_transparent.png')}
          style={styles.icon}/>
        <Text style={styles.default}>L’organisation facilitée de votre agenda personnel et professionnel</Text>
        <TextInput
          style={styles.text_login}
          placeholder='Login'
          placeholderTextColor='#767676'
          keyboardAppearance='dark'
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          returnKeyType='next'/>
        <TextInput
          style={styles.text_password}
          placeholder='Password'
          placeholderTextColor='#767676'
          secureTextEntry={true}
          onSubmitEditing={() => this._tryToLogin()}
          ref={(input) => { this.secondTextInput = input; }}/>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  icon: {
    width: 'auto',
    height: 'auto',
    margin: 10,
    flex: 3
  },
  default: {
    flex: 1.5,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 33,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10
  },
  text_login: {
    flex: 0.2,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 10,
    padding: 10,
  },
  text_password: {
    flex: 0.2,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 10,
    marginBottom: 30,
    padding: 10,
  }
})

export default Login
