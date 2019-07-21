import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import InvitedPeopleItem from './InvitedPeopleItem'

class InvitedPeopleList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      invitedPeople: []
    }
  }

  componentWillMount() {
    this.setState({
      invitedPeople: this.props.invitedPeople
    })
  }

  render() {
    console.log(this.props.invitedPeople)
    console.log(JSON.stringify(this.props.invitedPeople))
    if (this.props.invitedPeople.length === 0) {
      return (
        <View style={styles.list_empty}>
          <Text>Personne n'est invité à votre évènement</Text>
        </View>
      )
    } else {
      return (
        <FlatList
          style={styles.list}
          data={this.props.invitedPeople}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({item}) => (
            <InvitedPeopleItem
              invitedPeople={item}
              deleteInvitedPeopleFromEvent={this.props.deleteInvitedPeopleFromEvent}
              displayInvitedPeopleDetail={this.props.displayInvitedPeopleDetail}
              navigation={this.props.navigation}
            />
          )}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  list_empty: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 30
  }
})

export default InvitedPeopleList
