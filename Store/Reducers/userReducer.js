// Store/Reducers/favoriteReducer.js

const initialState = { user: undefined }

function loginUser(state = initialState, action) {
  let nextState
  
  switch (action.type) {
    case 'LOGIN_USER':
      nextState = {
        ... state,
        user: action.value
      }
      return nextState || state
  default:
    return state
  }
}

export default loginUser
