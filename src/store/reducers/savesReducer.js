
import { GET_SAVES, GET_SAVES_SUCCESS, GET_SAVES_FAILURE } from 'store/actions/types'

const defaultState = {
  saves: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SAVES_SUCCESS:
      return action.payload
    case GET_SAVES_FAILURE:
      return state
    default:
      return state
  }
}
