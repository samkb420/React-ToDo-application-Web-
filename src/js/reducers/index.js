import { combineReducers } from 'redux'
import { itemsReducer } from './sub/ItemsReducer'
import authReducer from './sub/authReducer'

// const defState = {
//   counter: 0
// }
//
// const couterResucer = (state = defState, action) => {
//   switch(action.type) {
//     case 'increment':
//       return Object.assign({}, state,
//         {
//           counter: state.counter + 1
//         })
//     case 'decrement':
//       return Object.assign({}, state,
//         {
//           counter: state.counter - 1
//         })
//     default:
//       return state
//   }
// }

export const rootReducer = combineReducers({
  itemsReducer,
  authReducer
  // Groups
})
