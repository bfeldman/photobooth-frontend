import { createStore } from 'redux'

const initialState = {
  userId: null,
  username: "",
  photos: [],
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    /* sets useful user info in redux state */
    case 'SET_USER':
      return Object.assign({}, state, {
        userId: action.payload.userId,
        username: action.payload.username,
        photos: action.payload.photos,
        loggedIn: true
      })
    
    /* clears user info from redux state */
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        userId: null,
        username: "",
        photos: [],
        loggedIn: false
      })
    
    /* adds a photo create by a user to redux state */
    case 'ADD_PHOTO':
      return Object.assign({}, state, {
        photos: [...state.photos, action.payload.photo]
      })
    
    /* removes a photo create by a user from redux state */
    case 'DELETE_PHOTO':
      const newPhotos = state.photos.filter(photo => photo.id !== action.payload.photoId)
      return Object.assign({}, state, {
        photos: newPhotos
      })
    
    /* updates username in redux state */
    case 'UPDATE_USERNAME':
      return Object.assign({}, state, {
        username: action.payload.username
      })
    
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store