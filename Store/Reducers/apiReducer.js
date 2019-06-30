// Store/Reducers/favoriteReducer.js

const initialState = { typeEvent: undefined }

function api(state = initialState, action) {
  let nextState

  switch (action.type) {
    case 'SET_TYPE_EVENT':
      nextState = {
        ... state,
        typeEvent: action.value
      }
      return nextState || state
  default:
    return state
  }
}

export default api
