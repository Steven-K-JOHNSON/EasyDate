const axios = require('axios');

const API_TOKEN = "FeNBGjzDG354@ofe*$32Rfsss4F"
const url = "http://35.159.45.109:8090"

export function getUserByEAndP(mail, password) {
  return axios.post(url + '/API/WEB/GET/User/getUserByEAndP', {
    wsPassword: API_TOKEN,
    mail: mail,
    password: password
  })
}
