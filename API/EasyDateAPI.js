const axios = require('axios');

const AUTH_API = "ab08edce-d6fa-4780-88bf-d1dd3ba02f56"
const url = "http://35.159.45.109:8090"

export function getUserByEAndP2(mail, password) {
  return axios.post(url + '/API/MOBILE/GET/user/getUserByEAndP', {
      AuthAPI: AUTH_API,
      Email: mail,
      Password: password
  })
}

export function getUserByEAndP(mail, password) {
  return new Promise((resolve, reject) => {
    axios.post(url + '/API/MOBILE/GET/user/getUserByEAndP', {
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
    axios.post(url + '/API/MOBILE/GET/other/getEventByIdUser', {
      AuthAPI: AUTH_API,
      Id: id
    }, {
      headers: {
            'Content-Type': 'application/json',
      }
    }).then(data => {
      console.log("THEN")
      console.log(data)
      resolve(response)
    }).catch(error => {
      console.log("CATCH")
      console.log(error)
      reject(error)
    })
  })
}
