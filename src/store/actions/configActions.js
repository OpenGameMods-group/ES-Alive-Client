import { GET_CONFIG, GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE } from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

const { ipcRenderer } = window.electron

export const getConfig = () => dispatch => {
  try {
    dispatch({ type: GET_CONFIG })

    listenersWrapper({
      dispatch,
      listeners: [ GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE ]
    })

    ipcRenderer.send(GET_CONFIG)
  } catch (error) {
    cleanListeners(GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE)

    return dispatch({ type: GET_CONFIG_FAILURE, error })
  }
}
