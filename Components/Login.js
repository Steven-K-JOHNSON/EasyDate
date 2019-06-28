
import React from 'react'
import { Alert, StyleSheet, View, Text, Image, TextInput, InputAccessoryView, Button, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HomePage from './HomePage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getUserByEAndP, insertUser } from '../API/EasyDateAPI'
import { connect } from 'react-redux'
import CacheStore from 'react-native-cache-store'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.login = ""
    this.password = ""
  }

  _tryToLogin() {
    // insertUser()
    // getUserByEAndP(this.login, this.password).then(data => {
    //   if (data.data[0].Id !== undefined) {
    //     console.log("C'est GOOD")
    //     const action = { type: "LOGIN_USER", value: data.data[0] }
    //     this.props.dispatch(action)
    //     this.props.navigation.navigate('HomePage')
    //   } else {
    //     console.log('NOT GOOD')
    //
    //     // Alert.alert(
    //     //   'Identifiants incorrects',
    //     //   'Veuillez réessayer.',
    //     //   [
    //     //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     //   ],
    //     //   {cancelable: false},
    //     //   );
    //   }
    // }).catch(error => {
    //   console.log(error)
    // })

    /* A RETIRER PHASE DEBUG */
    // this.props.navigation.navigate('HomePage')
    //
    // CacheStore.set('isLogin', true, 10)
    // this.props.navigation.navigate('HomePage')
  }

  _signInAsync = async () => {
    console.log("SignInAsync")
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  }

  _loginTextInputChange(text) {
    this.login = text
  }

  _passwordTextInputChange(text) {
    this.password = text
  }

  componentWillMount() {
    // console.log("Will Mount")
    //
    // CacheStore.get('isLogin').then(value => {
    //   if(value != null) {
    //     this.props.navigation.navigate('HomePage')
    //   }
    // })
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
            onSubmitEditing={() => this._signInAsync()}
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)
