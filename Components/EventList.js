import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import EventItem from './EventItem'
import events from '../TMP/mock'

class EventList extends React.Component {

  // constructor() {
  //   super(props)
  //   this.state = {
  //     events: []
  //   }
  // }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <EventItem
            event={item}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
})

export default EventList
