import {
  GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE,
  SIGNOUT, SIGNIN, SIGNIN_FAILURE, SIGNIN_SUCCESS
} from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

const { ipcRenderer } = window.electron

export const getUser = (lastUser) => dispatch => {
  try {
    dispatch({ type: GET_USER, user: lastUser })

    ipcRenderer.send(GET_USER, lastUser)

    listenersWrapper({ dispatch, listeners: [ GET_USER_SUCCESS, GET_USER_FAILURE ] })
  } catch (error) {
    cleanListeners(GET_USER_SUCCESS, GET_USER_FAILURE)
    return dispatch({ type: GET_USER_FAILURE, error })
  }
}

export const signout = () => dispatch => {
  try {
    window.localStorage.setItem('user', '')

    return dispatch({ type: SIGNOUT })
  } catch (error) {
    return error
  }
}

export const signin = ({ username, password, history }) => dispatch => {
  try {
    const user = { username, password }

    dispatch({ type: SIGNIN, payload: user })

    console.log('signing in ', user)

    ipcRenderer.send(SIGNIN, user)

    listenersWrapper({
      dispatch,
      listeners: [ SIGNIN_SUCCESS, SIGNIN_FAILURE ],
      callback: (listener, data) => {
        if (listener === SIGNIN_SUCCESS) {
          window.localStorage.setItem('user', data.username)
          history.push('/')
        } else {
          console.log('signin error')
        }
      }
    })
  } catch (error) {
    console.log('signing in error', error)
    cleanListeners(SIGNIN_SUCCESS, SIGNIN_FAILURE)
    return dispatch({ type: SIGNIN_FAILURE, error })
  }
}
