import React from 'react'
import { StyleSheet, FlatList, TextInput, View, Text } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import InvitedPeopleList from './InvitedPeopleList'
import allPeoples from '../TMP/peopleData'

class NewEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      invitedPeople: allPeoples
    }
  }

  _displayDetailForEvent = (idEvent) => {
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('EventDetail', {idEvent: idEvent})
  }

  render() {
    console.log(this.state.invitedPeople)
    return (
      <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
        <Calendar
          style={styles.calendar}
          onDayPress={this._onDayPress}
          hideExtraDays={true}
          // markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
          markingType={'multi-period'}
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
            'stylesheet.day.basic': {
              base: {
                alignItems: 'center',
                paddingBottom: 5
              },
            }
          }}
        />
        <View style={styles.hour_container}>
          <Text>Hello</Text>
        </View>
        <TextInput
          style={styles.text_search_people}
          placeholder="Ajouter des personnes à l'évènement"
          placeholderTextColor='#767676'
          returnKeyType='next'/>
        <InvitedPeopleList
          style={styles.list}
          invitedPeople={this.state.invitedPeople}
          navigation={this.props.navigation}
        />
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  calendar: {
    flex: 1.5,
  },
  hour_container: {
    flex: 0.2,
    flexDirection: 'row'
  },
  text_search_people: {
    flex: 0.1,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 10,
    padding: 5,
  },
  list: {
    flex: 1
  }
})

export default NewEvent
