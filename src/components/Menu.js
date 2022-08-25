import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Divider, List, ListItem } from "react95"
import { useTheme } from "styled-components"

const menu_item_types = {
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

const MenuFolder = (props) => {

  const menu = useSelector(state => state.windows.windows[0].menu)
  const open = menu[props.level] === props.title

  const theme = useTheme()
  const if_active_style = open ? {
    backgroundColor: theme.headerBackground,
    color: theme.headerText
  } : undefined

  const toggleMenu = () => {
    // setOpen(!open)
  }

  const closeMenu = () => {
    // setOpen(false)
  }

  return <div className={props.variant}>
    {props.variant === 'submenu'
      ?
      <ListItem style={if_active_style}
        size='sm' onClick={toggleMenu} active={open} disabled={props.disabled}>
        {props.title}
      </ListItem>
      : <Button size='sm' variant='menu' onClick={toggleMenu} active={open} disabled={props.disabled}>
        {props.title}
      </Button>}
    {open && <List className={props.variant} open={open}>
      {props.children}
    </List>}
  </div>
}


const Menu = (props) => {

  const level = props.root
    ? 0
    : props.level
      ? props.level
      : 0

  return props.description.map(item => {
    switch (item.type) {
      case menu_item_types.folder:
        return <MenuFolder title={item.title} variant={props.root ? 'menu' : 'submenu'} level={level}>
          <Menu description={item.content} root={false} level={level+1}/>
        </MenuFolder>
      case menu_item_types.entry:
        return <ListItem size='sm' onClick={item.action}>{item.title}</ListItem>
      default:
        return <Divider />
    }
  })
}

export default Menu