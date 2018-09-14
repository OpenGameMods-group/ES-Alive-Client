// configureStore.js - creates a Redux store

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from 'store/reducers'

const configureStore = () => {
  // TODO: preload state
  const store = createStore(reducers, {}, applyMiddleware(thunk))

  return store
}

export default configureStore
