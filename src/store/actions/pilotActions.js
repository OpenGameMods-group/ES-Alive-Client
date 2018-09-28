import {
  UPLOAD_PILOT, UPLOAD_PILOT_SUCCESS, UPLOAD_PILOT_FAILURE,
  DOWNLOAD_PILOTS, DOWNLOAD_PILOTS_SUCCESS, DOWNLOAD_PILOTS_FAILURE
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

export const downloadPilots = ({user, levelLimit}) => dispatch => {
  try {
    dispatch({ type: DOWNLOAD_PILOTS })

    console.log('downloading: ', user, levelLimit)

    listenersWrapper({
      dispatch,
      listeners: [ DOWNLOAD_PILOTS_SUCCESS, DOWNLOAD_PILOTS_FAILURE ]
    })

    ipcRenderer.send(DOWNLOAD_PILOTS, { user, levelLimit })
  } catch (error) {
    cleanListeners(DOWNLOAD_PILOTS_SUCCESS, DOWNLOAD_PILOTS_FAILURE)

    return dispatch({ type: DOWNLOAD_PILOTS_FAILURE, error })
  }
}
