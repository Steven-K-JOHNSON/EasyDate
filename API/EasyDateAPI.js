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
      console.log("response : " + response.status)
      resolve(response)
    }).catch(error => {
      console.log(error)
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
  console.log(newEvent)
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/MOBILE/SET/other/insertEventWithParticipant', {
      AuthAPI: AUTH_API,

      AgendaId: "f7249dad-6aa0-4b2f-bef9-b624e5d34dd1",
    	TypeId: newEvent.TypeId,
    	Start: moment(newEvent.Start).format('YYYY-MM-DD HH:mm'),
    	End: moment(newEvent.End).format('YYYY-MM-DD HH:mm'),
    	CreatedId: newEvent.CreatedId,
    	Title: newEvent.Title,
    	Description: newEvent.Description,
    	IsPublic: 1,
    	IdUsers: newEvent.IdUsers
    }, {
      headers: {
            'Content-Type': 'application/json',
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
