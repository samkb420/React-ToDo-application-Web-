
export const addTodo = (list, item) => [...list, item]

export const generateUniqueId = () => Math.floor(Math.random()*100000)

//#13: bind with null 1-st argument means don't override function context
//seems agrument is inserted to the front
export const partial = (f, ...arg) => f.bind(null, ...arg)

const pipe2 = (f, g) => (...arg) => g(f(...arg))

//#14: list.reduce(func) takes 2 items from `list` and put them as arguments to `func()`
export const pipe = (...fns) => fns.reduce(pipe2)

export const removeTodo = (list, id) => list.filter(it => it.id !== id)

export const switchTodo = (list, id) => {
  const updateIndex = list.findIndex(item => item.id === id)
  const toUpdateTodo = list.find(item => item.id === id)
  return [
    ...list.slice(0, updateIndex),
    {...toUpdateTodo, isComplete: !toUpdateTodo.isComplete},
    ...list.slice(updateIndex+1)
  ]
}

export const getTodos = (route, todos) => {
  switch (route) {
    case 'active':
      return todos.filter(it => !it.isComplete)
    case 'complete':
      return todos.filter(it => it.isComplete)
    default:
      return todos
  }
}
