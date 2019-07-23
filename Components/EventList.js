import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import EventItem from './EventItem'

class EventList extends React.Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   refreshing: false
    // }
  }

  _displayDetailForEvent = (eventDisplay) => {
    this.props.navigation.navigate('EventDetail', {event: eventDisplay})
  }

  render() {
    const { deleteEvent } = this.props

    if (this.props.events.length === 0) {
      return (
        <View style={styles.list_empty}>
          <Text>Vous n'avez pas encore d'evènement</Text>
          <Button
            onPress={this.props.loadAllEvent}
            title="Press Me to Refresh"
            color="#3498db"
          />
        </View>
      )
    } else {
      return (
        <FlatList
          style={styles.list}
          data={this.props.events}
          onRefresh={this.props.loadAllEvent}
          refreshing={this.props.refreshing}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({item}) => (
            <EventItem
              event={item}
              displayDetailForEvent={this._displayDetailForEvent}
              deleteEvent={deleteEvent}
            />
          )}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  list_empty: {
    flex: 1,
    alignSelf: 'center'
  }
})

export default EventList
