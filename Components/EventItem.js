import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
// import FadeIn from '../Animations/FadeIn'
import moment from 'moment'

const month = ['Janv.', 'Fev.', 'Mars', 'Avril', 'Mai', 'Juin', 'Jui.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec']

class EventItem extends React.Component {

  render() {
    const { event, displayDetailForEvent } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForEvent(event.id)}>
        <Image
            style={styles.image}
            source={event.image}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={[styles.title_text, {color: event.colorForBackground}]}>{event.title}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.date}>{moment(new Date(event.start)).format('DD')} {month[moment(new Date(event.start)).format('M') - 1]} -{"\n"}{moment(new Date(event.end)).format('DD')} {month[moment(new Date(event.end)).format('M') - 1]}</Text>
            <Text style={styles.people}>{event.people} pers.</Text>
          </View>
        </View>
        <Image
            style={styles.image_next}
            source={require('../Images/next.png')}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 2
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70/2,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 10,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'center'
  },
  description_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    // fontStyle: 'italic',
    color: '#000000',
    textAlign: 'center',
    fontSize: 14,
    flex: 1,
    margin: 5
  },
  people: {
    // fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    fontSize: 14,
    flex: 1,
    margin: 5
  },
  image_next: {
    width: 30,
    height: 30,
    margin: 10

    // borderRadius: 80/2,
    // borderColor: '#000000',
    // margin: 10,
  }
})

export default EventItem
