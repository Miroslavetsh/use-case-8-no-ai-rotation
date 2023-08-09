import { legacy_createStore as createStore } from 'redux'

const initialState = {
  first_name: 'fName',
  last_name: 'lName',
  email: 'email',
  message: 'message',
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/first_name':
      return { ...state, ...action.payload }
    case 'user/last_name':
      return { ...state, ...action.payload }
    case 'user/email':
      return { ...state, ...action.payload }
    case 'user/message':
      return { ...state, ...action.payload }
    case 'user/full_state':
      return action.payload
    default:
      return state
  }
}

const store = createStore(userReducer)

export default store
