
import React from 'react'
import { StyleSheet, View, Text, Image, TextInput, InputAccessoryView, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HomePage from './HomePage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getUserByEAndP } from '../API/EasyDateAPI'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.login = ""
    this.password = ""
    this.state = {
      user: undefined
    }
  }

  _tryToLogin() {
    getUserByEAndP(this.login, this.password).then(data => {
      console.log(data.data)
      // this.setState({
      //   user: data
      // })
    })
    this.props.navigation.navigate('HomePage')
  }

  _loginTextInputChange(text) {
    this.login = text
  }

  _passwordTextInputChange(text) {
    this.password = text
  }

  render() {
    return (
      <LinearGradient colors={['#79DDFC', '#0079D6']} style={styles.main_container}>
        <Image
          source={require('../Images/logo_transparent.png')}
          style={styles.icon}/>
          <TextInput
            style={styles.text_login}
            placeholder='Login'
            placeholderTextColor='#767676'
            keyboardAppearance='dark'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            onChangeText = {(text) => this._loginTextInputChange(text)}
            returnKeyType='next'/>
          <TextInput
            style={styles.text_password}
            placeholder='Password'
            placeholderTextColor='#767676'
            secureTextEntry={true}
            onSubmitEditing={() => this._tryToLogin()}
            onChangeText = {(text) => this._passwordTextInputChange(text)}
            ref={(input) => { this.secondTextInput = input; }}/>
        <Text style={styles.default}>L’organisation facilitée de votre agenda personnel et professionnel</Text>
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
    flex: 2,
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 33,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    margin: 10,
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
  },
})

export default Login
