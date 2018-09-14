// reducers/index.js - root reducer

import { combineReducers } from 'redux'
import configReducer from './configReducer'

// root reducer
export default combineReducers({
  config: configReducer,
  user: (state = null, action) => state
})
