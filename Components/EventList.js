import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import EventItem from './EventItem'

class EventList extends React.Component {

  constructor() {
    super(props)
    this.state = {
      events: []
    }
  }

  render() {
    return (
      <FlastList
        style={styles.list}
        data={this.props.events}
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
