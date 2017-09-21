import { combineReducers } from 'redux'
import { itemsReducer } from './sub/ItemsReducer'
// import { Groups } from './sub/Groups'
// export { DefaultState } from './sub/Helper'

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
  itemsReducer//,
  // couterResucer
  // Groups
})
