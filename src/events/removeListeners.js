// TODO: not working for some reason - use .once instead

const removeListeners = (ipc, listeners) => {
  listeners.forEach(([ channel, func ]) => {
    console.log('removing: ', channel, func)
    ipc.removeListener(channel, func)
  })
}

export default removeListeners
