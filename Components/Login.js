
import React from 'react'
import { Alert, StyleSheet, View, Text, Image, TextInput, InputAccessoryView, Button, AsyncStorage, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
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
    this.state = {
      isLoading: false
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _tryToLogin() {
    this.setState({
      isLoading: true
    })
    getUserByEAndP(this.login, this.password).then(data => {
      console.log(data)
      if (data.data.length !== 0) {
        const action = { type: "LOGIN_USER", value: data.data[0] }
        this.props.dispatch(action)
        this.props.navigation.navigate('App')
        AsyncStorage.setItem('userToken', JSON.stringify(data.data[0]))
        const dateToken = moment(new Date()).format('YYYY-MM-DD HH:mm')
        AsyncStorage.setItem('dateToken', dateToken)
      } else {
        console.log('NOT GOOD')
        Alert.alert(
         'Identifiants incorrects',
         'Veuillez réessayer.',
         [
           {text: 'OK'},
         ],
         {cancelable: false},
         )
      }
      this.setState({
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        isLoading: false
      })
    })
  }

  _loginTextInputChange(text) {
    this.login = text
  }

  _passwordTextInputChange(text) {
    this.password = text
  }

  _signUp() {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    return (
      <LinearGradient colors={['#79DDFC', '#0079D6']} style={styles.main_container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""} style={styles.container}>
            <View style={styles.logo_container}>
              <Image
                source={require('../Images/logo_transparent.png')}
                style={styles.icon}/>
            </View>
            <View style={styles.login_container}>
              <TextInput
                style={styles.text_login}
                placeholder='Login'
                placeholderTextColor='#767676'
                onSubmitEditing={() => { this.passwordTextInput.focus() }}
                onChangeText = {(text) => this._loginTextInputChange(text)}
                returnKeyType='next'/>
              <TextInput
                style={styles.text_password}
                placeholder='Password'
                placeholderTextColor='#767676'
                secureTextEntry={true}
                onSubmitEditing={() => this._tryToLogin()}
                onChangeText = {(text) => this._passwordTextInputChange(text)}
                ref={(input) => { this.passwordTextInput = input; }}/>
            </View>
            <Button
              onPress={() => { this._signUp() }}
              title="Vous inscrire ?"
              color='#3c40c6'
            />
            <View style={styles.little_text}>
              <Text style={styles.default}>L’organisation facilitée de votre agenda professionnel</Text>
            </View>
        </KeyboardAvoidingView>
        {this._displayLoading()}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 50
  },
  logo_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1.5,
    flex: 1
  },
  login_container: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20
  },
  little_text: {
    flexGrow: 1,
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    width: 300,
    height: 300
  },
  default: {
    height: 100,
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 33,
    textAlign: 'center',
    marginTop: 30,
    margin: 10,
  },
  text_login: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: 10,
    padding: 10,
  },
  text_password: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: 10,
    marginBottom: 30,
    padding: 10,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => {
  return {
    user: state.loginUser.user
  }
}

export default connect(mapStateToProps)(Login)
