import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
// import FadeIn from '../Animations/FadeIn'

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
            <Text style={styles.title_text}>{event.title}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.date}>17-19 Jui</Text>
            <Text style={styles.people}>6 per.</Text>
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
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
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
    fontSize: 20,
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
    color: '#666666',
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    margin: 5
  },
  people: {
    // fontWeight: 'bold',
    color: '#666666',
    textAlign: 'center',
    fontSize: 16,
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
