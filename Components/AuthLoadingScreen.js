import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Alert
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { getEventType, getUserInfo } from '../API/EasyDateAPI'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    setTimeout(async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken != null) {
          getUserInfo().then(data => {
            const action = { type: "LOGIN_USER", value: data.data[0] }
            this.props.dispatch(action)
            getEventType()
              .then(data => {
                const action = { type: "SET_TYPE_EVENT", value: data.data }
                this.props.dispatch(action)

                // This will switch to the App screen or Auth screen and this loading
                // screen will be unmounted and thrown away.

                this.props.navigation.navigate('App')
              })
              .catch(error => {
                Alert.alert(
                 'Problème',
                 "Un problème est survenu lors de la récupération des types d'évènement.",
                 [
                   {text: 'OK'},
                 ],
                   {cancelable: false},
                 )
              })
          }).catch(error => {
            Alert.alert(
             'Problème',
             "Un problème est survenu lors de la connexion à l'application.",
             [
               {text: 'OK'},
             ],
               {cancelable: false},
             )
          })
        } else {
          this.props.navigation.navigate('Auth')
        }
      },
      2000
    )
  }

  componentDidMount() {
    this._bootstrapAsync();
  }
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.main_container}>
        <Image
            style={styles.image}
            source={require('../Images/logo_transparent.png')}
        />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 500,
    height: 500
  },
})

const mapStateToProps = state => {
  return {
    user: state.loginUser.user
  }
}

export default connect(mapStateToProps)(AuthLoadingScreen)
