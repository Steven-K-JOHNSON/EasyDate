import moment from 'moment'
import { AsyncStorage } from 'react-native'


const axios = require('axios');

const urlRead = "http://api-easydate.com"
const urlWrite = "http://write.api-easydate.com"

export function register(newUser) {
  console.log(newUser)
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/register', {

      Username: newUser.Username,
    	Name: newUser.Name,
    	Lastname: newUser.Lastname,
    	Email: newUser.Email,
    	Password: newUser.Password,
    }, {
      headers: {
            'Content-Type': 'application/json',
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getUserByEAndP(mail, password) {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/login', {
        Email: mail,
        Password: password
      }, {
        headers: {
            'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response)
      if (response.status === 204) {
        reject()
      } else {
        resolve(response)
      }
    }).catch(error => {
      console.log(JSON.stringify(error))
      reject(error);
    })
  });
}

export function getEventOfUser() {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.get(urlRead + '/API/MOBILE/GET/event/getEventOfUser', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getEventType() {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.get(urlRead + '/API/MOBILE/GET/event/getEventTypes', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
      }
    }).then(response => {
      console.log(response)
      resolve(response)
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

export function getEventOfUserId(id) {
  console.log("getEventOfUserId")
  console.log(id)
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlRead + '/API/MOBILE/GET/event/getEventOfUserId', {
      Id: id
    }, {
      headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
      }
    }).then(response => {
      console.log(`getEventOfUserId ${JSON.stringify(response)}`)
      resolve(response)
    }).catch(error => {
      console.log(`getEventOfUserId ERROR ${JSON.stringify(error)}`)
      reject(error)
    })
  })
}

export function getUserByIdEvent(id) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlRead + '/API/MOBILE/GET/user/getUserByIdEvent', {
      Id: id
    }, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getAllUser() {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.get(urlRead + '/API/MOBILE/GET/user/getAllUser', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function insertEventWithParticipant(newEvent) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlWrite + '/API/MOBILE/SET/event/insertEventWithParticipant', {

    	TypeId: newEvent.TypeId,
    	Start: moment(newEvent.Start).format('YYYY-MM-DD HH:mm'),
    	End: moment(newEvent.End).format('YYYY-MM-DD HH:mm'),
    	CreatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
    	Title: newEvent.Title,
    	Description: newEvent.Description,
    	IsPublic: true,
      Owner: newEvent.Owner,
    	IdUsers: newEvent.IdUsers
    }, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getSelfGroupByIdUser(id) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlRead + '/API/WEB/GET/group/getSelfGroupByIdUser', {
      Id: id
    }, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getUserInfo() {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.get(urlRead + '/API/MOBILE/GET/user/getUserInfo', {
      headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function deleteParticipation(eventId) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlWrite + '/API/MOBILE/SET/event/deleteParticipation', {
      EventId: eventId
    }, {
      headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
