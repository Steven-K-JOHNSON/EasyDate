import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, AsyncStorage, ActivityIndicator, Platform, Image, TouchableOpacity, Alert } from 'react-native'
import EventItem from './EventItem'
import EventList from './EventList'
import LinearGradient from 'react-native-linear-gradient'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import { connect } from 'react-redux'
import moment from 'moment'
import { getEventByIdUser } from '../API/EasyDateAPI'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class HomePage extends React.Component {

  static navigationOptions = ({ navigation }) => {
        // if (Platform.OS === 'ios') {
          return {
              headerRight: <TouchableOpacity
                              style={styles.add_touchable_headerrightbutton}
                              onPress={() => navigation.navigate('NewEvent')}>
                              <Image
                                style={styles.add_event}
                                source={require('../Images/add_button.png')} />
                            </TouchableOpacity>,
              headerLeft: <TouchableOpacity
                              style={styles.add_touchable_headerleftbutton}
                              onPress={() => {
                                const logout = navigation.getParam('logout')
                                logout()
                              }}>
                              <Image
                                style={styles.logout}
                                source={require('../Images/logout.png')} />
                            </TouchableOpacity>
          }
        // }
    }

  constructor(props) {
    super(props)
    this.state = {
      events: [],
      eventsCalendar: undefined,
      isLoading: true,
      refreshing: false
    }

    this._onDayPress = this._onDayPress.bind(this);
    this._loadAllEvent = this._loadAllEvent.bind(this);
  }

  _displayAllEvent() {
    eventDisplay = {}
    this.state.events.map((event) => {

      var currentDayOfEvent = moment(new Date(event.Start))
      var eventLineHeight = 0
      var allDateOfEvent = [
        currentDayOfEvent.format('YYYY-MM-DD')
      ]

      console.log("Création du tableau des jours")
      while (!currentDayOfEvent.isSame(event.End, 'day')) {
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
        if (event.Start.isSame(event.End, 'day')) {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: true, endingDay: true, color: this.props.typeEvent.find((item) => item.Id === event.TypeId).Color }
        } else if (moment(allDateOfEvent[i]).isSame(event.Start, 'day')) {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: true, endingDay: false, color: this.props.typeEvent.find((item) => item.Id === event.TypeId).Color }
        } else if (moment(allDateOfEvent[i]).isSame(event.End, 'day')) {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: false, endingDay: true, color: this.props.typeEvent.find((item) => item.Id === event.TypeId).Color }
        } else {
          eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: false, endingDay: false, color: this.props.typeEvent.find((item) => item.Id === event.TypeId).Color }
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

  _onDayPress(day) {
    this.setState({
      selected: day.dateString
    }, () => console.log(this.state.selected));
  }

  _loadAllEvent() {
    this.setState({
      refreshing: true
    }, () => {
      getEventByIdUser(this.props.user.Id).then(data => {
        data.data.sort((a, b) => new Date(...a.Start.split('/').reverse()) - new Date(...b.Start.split('/').reverse()));
        data.data.map(event => {
          event.Start = moment(new Date(event.Start)).subtract(2, 'h')
          event.End = moment(new Date(event.End)).subtract(2, 'h')
        })
        this.setState({
          events: data.data,
          isLoading: false,
          refreshing: false
        }, () => this._displayAllEvent()
        )
      })
    })
  }

  componentDidMount() {
    // Appel API pour recevoir tous les events d'un User
    this._loadAllEvent()
    this.props.navigation.setParams({ logout: this._signOutAsync })
  }

  _signOutAsync = () => {
    Alert.alert(
      'Deconnexion',
      'Se déconnecter ?',
      [
        {
          text: 'Non',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
          }
        },
      ],
      {
        cancelable: false
      },
    )
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
            onDayPress={this._onDayPress}
            hideExtraDays={true}
            markingType={'multi-period'}
            markedDates={this.state.eventsCalendar}
            // dayComponent={({date, state}) => {
            //   return (<View><Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text></View>);
            // }}
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
            events={this.state.events}
            loadAllEvent={this._loadAllEvent}
            refreshing={this.state.refreshing}
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

export default connect(mapStateToProps)(HomePage)
