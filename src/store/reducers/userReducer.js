
import { types } from 'store/actions'

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
    case types.SIGNIN_SUCCESS:
      return {
        ...action.payload
      }
    case types.SIGNIN_FAILURE:
      return state

    case types.SIGNOUT:
      return null

    default: return state
  }
}
