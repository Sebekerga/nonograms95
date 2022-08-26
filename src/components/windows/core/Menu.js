export const menu_item_types = {
  folder: 0,
  entry: 1,
  divider: 2
}

export const menu_entry = (title, action) => ({
  type: menu_item_types.entry,
  title,
  action
})

export const menu_folder = (title, content) => ({
  type: menu_item_types.folder,
  title,
  content
})

export const menu_devider = () => ({
  type: menu_item_types.divider
})