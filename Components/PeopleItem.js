import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class PeopleItem extends React.Component {

  render() {
    const { people } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}>
        <Image
            style={styles.image}
            source={people.avatar}
        />
        <Text style={styles.name}>{people.lastname}</Text>
        <Text style={styles.name}>{people.firstname}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10
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
  }
})

export default PeopleItem
