import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import PeopleItem from './PeopleItem'

class InvitedPeopleList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      invitedPeople: []
    }
  }

  _deleteInvitedPeopleFromEvent = (idPeople) => {
    const favoriteFilmIndex = this.state.invitedPeople.findIndex(item => item.id === idPeople)
      if (invitedPeopleIndex !== -1) {
        this.setState({
          invitedPeople: this.state.invitedPeople.filter((item, index) => index !== invitedPeopleIndex)
        })
      }
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.invitedPeople}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <InvitedPeopleItem
            invitedPeople={item}
            deleteInvitedPeopleFromEvent={this._deleteInvitedPeopleFromEvent}
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
