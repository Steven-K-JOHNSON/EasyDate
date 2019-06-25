const axios = require('axios');

const API_TOKEN = "FeNBGjzDG354@ofe*$32Rfsss4F"
const url = "http://35.159.45.109:8090"

export function getUserByEAndP2(mail, password) {
  return axios.post(url + '/API/WEB/GET/User/getUserByEAndP', {
    wsPassword: API_TOKEN,
    mail: mail,
    password: password
  })
}

export function getUserByEAndP(mail, password) {
  return new Promise((resolve, reject) => {
    axios.post(url + '/API/WEB/GET/User/getUserByEAndP', {
      wsPassword: API_TOKEN,
      mail: mail,
      password: password
    }).then(response => {
      if (response.status === 401) {
        reject(Error("UNAUTHORIZED"))
      }
      resolve(data)
    }).catch(error => {
      reject(error);
    })
  });
}
