import { createStore } from 'redux'

const initialState = {
  userId: null,
  username: "",
  photos: [],
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        userId: action.payload.userId,
        username: action.payload.username,
        photos: action.payload.photos,
        loggedIn: true
      })
    
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        userId: null,
        username: "",
        photos: [],
        loggedIn: false
      })
      
    case 'ADD_PHOTO':
      return Object.assign({}, state, {
        photos: [...state.photos, action.payload.photo]
      })
    
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store