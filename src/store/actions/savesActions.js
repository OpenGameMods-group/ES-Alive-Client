import {
  GET_SAVES, GET_SAVES_SUCCESS, GET_SAVES_FAILURE,
  READ_SAVE, READ_SAVE_SUCCESS, READ_SAVE_FAILURE
} from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

const { ipcRenderer } = window.electron

export const getSaves = (dirname) => dispatch => {
  try {
    dispatch({ type: GET_SAVES })

    listenersWrapper({
      dispatch,
      listeners: [ GET_SAVES_SUCCESS, GET_SAVES_FAILURE ]
    })

    ipcRenderer.send(GET_SAVES, dirname)
  } catch (error) {
    cleanListeners(GET_SAVES_SUCCESS, GET_SAVES_FAILURE)

    return dispatch({ type: GET_SAVES_FAILURE, error })
  }
}

export const readSave = (pilotName) => dispatch => {
  try {
    console.log('reading', pilotName)
    dispatch({ type: READ_SAVE })

    listenersWrapper({
      dispatch,
      listeners: [ READ_SAVE_SUCCESS, READ_SAVE_FAILURE ]
    })

    ipcRenderer.send(READ_SAVE, pilotName)
  } catch (error) {
    cleanListeners(READ_SAVE_SUCCESS, READ_SAVE_FAILURE)

    return dispatch({ type: READ_SAVE_FAILURE, error })
  }
}
