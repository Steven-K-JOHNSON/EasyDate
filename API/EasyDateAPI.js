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

export function getUsersWithPaging(numPage, nbItem) {
  return new Promise((resolve, reject) => {
    axios.post(urlRead + '/API/WEB/GET/user/getUsersWithPaging', {
      AuthAPI: AUTH_API,
      NumPage: numPage,
      NbItem: nbItem
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
  console.log("INSERT DATE")
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
  console.log("INSERT NEW EVENT")
  console.log(newEvent)
  return new Promise((resolve, reject) => {
    axios.post(urlWrite + '/API/MOBILE/SET/other/insertEventWithParticipant', {
      AuthAPI: AUTH_API,

      AgendaId: "f7249dad-6aa0-4b2f-bef9-b624e5d34dd1",
    	TypeId: newEvent.TypeId,
    	Start: newEvent.Start,
    	End: newEvent.End,
    	CreatedId: "11eda004-415b-4f80-b498-27c07e973a34",
    	Title: "Deuxieme test",
    	Description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
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
