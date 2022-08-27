import { useDispatch, useSelector } from "react-redux"
import { Button, Divider, List, ListItem, Toolbar, Window, WindowContent, WindowHeader } from "react95"
import { menu_item_types } from "../app/menu"
import './WindowSeb.css'
import { closeWindow, updateMenu } from "../features/windowsReducer"
import { useTheme } from "styled-components"
import { resolveType } from "../app/windows"

const WindowSeb = ({ id: window_id }) => {

  const dispatch = useDispatch()
  const theme = useTheme()

  const MenuFolder = (props) => {

    const windows_menu = useSelector(state => state.windows.windows.find(w => w.id === window_id).menu)
    const open = windows_menu[props.level] === props.title

    const if_active_style = open ? {
      backgroundColor: theme.headerBackground,
      color: theme.headerText
    } : undefined

    const toggleMenu = () => {
      open
        ? closeMenu()
        : openMenu()
    }

    const openMenu = () => {
      dispatch(updateMenu({
        id: window_id,
        menu: windows_menu.filter((_, i) => i < props.level).concat(props.title)
      }))
    }

    const closeMenu = () => {
      dispatch(updateMenu({
        id: window_id,
        menu: windows_menu.filter((_, i) => i < props.level)
      }))
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

    const handleMenuSelection = (action) => {
      dispatch(updateMenu({ id: window_id, menu: [] }))
      action(dispatch)
    }

    const level = props.root
      ? 0
      : props.level
        ? props.level
        : 0

    return props.description.map((item, i) => {
      switch (item.type) {
        case menu_item_types.folder:
          return item.content.length
            ? <MenuFolder key={i} title={item.title} variant={props.root ? 'menu' : 'submenu'} level={level}>
              <Menu description={item.content} root={false} level={level + 1} />
            </MenuFolder>
            : <ListItem key={i} size='sm' disabled>{item.title}</ListItem>
        case menu_item_types.entry:
          return <ListItem key={i} size='sm' onClick={() => handleMenuSelection(item.action)}>{item.title}</ListItem>
        default:
          return <Divider key={i} />
      }
    })
  }

  const window_data = useSelector(state => state.windows.windows.find(w => w.id === window_id))
  const window_content = resolveType(window_data.type, window_id)

  const closeThisWindow = () => {
    dispatch(closeWindow(window_id))
  }

  return <Window className='window' style={{ zIndex: `${window_data.z}` }}>
    <WindowHeader className='header'>
      <span className='header'>{window_content.title}</span>
      <Button className='header' onClick={closeThisWindow}>X</Button>
    </WindowHeader>
    <Toolbar style={{ paddingTop: '2px', padding: '0px' }}>
      <Menu description={window_content.menu} root={true} />
    </Toolbar>
    <WindowContent style={{ padding: '4px' }}>
      {window_content.content}
    </WindowContent>
  </Window>
}

export default WindowSeb