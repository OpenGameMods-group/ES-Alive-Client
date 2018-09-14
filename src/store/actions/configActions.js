import { GET_CONFIG, GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE } from './types'

import { listenersWrapper, cleanListeners } from './listenerUtil'

export const getConfig = () => async dispatch => {
  const { ipcRenderer } = window.electron

  try {
    dispatch({ type: GET_CONFIG })

    ipcRenderer.send(GET_CONFIG)

    listenersWrapper(dispatch, GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE)
  } catch (error) {
    cleanListeners(GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE)
    return dispatch({ type: GET_CONFIG_FAILURE, error })
  }
}
