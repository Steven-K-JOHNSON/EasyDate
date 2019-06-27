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

export function insertUser() {
  axios.post('http://18.184.113.182:8091/API/WEB/SET/user/insertUser', {
    AuthAPI: 'ab08edce-d6fa-4780-88bf-d1dd3ba02f56',
    Id: 'f220da48-c3bd-4d7e-9d32-0ca1ffecdf3a',
    PlayerName: 'Holla',
    Name: 'HEYWAIYY',
    LastName: 'Allo',
    Email: 'BOULOTT.allo@gmail.com',
    Password: 'damn',
    Role: '2'
  }, {
    headers: {
          'Content-Type': 'application/json',
    }
  }).then(data => {
    console.log("THEN")
    console.log(data)
  }).catch(error => {
    console.log("CATCH")
    console.log(error)
  })
}
