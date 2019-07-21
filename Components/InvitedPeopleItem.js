import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getColor } from '../Tools/ColorTools'

class InvitedPeopleItem extends React.Component {

  render() {
    const { invitedPeople, deleteInvitedPeopleFromEvent, displayInvitedPeopleDetail } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayInvitedPeopleDetail(invitedPeople)}
        onLongPress={() => deleteInvitedPeopleFromEvent(invitedPeople.Id)}>
        <Image
            style={styles.image}
            source={require('../Images/default_people.png')}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={[styles.title_text, {color: getColor(invitedPeople.specificColor)}]}>{invitedPeople.Name} {invitedPeople.Lastname}</Text>
            <Text style={styles.date}>{invitedPeople.Email}</Text>
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
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 2
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'center'
  },
  name: {
    flexWrap: 'wrap',
  },
  role: {
    fontWeight: 'bold'
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

export default InvitedPeopleItem
