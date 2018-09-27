import {
  UPLOAD_PILOT, UPLOAD_PILOT_SUCCESS, UPLOAD_PILOT_FAILURE
} from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

const { ipcRenderer } = window.electron

export const uploadPilot = (user, pilotData) => dispatch => {
  try {
    dispatch({ type: UPLOAD_PILOT })

    console.log('uploading: ', user, pilotData)

    listenersWrapper({
      dispatch,
      listeners: [ UPLOAD_PILOT_SUCCESS, UPLOAD_PILOT_FAILURE ]
    })

    ipcRenderer.send(UPLOAD_PILOT, { user, pilotData })
  } catch (error) {
    cleanListeners(UPLOAD_PILOT_SUCCESS, UPLOAD_PILOT_FAILURE)

    return dispatch({ type: UPLOAD_PILOT_FAILURE, error })
  }
}
