
import { types } from 'store/actions'

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
    case types.SIGNIN_SUCCESS:
      console.log('signin reducer: ', action)
      return {
        ...action.payload
      }
    case types.SIGNIN_FAILURE:
      console.log('reducer sigin failure')
      return state

    case types.SIGNOUT:
      return null

    default: return state
  }
}
