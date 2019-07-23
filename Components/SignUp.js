
import React from 'react'
import { Alert, StyleSheet, View, Text, Image, TextInput, InputAccessoryView, Button, AsyncStorage, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HomePage from './HomePage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { register, getUserByEAndP } from '../API/EasyDateAPI'
import { connect } from 'react-redux'
import CacheStore from 'react-native-cache-store'
import moment from 'moment'

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.name = ""
    this.lastname = ""
    this.username = ""
    this.email = ""
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

  _createNewAccount() {
    if (this.name.trim() === "" || this.lastname.trim() === "" || this.username.trim() === "" || this.email.trim() === "" || this.password.trim() === "") {
      Alert.alert(
       'Attention',
       'Veuillez remplir tous les champs avant de valider.',
       [
         {text: 'OK'},
       ],
       {cancelable: false},
       )
       return
    }

    this.setState({
      isLoading: true
    })

    this.name = this.name.trim()
    this.lastname = this.lastname.trim()
    this.username = this.username.trim()
    this.email = this.email.trim()
    this.password = this.password.trim()

    var newUser = {
      Name: this.name,
      Lastname: this.lastname,
      Username: this.username,
      Email: this.email,
      Password: this.password,
    }

    register(newUser).then(data => {
      this.props.navigation.navigate('Login')
      Alert.alert(
       'Félicitation',
       'Votre compte a bien été créé.\nVeuillez activer votre compte via le mail envoyé dans votre adresse mail.',
       [
         {text: 'OK'},
       ],
        {cancelable: false},
       )
    }).catch(error => {
      Alert.alert(
       'Attention',
       "Le nom d'utilisateur ou l'email est déjà utilisé.",
       [
         {
           text: 'Ok',
           onPress: () => {
             this.usernameTextInput.focus()
           }
         },

       ],
       {cancelable: false},
       )
       this.setState({
         isLoading: false
       })
    })


  }

  _nameTextInputChange(text) {
    this.name = text
  }

  _lastnameTextInputChange(text) {
    this.lastname = text
  }

  _usernameTextInputChange(text) {
    this.username = text
  }

  _emailTextInputChange(text) {
    this.email = text
  }

  _passwordTextInputChange(text) {
    this.password = text
  }

  componentWillMount() {
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
            <View style={styles.formule}>
              <TextInput
                style={styles.text_input}
                placeholder='Nom'
                placeholderTextColor='#767676'
                onSubmitEditing={() => { this.nameTextInput.focus() }}
                onChangeText = {(text) => this._lastnameTextInputChange(text)}
                returnKeyType='next'/>
              <TextInput
                style={styles.text_input}
                placeholder='Prénom'
                placeholderTextColor='#767676'
                onSubmitEditing={() => { this.usernameTextInput.focus() }}
                onChangeText = {(text) => this._nameTextInputChange(text)}
                returnKeyType='next'
                ref={(input) => { this.nameTextInput = input; }}/>
              <TextInput
                style={styles.text_input}
                placeholder="Nom d'utilisateur"
                placeholderTextColor='#767676'
                onSubmitEditing={() => { this.emailTextInput.focus() }}
                onChangeText = {(text) => this._usernameTextInputChange(text)}
                returnKeyType='next'
                ref={(input) => { this.usernameTextInput = input; }}/>
              <TextInput
                style={styles.text_input}
                placeholder='Email'
                placeholderTextColor='#767676'
                onSubmitEditing={() => { this.passwordTextInput.focus() }}
                onChangeText = {(text) => this._emailTextInputChange(text)}
                returnKeyType='next'
                ref={(input) => { this.emailTextInput = input; }}/>
              <TextInput
                style={styles.text_input}
                placeholder='Password'
                placeholderTextColor='#767676'
                secureTextEntry={true}
                onChangeText = {(text) => this._passwordTextInputChange(text)}
                ref={(input) => { this.passwordTextInput = input; }}/>
            </View>
            <View style={styles.little_text}>
              <Button
                onPress={() => { this._createNewAccount() }}
                title="S'inscrire"
                color='#3c40c6'
              />
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
    flexGrow: 0.5,
    flex: 0.8,
  },
  formule: {
    flexGrow: 2,
    flex: 1,
    justifyContent: 'space-around',
  },
  little_text: {
    flex: 0.5,
  },
  icon: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: 30
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
  text_input: {
    height: Platform.OS === 'android' ? 30 : 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: 10,
    padding: 5,
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

export default connect(mapStateToProps)(SignUp)
