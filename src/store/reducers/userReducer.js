
import { types } from 'store/actions'

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...action.payload
      }

    case types.SIGNOUT:
      return null

    default: return state
  }
}
