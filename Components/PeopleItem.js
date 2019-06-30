import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class PeopleItem extends React.Component {

  render() {
    const { people } = this.props
    console.log(people)
    return (
      <TouchableOpacity
        style={styles.main_container}>
        <Image
            style={styles.image}
            source={people.avatar === undefined ? require('../Images/default_people.png') : people.avatar}
        />
        <Text style={styles.name}>{people.Name}</Text>
        <Text style={styles.name}>{people.LastName}</Text>
        <Text style={styles.role}>{people.role}</Text>
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

export default PeopleItem
