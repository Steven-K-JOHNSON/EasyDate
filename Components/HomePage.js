import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Platform, Image, TouchableOpacity } from 'react-native'
import EventItem from './EventItem'
import EventList from './EventList'
import LinearGradient from 'react-native-linear-gradient'
import events from '../TMP/mock'
import { Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars'
import {} from 'react-native-calendars';

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

  constructor(props) {
    super(props)
    this.state = {
      events: events,
    }
    this._onDayPress = this._onDayPress.bind(this);
  }

  _onDayPress(day) {
    this.setState({
      selected: day.dateString
    }, () => console.log(this.state.selected));

  }

  render() {

    return (
      <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
        <Calendar
          style={styles.calendar}
          onDayPress={this._onDayPress}
          hideExtraDays={true}
          // markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
          markingType={'period'}
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

export default HomePage
