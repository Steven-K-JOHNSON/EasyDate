import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Platform, Image, TouchableOpacity } from 'react-native'
import EventItem from './EventItem'
import EventList from './EventList'
import LinearGradient from 'react-native-linear-gradient'
import events from '../TMP/mock'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import { connect } from 'react-redux'
import moment from 'moment'


LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class HomePage extends React.Component {

  static navigationOptions = () => {
        if (Platform.OS === 'ios') {
          return {
              headerRight: <TouchableOpacity
                              style={styles.add_touchable_headerrightbutton}>
                              <Image
                                style={styles.add_event}
                                source={require('../Images/add_button.png')} />
                            </TouchableOpacity>,
              headerLeft: null
          }
        }
    }

  _displayLoading() {

  }

  _displayAllEvent() {
    eventDisplay = {}

    this.state.events.map((event) => {

      var currentDayOfEvent = moment(new Date(event.start))
      var eventLineHeight = 0
      var allDateOfEvent = [
        currentDayOfEvent.format('YYYY-MM-DD')
      ]

      console.log("Création du tableau des jours")
      while (currentDayOfEvent.format('YYYY-MM-DD') !== event.end) {
        currentDayOfEvent.add(1, 'days')
        allDateOfEvent = [
          ...allDateOfEvent,
          currentDayOfEvent.format('YYYY-MM-DD')
        ]
      }

      console.log("Vérification de la place dans le calendrier")
      var placeInCalendarFounded = false
      while(!placeInCalendarFounded) {
        for (var i = 0; i < allDateOfEvent.length; i++) {
          if (allDateOfEvent[i] in eventDisplay
              && eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] !== undefined
              && eventDisplay[allDateOfEvent[i]].periods[eventLineHeight].color !== 'transparent') {
            eventLineHeight++
            break
          }
          if (i === allDateOfEvent.length - 1) {
            placeInCalendarFounded = true
          }
        }
      }
      console.log("Fin de vérification")

      allDateOfEvent.map(date => {
        if (!(date in eventDisplay)) {
          eventDisplay[date] = {
            periods: []
          }
        }
      })

      for (var i = 0; i < allDateOfEvent.length; i++) {
        console.log("FOR")
        if (event.start === event.end) {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: true, endingDay: true, color: event.colorForBackground }
        } else if (allDateOfEvent[i] === event.start) {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: true, endingDay: false, color: event.colorForBackground }
        } else if (allDateOfEvent[i] === event.end) {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: false, endingDay: true, color: event.colorForBackground }
        } else {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: false, endingDay: false, color: event.colorForBackground }
        }
      }

      allDateOfEvent.map(date => {
        for (var i = 0; i < eventLineHeight; i++) {
          if (eventDisplay[date].periods[i] === undefined) {
            eventDisplay[date].periods[i] = { color: 'transparent' }
          }
        }
      })
    })

    this.setState({
      eventsCalendar: eventDisplay
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      events: events,
      eventsCalendar: undefined
    }

    this._onDayPress = this._onDayPress.bind(this);
  }

  _onDayPress(day) {
    this.setState({
      selected: day.dateString
    }, () => console.log(this.state.selected));

  }

  componentWillMount() {
    // Appel API pour recevoir tous les events d'un User
    this._displayAllEvent()
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
        <EventList
          style={styles.list}
          events={this.state.events}
          navigation={this.props.navigation}
        />
        {this._displayLoading()}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add_touchable_headerrightbutton: {
    marginRight: 8
  },
  add_event: {
    width: 30,
    height: 30
  },
  calendar: {
    flex: 1.3,
  },
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(HomePage)
