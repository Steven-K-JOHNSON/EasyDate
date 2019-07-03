import React from 'react'
import { StyleSheet, FlatList, TextInput, View, Text, Picker, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Button } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import InvitedPeopleList from './InvitedPeopleList'
import { connect } from 'react-redux'
import moment from 'moment'
import { insertDate, insertEventWithParticipant, getUsersWithPaging, getEventByIdUser } from '../API/EasyDateAPI'
import Dialog from "react-native-dialog"
import { displayAllEvent } from '../Tools/CalendarTools'

class NewEvent extends React.Component {

  static navigationOptions = ({ navigation }) => {
        // if (Platform.OS === 'ios') {
          return {
              headerRight: <TouchableOpacity
                              style={styles.validate_touchable_headerrightbutton}
                              onPress={() => {
                                const addTitleDescription = navigation.getParam('addTitleDescription')
                                if (addTitleDescription !== undefined) {
                                  addTitleDescription()
                                }
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
    this.inputInvitedPeople = ""
    this.inputDescription = ""
    this.inputTitle = ""
    this.state = {
      invitedPeople: [],
      events: [],
      eventsCalendar: {},
      dialogVisible: false,
      dialogTitleDescVisible: false,
      newEvent: { TypeId: this.props.typeEvent[0].Id },
      isLoading: true,
      startDateTimePickerVisible: false,
      startDateDisplay: "Choisissez la date",
      startDate: "",
      endDateTimePickerVisible: false,
      endDateDisplay: "Choisissez la date",
      endDate: ""
    }

    this._deleteInvitedPeopleFromEvent = this._deleteInvitedPeopleFromEvent.bind(this)
    this._addTitleDescription = this._addTitleDescription.bind(this);
  }

  _showStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true });

  _showEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: true });

  _hideStartDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: false });

  _hideEndDateTimePicker = () =>
    this.setState({ endDateTimePickerVisible: false });

  _handleStartDatePicked = date => {
    this.setState({
      startDateDisplay: moment(date).format('YYYY-MM-DD HH:mm'),
      newEvent: {
        ...this.state.newEvent,
        Start: moment(date)
      }
    })

    this._hideStartDateTimePicker();
  }

  _handleEndDatePicked = date => {
    this.setState({
      endDateDisplay: moment(date).format('YYYY-MM-DD HH:mm'),
      newEvent: {
        ...this.state.newEvent,
        End: moment(date)
      }
    })
    this._hideEndDateTimePicker();
  }

  componentDidMount() {
    this.props.navigation.setParams({ addTitleDescription: this._addTitleDescription })
  }

  componentWillMount() {
    var user = {...this.props.user, specificColor: 0}
    this.setState({
      invitedPeople: [
        user
      ],
      events: [{ participantId: this.props.user.Id, participantEvent: this.props.navigation.getParam('eventNavigation') }],
    }, () => {
      var allEvent = []
      this.state.events.map((events, index) => {
        events.participantEvent.map(event => {
          event = {...event, specificColor: index}
          allEvent = [...allEvent, event]
        })
      })

      this.setState({
        eventsCalendar: displayAllEvent(allEvent, this.props.typeEvent)
      })
    })
  }

  _addParticipant() {
    getUsersWithPaging()
      .then(data => {
        var participant = data.data.find(element => element.Email === this.inputInvitedPeople)

        // On regarde si le participant est connu de la base
        if (participant === undefined) {
          Alert.alert(
           'Personne non existante',
           "Nous ne connaissons pas la personne que vous essayé d'ajouter.",
           [
             {text: 'OK'},
           ],
           {cancelable: false},
         )
         return
        }

        // On regarde si le participant n'est pas déjà dans la liste
        const exist = this.state.invitedPeople.find(item => item.Id === participant.Id)
        if (exist !== undefined) {
          Alert.alert(
           'Attention',
           "Vous essayé d'ajouter une personne qui participe déjà à l'évènement",
           [
             {text: 'OK'},
           ],
           {cancelable: false},
         )
         return
        }

        getEventByIdUser(participant.Id)
          .then(data => {
            data.data.sort((a, b) => new Date(...a.Start.split('/').reverse()) - new Date(...b.Start.split('/').reverse()));
            data.data.map(event => {
              event.Start = moment(new Date(event.Start)).subtract(2, 'h')
              event.End = moment(new Date(event.End)).subtract(2, 'h')
            })
            this.setState({
              events: [...this.state.events, { participantId: participant.Id, participantEvent: data.data }]
            }, () => {
              var allEvent = []
              this.state.events.map((events, index) => {
                events.participantEvent.map(event => {
                  event = {...event, specificColor: index}
                  allEvent = [...allEvent, event]
                })
              })
              this.setState({
                eventsCalendar: displayAllEvent(allEvent, this.props.typeEvent)
              })
            })
          })
          .catch(error => {
            console.log(error)
          })

        // var allInvitedPeople = []
        // this.state.invitedPeople.map((invitedPeople, index) => {
        //   invitedPeople = {...invitedPeople, specificColor: index}
        //   allInvitedPeople = {...allInvitedPeople, invitedPeople}
        // })

        console.log(this.state.invitedPeople)

        this.setState({
          invitedPeople: [...this.state.invitedPeople, {...participant, specificColor: this.state.invitedPeople.length}],
          dialogVisible: false
        }, () => console.log(this.state.invitedPeople))


      })
      .catch(error => {
      console.log(error)
    })
  }

  _addTitleDescription() {
    if (this.state.newEvent.Start === undefined || this.state.newEvent.End === undefined) {
      Alert.alert(
       'Horaire',
       'Choisissez une horaire de début et de fin d\'évènement.',
       [
         {text: 'OK'},
       ],
         {cancelable: false},
       )
     return
    }
    if (this.state.newEvent.End.isBefore(this.state.newEvent.Start, 'minute')) {
      Alert.alert(
       'Horaire',
       'La date de fin ne peut pas être avant la date de début.',
       [
         {text: 'OK'},
       ],
         {cancelable: false},
       )
     return
    }

    this.setState({
      dialogTitleDescVisible: true
    })
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
        newEvent: {...this.state.newEvent, CreatedId: data.data[0].Id, IdUsers: idUsers, Title: this.inputTitle, Description: this.inputDescription}
      }, () => {
        insertEventWithParticipant(this.state.newEvent)
          .then(data => {

          })
          .catch(error => {
            console.log(error)
            Alert.alert(
             'Réseau',
             'Problème de réseau',
             [
               {text: 'OK'},
             ],
             {cancelable: false},
           )
          })
      })

      this.setState({
        dialogTitleDescVisible: false
      })

      this.props.navigation.navigate('HomePage')
    })
    .catch(error => {
      console.log(error)
    })
  }

  _deleteInvitedPeopleFromEvent = (idPeople) => {
    console.log(idPeople)
    const invitedPeopleIndex = this.state.invitedPeople.findIndex(item => item.Id === idPeople)
    const eventIndex = this.state.events.findIndex(item => item.participantId === idPeople)

    if (invitedPeopleIndex !== -1) {
      this.setState({
        invitedPeople: this.state.invitedPeople.filter((item, index) => index !== invitedPeopleIndex),
        events: this.state.events.filter((item, index) => index !== eventIndex)
      })
    }

    var allEvent = []
    this.state.events.map((events, index) => {
      events.participantEvent.map(event => {
        event = {...event, specificColor: index}
        allEvent = [...allEvent, event]
      })
    })
    this.setState({
      eventsCalendar: displayAllEvent(allEvent, this.props.typeEvent)
    })

    var allParticipant = []
    this.state.invitedPeople.map((invitedPeople, index) => {
      invitedPeople = {...invitedPeople, specificColor: index}
      allParticipant = [...allParticipant, invitedPeople]
    })
    this.setState({
      invitedPeople: allParticipant
    })

  }

  _showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  _handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  _handleTitleCancel = () => {
    this.setState({ dialogTitleDescVisible: false });
  };

  render() {
    return (
      <LinearGradient colors={['#FFFFFF', '#949494']} style={styles.main_container}>
        <Dialog.Container visible={ this.state.dialogTitleDescVisible }>
          <Dialog.Description>
            Remplissez le titre et la description de l'évènement.
          </Dialog.Description>
          <Dialog.Input style={styles.inputDialog} placeholder='Titre' onChangeText = {(text) => { this.inputTitle = text }}/>
          <Dialog.Input style={styles.inputDialog} placeholder='Description' multiline={true} numberOfLines={4} onChangeText = {(text) => { this.inputDescription = text }}/>
          <Dialog.Button label="Retour"  onPress={() => { this._handleTitleCancel() }} />
          <Dialog.Button label="Ajouter" onPress={() => { this._createNewEvent() }} />
        </Dialog.Container>
        <Dialog.Container visible={ this.state.dialogVisible }>
          <Dialog.Title>Ajout un participant</Dialog.Title>
          <Dialog.Description>
            Veuillez inscrire l'adresse mail du participant.
          </Dialog.Description>
          <Dialog.Input style={styles.inputDialog} onChangeText = {(text) => { this.inputInvitedPeople = text }}/>
          <Dialog.Button label="Retour"  onPress={() => { this._handleCancel() }} />
          <Dialog.Button label="Ajouter" onPress={() => { this._addParticipant() }} />
        </Dialog.Container>

        <Calendar
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
              <TouchableOpacity onPress={this._showStartDateTimePicker}>
                <Text style={styles.display}>Début de l'évènement</Text>
                <Text>{this.state.startDateDisplay}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.startDateTimePickerVisible}
                onConfirm={this._handleStartDatePicked}
                onCancel={this._hideStartDateTimePicker}
                mode={'datetime'}
                date={new Date(moment(new Date()).add(1, 'h'))}
                is24Hour={true}
                minimumDate={new Date()}
                datePickerModeAndroid={'spinner'}
              />
              <TouchableOpacity onPress={this._showEndDateTimePicker}>
                <Text style={styles.display}>Fin de l'évènement</Text>
                <Text>{this.state.endDateDisplay}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.endDateTimePickerVisible}
                onConfirm={this._handleEndDatePicked}
                onCancel={this._hideEndDateTimePicker}
                mode={'datetime'}
                date={new Date(moment(new Date()).add(2, 'h'))}
                is24Hour={true}
                minimumDate={new Date()}
                datePickerModeAndroid={'spinner'}
              />
            </View>
          </View>
          <View style={styles.invitedPeople_container}>
            <Button
              onPress={() => { this._showDialog() }}
              title="Ajouter un participant"
              color='#07975A'
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
  },
  inputDialog: {
    borderColor: 'black',
    borderWidth: Platform.OS === 'android' ? 1 : 0
  }
})

const mapStateToProps = state => {
  return {
    typeEvent: state.api.typeEvent,
    user: state.loginUser.user
  }
}

export default connect(mapStateToProps)(NewEvent)
