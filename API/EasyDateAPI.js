import moment from 'moment'
import { AsyncStorage } from 'react-native'


const axios = require('axios');

const urlRead = "https://api-easydate.com"
const urlWrite = "https://write.api-easydate.com"

export function insertUserWithSelfGroup(newUser) {
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/WEB/SET/user/insertUserWithSelfGroup', {

      PlayerName: newUser.PlayerName,
    	Name: newUser.Name,
    	Lastname: newUser.Lastname,
    	Email: newUser.Email,
    	Password: newUser.Password,
    	Role: 2,
    	GroupName: newUser.Name + ' ' + newUser.Lastname + ' Group',
    	GroupDescription: newUser.Name + ' ' + newUser.Lastname + ' Group description',
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
      resolve(response)
    }).catch(error => {
      reject(error);
    })
  });
}

export function getEventOfUser(id) {
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
      resolve(response)
    }).catch(error => {
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

export function getUsersWithPaging() {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlRead + '/API/WEB/GET/user/getUsersWithPaging', {
      NumPage: 1,
      NbItem: 100000
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

export function insertDate(date) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlWrite + '/API/WEB/SET/Date/insertDate', {
      Date: date,
      Timezone: "2"
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

export function insertEventWithParticipant(newEvent) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlWrite + '/API/MOBILE/SET/other/insertEventWithParticipant', {

      AgendaId: newEvent.AgendaId,
    	TypeId: newEvent.TypeId,
    	Start: moment(newEvent.Start).format('YYYY-MM-DD HH:mm'),
    	End: moment(newEvent.End).format('YYYY-MM-DD HH:mm'),
    	CreatedId: newEvent.CreatedId,
    	Title: newEvent.Title,
    	Description: newEvent.Description,
    	IsPublic: 1,
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

export function insertAgenda(groupId) {
  return new Promise(async (resolve, reject) => {
    const userToken = await AsyncStorage.getItem('userToken')
    const authorization = 'bearer ' + userToken
    axios.post(urlWrite + '/API/WEB/SET/Agenda/insertAgenda', {
      GroupId: groupId,
    	DayEnd: "2020-12-12 23:59:59",
    	DayStart: "2019-01-01 00:00:01",
    	DefaultDuration: "10"
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
