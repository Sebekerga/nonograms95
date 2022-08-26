// this file is inteded for declaration of all posible meni items

export const menu_item_types = {
  folder: 0,
  entry: 1,
  divider: 2
}

const entry = (title, action) => ({
  type: menu_item_types.entry,
  title,
  action
})

const folder = (title, content) => ({
  type: menu_item_types.folder,
  title,
  content
})

const devider = () => ({
  type: menu_item_types.divider
})

export const menu_items = { entry, folder, devider }