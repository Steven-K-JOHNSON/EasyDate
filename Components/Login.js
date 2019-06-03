
import React from 'react'
import { StyleSheet, View, Text, Image, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


class Login extends React.Component {

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
        <View style={styles.textinput_container}>
          <TextInput style={styles.textinput} placeholder='Login'/>
          <TextInput style={styles.textinput} placeholder='Password'/>
        </View>
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
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 33,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10
  },
  textinput: {
    flex: 1,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 1,
  },
  textinput_container: {
    flex: 1,
    margin: 10
  }
})

export default Login
