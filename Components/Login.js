
import React from 'react'
import { Alert, StyleSheet, View, Text, Image, TextInput, InputAccessoryView, Button, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HomePage from './HomePage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getUserByEAndP } from '../API/EasyDateAPI'
import { connect } from 'react-redux'
import CacheStore from 'react-native-cache-store'
import moment from 'moment'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.login = ""
    this.password = ""
  }

  _tryToLogin() {
    // insertUser()
    getUserByEAndP(this.login, this.password).then(data => {
      console.log(data)
      if (data.data[0].Id !== undefined) {
        const action = { type: "LOGIN_USER", value: data.data[0] }
        this.props.dispatch(action)
        this.props.navigation.navigate('HomePage')
        AsyncStorage.setItem('userToken', JSON.stringify(data.data[0]))
        const dateToken = moment(new Date()).format('YYYY-MM-DD HH:mm')
        AsyncStorage.setItem('dateToken', dateToken)
      } else {
        console.log('NOT GOOD')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  _loginTextInputChange(text) {
    this.login = text
  }

  _passwordTextInputChange(text) {
    this.password = text
  }

  componentWillMount() {
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
        <Text style={styles.default}>L’organisation facilitée de votre agenda professionnel</Text>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    width: 180,
    height: 180,
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
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 10,
    padding: 10,
  },
  text_password: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 10,
    marginBottom: 30,
    padding: 10,
  },
})

const mapStateToProps = state => {
  return {
    user: state.loginUser.user
  }
}

export default connect(mapStateToProps)(Login)
