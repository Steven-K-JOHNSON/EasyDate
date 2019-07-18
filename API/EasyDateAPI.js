import moment from 'moment'

const axios = require('axios');

const AUTH_API = "ab08edce-d6fa-4780-88bf-d1dd3ba02f56"
const urlRead = "http://35.159.45.109:8090"
const urlWrite = "http://18.184.113.182:8091"

export function getUserByEAndP(mail, password) {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/MOBILE/GET/user/getUserByEAndP', {
        AuthAPI: AUTH_API,
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

export function getEventByIdUser(id) {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/MOBILE/GET/other/getEventByIdUser', {
      AuthAPI: AUTH_API,
      Id: id
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

export function getEventType() {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/MOBILE/GET/other/getEventType', {
      AuthAPI: AUTH_API
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

export function getUserByIdEvent(id) {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/MOBILE/GET/user/getUserByIdEvent', {
      AuthAPI: AUTH_API,
      Id: id
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

export function getUsersWithPaging() {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/WEB/GET/user/getUsersWithPaging', {
      AuthAPI: AUTH_API,
      NumPage: 1,
      NbItem: 100000
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

export function insertDate(date) {
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/WEB/SET/Date/insertDate', {
      AuthAPI: AUTH_API,
      Date: date,
      Timezone: "2"
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

export function insertEventWithParticipant(newEvent) {
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/MOBILE/SET/other/insertEventWithParticipant', {
      AuthAPI: AUTH_API,

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
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function insertUserWithSelfGroup(newUser) {
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/WEB/SET/user/insertUserWithSelfGroup', {
      AuthAPI: AUTH_API,

      PlayerName: newUser.PlayerName,
    	Name: newUser.Name,
    	LastName: newUser.LastName,
    	Email: newUser.Email,
    	Password: newUser.Password,
    	Role: 2,
    	GroupName: newUser.Name + ' ' + newUser.LastName + ' Group',
    	GroupDescription: newUser.Name + ' ' + newUser.LastName + ' Group description',
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

export function insertAgenda(groupId) {
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/WEB/SET/Agenda/insertAgenda', {
      AuthAPI: AUTH_API,

      GroupId: groupId,
    	DayEnd: "2020-12-12 23:59:59",
    	DayStart: "2019-01-01 00:00:01",
    	DefaultDuration: "10"
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

export function getSelfGroupByIdUser(id) {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/WEB/GET/group/getSelfGroupByIdUser', {
      AuthAPI: AUTH_API,

      Id: id
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
