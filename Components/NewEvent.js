import React from 'react'
import { StyleSheet, FlatList, TextInput, View, Text, Picker, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Button } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import InvitedPeopleList from './InvitedPeopleList'
import { connect } from 'react-redux'
import moment from 'moment'
import { insertDate, insertEventWithParticipant } from '../API/EasyDateAPI'

class NewEvent extends React.Component {

  static navigationOptions = ({ navigation }) => {
        // if (Platform.OS === 'ios') {
          return {
              headerRight: <TouchableOpacity
                              style={styles.validate_touchable_headerrightbutton}
                              onPress={() => {
                                const createNewEvent = navigation.getParam('createNewEvent')
                                createNewEvent()

                              }}>
                              <Image
                                style={styles.validate_event}
                                source={require('../Images/checked.png')} />
                            </TouchableOpacity>
          }
        // }
  }

  constructor(props) {
    super(props)
    this.state = {
      invitedPeople: [
        this.props.user
      ],
      newEvent: {},
      isLoading: true,
      startDateTimePickerVisible: false,
      startDateDisplay: "Choisissez la date",
      startDate: "",
      endDateTimePickerVisible: false,
      endDateDisplay: "Choisissez la date",
      endDate: ""
    }

    this._deleteInvitedPeopleFromEvent = this._deleteInvitedPeopleFromEvent.bind(this)
    this._createNewEvent = this._createNewEvent.bind(this);
  }

  _createNewEvent() {
    insertDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
    .then(data => {
      console.log(data)

      var idUsers = []
      this.state.invitedPeople.map(people => {
        console.log(people)
        idUsers = [...idUsers, people.Id]
      })

      this.setState({
        newEvent: {...this.state.newEvent, CreatedId: data.data[0].Id, IdUsers: idUsers}
      }, () => { insertEventWithParticipant(this.state.newEvent) })

    })
    .catch(error => {
      console.log(error)
    })
  }

  showStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = date => {
    this.setState({
      startDateDisplay: moment(date).format('YYYY-MM-DD HH:mm'),
      newEvent: {
        ...this.state.newEvent,
        Start: moment(date).format('YYYY-MM-DD HH:mm')
      }
    })

    this.hideStartDateTimePicker();
  }

  handleEndDatePicked = date => {
    this.setState({
      endDateDisplay: moment(date).format('YYYY-MM-DD HH:mm'),
      newEvent: {
        ...this.state.newEvent,
        End: moment(date).format('YYYY-MM-DD HH:mm')
      }
    })
    this.hideEndDateTimePicker();
  }

  componentDidMount() {
    this.props.navigation.setParams({ createNewEvent: this._createNewEvent })
  }

  _test = () => {
    console.log("AVANT")
    console.log(this.state.invitedPeople)
    this.setState({
      invitedPeople: [
        ... this.state.invitedPeople,
        {
          Id: "bd75480c-9593-efe6-1501-45511ed30fa7",
          avatar: require('../Images/default_people.png'),
          Name: 'Louis',
          LastName: 'Mantopoulos',
          role: 'Chef yep'}
      ]
    }, () => {
      console.log("APRES")
      console.log(this.state.invitedPeople)
    })
  }

  _deleteInvitedPeopleFromEvent = (idPeople) => {
    console.log(idPeople)
    const invitedPeopleIndex = this.state.invitedPeople.findIndex(item => item.Id === idPeople)
      if (invitedPeopleIndex !== -1) {
        this.setState({
          invitedPeople: this.state.invitedPeople.filter((item, index) => index !== invitedPeopleIndex)
        })
      }
  }

  render() {
    return (
      <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
        <Calendar
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
            textDayFontSize: 12,
            textMonthFontSize: 12,
            textDayHeaderFontSize: 13,
            'stylesheet.day.basic': {
              base: {
                alignItems: 'center',
                paddingBottom: 2
              }
            },
            'stylesheet.calendar.header': {
              week: {
                marginTop: 1,
                justifyContent: 'space-around',
                flexDirection: 'row'
              }
            }
          }}
        />
        <View style={styles.params_container}>
          <View style={styles.event_date_container}>
            <Picker
              style={styles.event}
              selectedValue={this.state.eventTypeId}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  eventTypeId: itemValue,
                  newEvent: {...this.state.newEvent, TypeId: itemValue}
                })
              }}>
              {
                this.props.typeEvent.map(typeEvent => {
                 return <Picker.Item label={typeEvent.Label} key={typeEvent.Id} value={typeEvent.Id} />
                })
              }
            </Picker>
            <View style={styles.date_container}>
              <TouchableOpacity onPress={this.showStartDateTimePicker}>
                <Text style={styles.display}>Début de l'évènement</Text>
                <Text>{this.state.startDateDisplay}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                mode={'datetime'}
                is24Hour={true}
                minimumDate={new Date()}
                datePickerModeAndroid={'spinner'}
              />
              <TouchableOpacity onPress={this.showEndDateTimePicker}>
                <Text style={styles.display}>Fin de l'évènement</Text>
                <Text>{this.state.endDateDisplay}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.endDateTimePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                mode={'datetime'}
                is24Hour={true}
                minimumDate={new Date()}
                datePickerModeAndroid={'spinner'}
              />
            </View>
          </View>
          <View style={styles.invitedPeople_container}>
            <Button
              onPress={() => { this._test() }}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <InvitedPeopleList
              invitedPeople={this.state.invitedPeople}
              deleteInvitedPeopleFromEvent={this._deleteInvitedPeopleFromEvent}
              navigation={this.props.navigation}
            />
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  params_container: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  event_date_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  invitedPeople_container: {
    marginTop: 10,
    flex: 2,
  },
  text_search_people: {
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 30,
    margin: 10,
    padding: 5,
  },
  date_container: {
    justifyContent: 'space-around'
  },
  event: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  display: {
    fontWeight: 'bold'
  },
  validate_touchable_headerrightbutton: {
    marginRight: 8
  },
  validate_event: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = state => {
  return {
    typeEvent: state.api.typeEvent,
    user: state.loginUser.user
  }
}

export default connect(mapStateToProps)(NewEvent)
