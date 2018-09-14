// reducers/index.js - root reducer

import { combineReducers } from 'redux'
import configReducer from './configReducer'
import userReducer from './userReducer'

// root reducer
export default combineReducers({
  config: configReducer,
  user: userReducer
})
