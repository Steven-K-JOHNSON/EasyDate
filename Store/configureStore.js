// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import api from './Reducers/apiReducer'
import loginUser from './Reducers/userReducer'

export default createStore(combineReducers({loginUser, api}))
