import React from 'react'
import { StyleSheet, FlatList, TextInput, View, Text } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from "react-native-modal-datetime-picker"

class NewEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  _displayDetailForEvent = (idEvent) => {
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('EventDetail', {idEvent: idEvent})
  }

  render() {
    return (
      <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
        <Calendar
          style={styles.calendar}
          onDayPress={this._onDayPress}
          hideExtraDays={true}
          // markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
          markingType={'multi-period'}
          markedDates={this.state.eventsCalendar}
          // markedDates={{
          //   '2019-06-04': {startingDay: true, color: 'green', endingDay: true},
          //   '2019-06-20': {textColor: 'green'},
          //   '2019-06-22': {startingDay: true, color: '#000000'},
          //   '2019-06-22': {startingDay: true, color: '#DB5A5A'},
          //
          //   '2019-06-23': {endingDay: true, color: '#DB5A5A'},
          // }}
          theme={{
            calendarBackground: 'transparent',
            // textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: 'rgb(200, 20, 20)',
            selectedDayTextColor: 'rgb(255, 255, 255)',
            todayTextColor: 'rgb(40, 40, 255)',
            dayTextColor: '#000000',
            textDisabledColor: '#999999',
            // dotColor: '#00adf5',
            // selectedDotColor: '#ffffff',
            arrowColor: '#000000',
            monthTextColor: '#000000',
            // indicatorColor: 'blue',
            textDayHeaderFontWeight: 'normal',
            textMonthFontWeight: 'bold',
            // textDayHeaderFontWeight: '300',
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16
          }}

          // minDate={'2019-06-06'}
          // hideArrows={true}
          // Collection of dates that have to be marked. Default = {}
          // markedDates={{
          //   '2019-06-16': {selected: true, marked: true, selectedColor: 'blue'},
          //   '2019-06-18': {marked: true},
          //   '2019-06-20': {marked: true, dotColor: 'red', activeOpacity: 0},
          //   '2019-06-22': {disabled: true, disableTouchEvent: true}
          // }}
        />
        <View style={styles.hour_container}>
          <DateTimePicker
            isVisible={true}
          />
          <DateTimePicker/>
          <Text>Hello</Text>
        </View>
        <TextInput
          style={styles.text_search_people}
          placeholder="Ajouter des personnes à l'évènement"
          placeholderTextColor='#767676'
          returnKeyType='next'/>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  calendar: {
    flex: 1.3,
  },
  hour_container: {
    flex: 1,
    flexDirection: 'row'
  },
  text_search_people: {
    flex: 0.2,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 10,
    padding: 10,
  }
})

export default NewEvent
