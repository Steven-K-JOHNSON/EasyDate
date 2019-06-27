import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import InvitedPeopleItem from './InvitedPeopleItem'

class InvitedPeopleList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      invitedPeople: this.props.invitedPeople
    }
  }

  _deleteInvitedPeopleFromEvent = (idPeople) => {
    const invitedPeopleIndex = this.state.invitedPeople.findIndex(item => item.id === idPeople)
      if (invitedPeopleIndex !== -1) {
        console.log("IF")
        console.log(invitedPeopleIndex)
        this.state.invitedPeople.splice(invitedPeopleIndex, 1)
        console.log(this.state.invitedPeople)

        this.setState({
          invitedPeople: this.state.invitedPeople.length === 0 ? [] : this.state.invitedPeople
        })
      }
  }

  _test = () => {
    var id = this.state.invitedPeople[this.state.invitedPeople.length - 1].id + 1
    console.log(id)
    this.setState({
      invitedPeople: [
        ... this.state.invitedPeople, { id: id, avatar: require('../Images/dylan.png'), firstname: 'Louis', lastname: 'Mantopoulos', role: 'Chef yep'}
      ]
    })
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.invitedPeople}
        extraData={this.state.invitedPeople}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <InvitedPeopleItem
            invitedPeople={item}
            deleteInvitedPeopleFromEvent={this._deleteInvitedPeopleFromEvent}
            test={this._test}
            navigation={this.props.navigation}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
})

export default InvitedPeopleList
