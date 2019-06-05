
import React from 'react'
import { StyleSheet, View, Text, Image, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


class Login extends React.Component {

  _tryToLogin() {
    console.log("Yes")
  }

  render() {
    return (
      // <View style={styles.main_container}>
      //   <Image
      //     source={require('../Images/logo_transparent.png')}
      //     style={styles.icon}/>
      //   <Text style={styles.default}>Hey</Text>
      //   <View style={styles.textinput_container}>
      //     <TextInput style={styles.textinput} placeholder='Login'/>
      //     <TextInput style={styles.textinput} placeholder='Password'/>
      //   </View>
      // </View>
      <LinearGradient colors={['#79DDFC', '#0079D6']} style={styles.main_container}>
        <Image
          source={require('../Images/logo_transparent.png')}
          style={styles.icon}/>
        <Text style={styles.default}>L’organisation facilitée de votre agenda personnel et professionnel</Text>
        <TextInput
          style={styles.text_login}
          placeholder='Login'
          placeholderTextColor='#A6A6A6'
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          returnKeyType='next'/>
        <TextInput
          style={styles.text_password}
          placeholder='Password'
          placeholderTextColor='#A6A6A6'
          secureTextEntry={true}
          onSubmitEditing={this._tryToLogin}
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
    backgroundColor: '#FFFFFF',
    // opacity: 0.5,
    margin: 10,
    padding: 10,
  },
  text_password: {
    flex: 0.2,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // opacity: 0.5,
    margin: 10,
    marginBottom: 30,
    padding: 10,
  }
})

export default Login
