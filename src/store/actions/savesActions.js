import { GET_SAVES, GET_SAVES_SUCCESS, GET_SAVES_FAILURE } from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

const { ipcRenderer } = window.electron

export const getSaves = () => dispatch => {
  try {
    dispatch({ type: GET_SAVES })

    listenersWrapper({
      dispatch,
      listeners: [ GET_SAVES_SUCCESS, GET_SAVES_FAILURE ]
    })

    ipcRenderer.send(GET_SAVES)
  } catch (error) {
    cleanListeners(GET_SAVES_SUCCESS, GET_SAVES_FAILURE)

    return dispatch({ type: GET_SAVES_FAILURE, error })
  }
}
