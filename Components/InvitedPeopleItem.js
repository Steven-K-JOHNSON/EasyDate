import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class InvitedPeopleItem extends React.Component {

  render() {
    const { invitedPeople, deleteInvitedPeopleFromEvent, test } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => test()}
        onLongPress={() => deleteInvitedPeopleFromEvent(invitedPeople.id)}>
        <Image
            style={styles.image}
            source={invitedPeople.avatar}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{invitedPeople.firstname} {invitedPeople.lastname}</Text>
            <Text style={styles.date}>{invitedPeople.role}</Text>
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 2
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 55/2,
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
    fontSize: 17,
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
