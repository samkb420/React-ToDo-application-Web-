const generateUniqueId = () => Math.floor(Math.random()*100000)

export const addItemAction = (text) => ({
  type: 'add_item',
  id: generateUniqueId(),
  text
})

export const toggleItemAction = (id) => {
  // console.log('toggleItemAction', id)
  return {
  type: 'toggle_item',
  id
}
}

export const removeItemAction = (id) => ({
  type: 'remove_item',
  id
})


export const setVisibilityFilterAction = (filter) => ({
  type: 'set_visibility_filter',
  filter
})
