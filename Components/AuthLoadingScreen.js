import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native'
import moment from 'moment'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    setTimeout(async () => {
        const dateToken = await AsyncStorage.getItem('dateToken')
        const dateToCheck = moment(dateToken).add(1, 'd')
        const dateNow = moment(new Date())
        console.log(dateNow.isAfter(dateToCheck))
        if (dateNow.isAfter(dateToCheck)) {
          await AsyncStorage.removeItem('dateToken')
          await AsyncStorage.removeItem('userToken')
        }
        const userToken = await AsyncStorage.getItem('userToken')


        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        console.log(userToken)
        this.props.navigation.navigate(userToken ? 'App' : 'Auth')
      },
      3000
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

export default AuthLoadingScreen
