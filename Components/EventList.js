import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import EventItem from './EventItem'

class EventList extends React.Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   events: []
    // }
  }

  _displayDetailForEvent = (idEvent) => {
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('EventDetail', {idEvent: idEvent})
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <EventItem
            event={item}
            displayDetailForEvent={this._displayDetailForEvent}
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
