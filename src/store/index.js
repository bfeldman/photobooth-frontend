import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  userId: null,
  username: "",
  photos: [],
  albums: [],
  userIsPublic: true,
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
        albums: action.payload.albums,
        userIsPublic: action.payload.userIsPublic,
        loggedIn: true
      })
    
    /* clears user info from redux state */
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        userId: null,
        username: "",
        photos: [],
        albums: [],
        userIsPublic: true,
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
      
    case 'ADD_ALBUM':
    return Object.assign({}, state, {
      albums: [...state.albums, action.payload.album]
    })
    
    /* updates username in redux state */
    case 'UPDATE_USERNAME':
      return Object.assign({}, state, {
        username: action.payload.username
      })
      
    case 'UPDATE_IS_PUBLIC':
      return Object.assign({}, state, {
        userIsPublic: action.payload.userIsPublic
      })
    
    default:
      return state
  }
}

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const persistor = persistStore(store)

export {store, persistor}