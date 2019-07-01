// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PeopleItem from './PeopleItem'
import moment from 'moment'
import { connect } from 'react-redux'
import { getUserByIdEvent } from '../API/EasyDateAPI'
import { getImage } from '../Tools/ImageTools'

const month = ['Janv.', 'Fev.', 'Mars', 'Avril', 'Mai', 'Juin', 'Jui.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec']

class EventDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      event: undefined,
      numberParticipants: undefined,
      peoples: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    this.setState({
      event: this.props.navigation.state.params.event,
      isLoading: true
    }, () => {
      getUserByIdEvent(this.state.event.Id).then(data => {
        this.setState({
          numberParticipants: data.data.length,
          peoples: data.data,
          isLoading: false
        })
      }).catch(error => {
        console.log(error)
      })
    })
  }

  _displayEvent() {
    const { event } = this.state
    if (event != undefined) {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      } else {
        const photoName = this.props.typeEvent.find((item) => item.Id === event.TypeId).Label
        var icon = getImage(photoName)
        return (
          <ScrollView
            style={styles.scrollview_container}
            contentContainerStyle={styles.scrollview_content_container}>
            <Image
              style={styles.image}
              source={icon}
            />
            <Text style={[styles.title_text, {color: this.props.typeEvent.find((item) => item.Id === event.TypeId).Color }]}>{event.Title}</Text>
            <View style={styles.date_people_container}>
              <Text style={styles.date}>{moment(new Date(event.Start)).format('DD')} {month[moment(new Date(event.Start)).format('M') - 1]} {moment(new Date(event.Start)).format('HH:mm')}{"\n"}{moment(new Date(event.End)).format('DD')} {month[moment(new Date(event.End)).format('M') - 1]} {moment(new Date(event.End)).format('HH:mm')}</Text>
              <Text style={styles.people}>{ this.state.numberParticipants } pers.</Text>
            </View>
            <Text style={styles.description}>{event.Description}</Text>
            <Text style={styles.detail}>Participe à l'évènement</Text>
            <FlatList
              style={styles.list}
              horizontal={true}
              data={this.state.peoples}
              keyExtractor={(item) => item.Id.toString()}
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
  }

  render() {
    const { event } = this.state
    if (event != undefined) {
      return (
        <LinearGradient colors={['#FFFFFF', this.props.typeEvent.find((item) => item.Id === event.TypeId).Color]} style={styles.main_container}>
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
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10
  },
  detail: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20
  }
})

const mapStateToProps = state => {
  return {
    typeEvent: state.api.typeEvent
  }
}

export default connect(mapStateToProps)(EventDetail)
