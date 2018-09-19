
export const cleanListeners = (...listeners) => {
  listeners.forEach(listener => {
    window.electron.ipcRenderer.removeAllListeners(listener)
  })
}

// handles generic listeners with success/fail, cleanup
export const listenersWrapper = ({ dispatch, callback = null, listeners }) => {
  const { ipcRenderer } = window.electron

  listeners.forEach(listener => {
    ipcRenderer.once(listener, (event, data) => {
      cleanListeners(...listeners)
      dispatch({ type: listener, payload: data })

      if (callback) {
        callback(listener, data)
      }
    })
  })
}

export default listenersWrapper

// listenersWrapper basically does this:

// ipcRenderer.once(GET_CONFIG_SUCCESS, (event, config) => {
//   cleanListeners(GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE)
//   dispatch({ type: GET_CONFIG_SUCCESS, payload: config })
// })

// ipcRenderer.once(GET_CONFIG_FAILURE, (event, error) => {
//   cleanListeners(GET_CONFIG_SUCCESS, GET_CONFIG_FAILURE)
//   dispatch({ type: GET_CONFIG_FAILURE, payload: error })
// })
