// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import allEvents from '../TMP/mock'

class EventDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      event: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    const data = allEvents.find((item) => item.id === this.props.navigation.state.params.idEvent)

    this.setState({
      event: data,
      isLoading: false
    })
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

  _displayFilm() {
    const { event } = this.state
    if (event != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={event.image}
          />
          <Text style={styles.title_text}>{event.title}</Text>
          <Text style={styles.description_text}></Text>
          <Text style={styles.default_text}></Text>
          <Text style={styles.default_text}></Text>
          <Text style={styles.default_text}></Text>
          <Text style={styles.default_text}></Text>
          <Text style={styles.default_text}></Text>
          <Text style={styles.default_text}></Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 180/2,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
})

export default EventDetail
