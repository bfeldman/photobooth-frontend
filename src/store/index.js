import { createStore } from 'redux'

const initialState = {
  user_id: null,
  username: "",
  photos: [],
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user_id: action.payload.user_id,
        username: action.payload.username,
        photos: action.payload.photos,
        loggedIn: !!action.payload.user_id
      })
    
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        user_id: null,
        username: "",
        photos: [],
        loggedIn: false
      })
    
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store