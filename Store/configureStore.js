// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import loginUser from './Reducers/userReducer'

export default createStore(loginUser)
