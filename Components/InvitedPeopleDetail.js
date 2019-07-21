import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, AsyncStorage, ActivityIndicator, Platform, Image, TouchableOpacity, Alert } from 'react-native'
import EventItem from './EventItem'
import EventList from './EventList'
import LinearGradient from 'react-native-linear-gradient'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import { connect } from 'react-redux'
import moment from 'moment'
import { getEventByIdUser } from '../API/EasyDateAPI'
import { displayAllEvent } from '../Tools/CalendarTools'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class InvitedPeopleDetail extends React.Component {

  static navigationOptions = ({ navigation }) => ({

    title: navigation.getParam('invitedPeople').Lastname + ' ' + navigation.getParam('invitedPeople').Name
  })

  constructor(props) {
    super(props)
    this.state = {
      events: [],
      eventsCalendar: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    // Appel API pour recevoir tous les events d'un User
    // this._loadAllEvent()

    var events = this.props.navigation.getParam('eventsDetail')

    this.setState({
      eventsCalendar: displayAllEvent(events.participantEvent, this.props.typeEvent)
    }, () => this.setState({
      isLoading: false
    }))


  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      return (
        <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
          <Calendar
            style={{ marginBottom: 15 }}
            hideExtraDays={true}
            markingType={'multi-period'}
            markedDates={this.state.eventsCalendar}
            theme={{
              calendarBackground: 'transparent',
              selectedDayBackgroundColor: 'rgb(200, 20, 20)',
              selectedDayTextColor: 'rgb(255, 255, 255)',
              todayTextColor: 'rgb(40, 40, 255)',
              dayTextColor: '#000000',
              textDisabledColor: '#999999',
              arrowColor: '#000000',
              monthTextColor: '#000000',
              textDayHeaderFontWeight: 'normal',
              textMonthFontWeight: 'bold',
              textDayFontSize: 13,
              textMonthFontSize: 14,
              textDayHeaderFontSize: 14,
              'stylesheet.day.basic': {
                base: {
                  alignItems: 'center',
                  paddingBottom: 2
                },
              }
            }}
          />
          <EventList
            events={this.props.navigation.getParam('eventsDetail').participantEvent}
            navigation={this.props.navigation}
          />
        </LinearGradient>
      )
    }
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
  add_touchable_headerleftbutton: {
    marginLeft: 8
  },
  add_event: {
    width: 30,
    height: 30
  },
  logout: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = state => {
  return {
    user: state.loginUser.user,
    typeEvent: state.api.typeEvent
  }
}

export default connect(mapStateToProps)(InvitedPeopleDetail)
