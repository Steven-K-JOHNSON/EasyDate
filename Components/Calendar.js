import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Platform, Image, TouchableOpacity } from 'react-native'
import EventItem from './EventItem'
import EventList from './EventList'
import LinearGradient from 'react-native-linear-gradient'
import events from '../TMP/mock'

class Calendar extends React.Component {

  static navigationOptions = () => {
        if (Platform.OS === 'ios') {
          return {
              headerRight: <TouchableOpacity
                              style={styles.add_touchable_headerrightbutton}>
                              <Image
                                style={styles.share_image}
                                source={require('../Images/add_button.png')} />
                            </TouchableOpacity>,
              headerLeft: null
          }
        }
    }

  _displayLoading() {

  }

  constructor(props) {
    super(props)
    this.state = {
      events: events
    }
  }

  render() {
    return (
      <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
        <View style={styles.calendar}/>
        <EventList
          events={this.state.events}
          navigation={this.props.navigation}
        />
        {this._displayLoading()}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  },
  calendar: {
    flex: 1
  },
  list: {
    flex: 1
  }
})

export default Calendar
