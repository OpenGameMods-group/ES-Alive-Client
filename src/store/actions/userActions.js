import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE } from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

export const getUser = (lastUser) => dispatch => {
  const { ipcRenderer } = window.electron

  try {
    dispatch({ type: GET_USER, user: lastUser })

    ipcRenderer.send(GET_USER, lastUser)

    listenersWrapper(dispatch, GET_USER_SUCCESS, GET_USER_FAILURE)
  } catch (error) {
    cleanListeners(GET_USER_SUCCESS, GET_USER_FAILURE)
    return dispatch({ type: GET_USER_FAILURE, error })
  }
}
