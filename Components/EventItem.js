import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions, ActivityIndicator } from 'react-native'
// import FadeIn from '../Animations/FadeIn'
import moment from 'moment'
import { connect } from 'react-redux'
import { getUserByIdEvent } from '../API/EasyDateAPI'
import { getImage } from '../Tools/ImageTools'

const month = ['Janv.', 'Fev.', 'Mars', 'Avril', 'Mai', 'Juin', 'Jui.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec']

class EventItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      numberParticipants: undefined,
      isLoading: true
    }
  }

  componentWillMount() {
    const { event } = this.props
    getUserByIdEvent(event.Id).then(data => {
      this.setState({
        numberParticipants: data.data.length,
        isLoading: false
      })
    }).catch(error => {
      Alert.alert(
       'Problème',
       "Un problème est survenu lors de la récupération des participants à l'évènement.",
       [
         {text: 'OK'},
       ],
         {cancelable: false},
       )
    })
  }

  render() {
    const { event, displayDetailForEvent } = this.props
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      const photoName = this.props.typeEvent.find((item) => item.Id === event.TypeId).Label
      var icon = getImage(photoName)

      return (
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForEvent(event)}>
          <Image
              style={styles.image}
              source={icon}
              // source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/hoangloi/128.jpg' }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={[styles.title_text, {color: this.props.typeEvent.find((item) => item.Id === event.TypeId).Color }]}>{event.Title}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.date}>{moment(new Date(event.Start)).format('DD')} {month[moment(new Date(event.Start)).format('M') - 1]} - {moment(new Date(event.End)).format('DD')} {month[moment(new Date(event.End)).format('M') - 1]}</Text>
              <Text style={styles.people}>{ this.state.numberParticipants } pers.</Text>
            </View>
          </View>
          <Image
              style={styles.image_next}
              source={require('../Images/next.png')}
          />
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 2
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70/2,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 10,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'center'
  },
  description_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    // fontStyle: 'italic',
    color: '#000000',
    textAlign: 'center',
    fontSize: 14,
    flex: 1,
    margin: 5
  },
  people: {
    // fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    fontSize: 14,
    flex: 1,
    margin: 5
  },
  image_next: {
    width: 30,
    height: 30,
    margin: 10

    // borderRadius: 80/2,
    // borderColor: '#000000',
    // margin: 10,
  }
})

const mapStateToProps = state => {
  return {
    typeEvent: state.api.typeEvent
  }
}

export default connect(mapStateToProps)(EventItem)
