import React from 'react'
import { StyleSheet, FlatList, TextInput, View, Text, Picker } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import InvitedPeopleList from './InvitedPeopleList'
import { connect } from 'react-redux'

class NewEvent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      invitedPeople: [],
      language: 'java',
      isLoading: true
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
          markingType={'multi-period'}
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
            'stylesheet.day.basic': {
              base: {
                alignItems: 'center',
                paddingBottom: 5
              },
            }
          }}
        />
        <View style={styles.hour_container}>
          <Picker
            selectedValue={this.state.eventTypeId}
            style={{height: 100, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({eventTypeId: itemValue}, () => console.log(this.state.eventTypeId))
            }>
            { this.props.typeEvent.map(typeEvent =>{
               return <Picker.Item label={typeEvent.Label} value={typeEvent.Id} />
              })
            }
          </Picker>
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
    flex: 1,
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

const mapStateToProps = state => {
  return {
    typeEvent: state.api.typeEvent
  }
}

export default connect(mapStateToProps)(NewEvent)
