
const defState = [
]

export const itemsReducer = (state = defState, action) => {
  switch (action.type) {
      case 'add_item':
      // console.log('reduser: add_item', state, action)
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: action.completed,
          groupId: action.groupId
        }
      ]

    case 'toggle_item':
      // console.log('reduser: toggle_item', state)
      return state.map(it =>
        (it.id === action.id)
          ? {...it, completed: !it.completed}
          : it
      )

    case 'remove_item':
      return state.filter(it => it.id !== action.id)

    default:
      return state
  }
}
