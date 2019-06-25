import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class InvitedPeopleItem extends React.Component {

  render() {
    const { invitedPeople, deleteInvitedPeopleFromEvent } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForEvent(event.id)}
        onLongPress={() => deleteInvitedPeopleFromEvent(invitedPeople.id)}>
        <Image
            style={styles.image}
            source={event.image}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={[styles.title_text, {color: event.colorForBackground}]}>{invitedPeople.firstname} {invitedPeople.lastname}]</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    flex: 1
    // borderRightWidth: 10,
    // borderColor: 'transparent'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    borderColor: '#000000',
    borderWidth: 1,
    // margin: 10,
  },
  name: {
    flexWrap: 'wrap',
  },
  role: {
    fontWeight: 'bold'
  }
})

export default InvitedPeopleItem
