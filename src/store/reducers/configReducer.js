
import * as types from 'store/actions/types'

const defaultState = {
  config: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default: return state
  }
}
