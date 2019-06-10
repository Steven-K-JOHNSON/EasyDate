// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import allEvents from '../TMP/mock'
import allPeoples from '../TMP/peopleData'
import PeopleItem from './PeopleItem'

class EventDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      event: undefined,
      peoples: allPeoples,
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

  _displayEvent() {
    const { event } = this.state
    if (event != undefined) {
      return (
        <ScrollView
          style={styles.scrollview_container}
          contentContainerStyle={styles.scrollview_content_container}>
          <Image
            style={styles.image}
            source={event.image}
          />
          <Text style={[styles.title_text, {color: event.colorForBackground !== undefined ? event.colorForBackground : '#C6C6C6' }]}>{event.title}</Text>
          <View style={styles.date_people_container}>
            <Text style={styles.date}>6-7 Jui</Text>
            <Text style={styles.people}>9. pers</Text>
          </View>
          <Text style={styles.description}>{event.overview}</Text>
          <Text style={styles.detail}>Participe à l'évènement</Text>
          <FlatList
            style={styles.list}
            horizontal={true}
            data={allPeoples}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <PeopleItem
                people={item}
              />
            )}>

          </FlatList>
        </ScrollView>
      )
    }
  }

  /* A voir avec Thomas
  !!
  !!
  !!
  !!
  !!
  */

  render() {
    const { event } = this.state
    if (event != undefined) {
      return (
        <LinearGradient colors={['#FFFFFF', event.colorForBackground !== undefined ? event.colorForBackground : '#C6C6C6']} style={styles.main_container}>
          {this._displayLoading()}
          {this._displayEvent()}
        </LinearGradient>
      )
    } else {
      return (
        <View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollview_container: {
    flex: 1,
  },
  scrollview_content_container: {
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
  image: {
    height: 180,
    width: 180,
    borderRadius: 180/2,
    borderWidth: 1,
    margin: 15
  },
  title_text: {
    fontSize: 20,
    flexWrap: 'wrap',
    margin: 10,
    textAlign: 'center',
    color: '#DB5A5A',
    fontWeight: 'bold'
  },
  date_people_container: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15
  },
  people: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15
  },
  description: {
    flex: 1,
    margin: 15,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13
  },
  list: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  detail: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default EventDetail
