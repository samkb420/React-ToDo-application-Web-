let nextId = 1

export const createGroup = text => {
  return {
    type: 'create_group',
    id: nextId++,
    text
  }
}

export const removeGroup = id => {
  return {
    type: 'remove_group',
    id
  }
}

export const currentGroup = id => {
  return {
    type: 'current_group',
    id
  }
}
