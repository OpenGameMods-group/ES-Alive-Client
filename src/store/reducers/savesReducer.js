
import {
  GET_SAVES, GET_SAVES_SUCCESS, GET_SAVES_FAILURE,
  READ_SAVE, READ_SAVE_SUCCESS, READ_SAVE_FAILURE
} from 'store/actions/types'

const defaultState = {
  saveDir: [],
  pilotData: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SAVES_SUCCESS:
      return {
        ...state,
        saveDir: action.payload
      }
    case READ_SAVE_SUCCESS:
      return {
        ...state,
        pilotData: action.payload
      }
    case GET_SAVES_FAILURE:
      return state
    default:
      return state
  }
}
