import { useDispatch, useSelector } from "react-redux"
import { Button, Divider, List, ListItem, Toolbar, Window, WindowContent, WindowHeader } from "react95"
import { menu_item_types } from "./Menu"
import PuzzleWindow from "../NonogramPuzzle"
import './WindowSeb.css'
import { closeWindow, updateMenu } from "../../../features/windowsReducer"
import { useTheme } from "styled-components"


export const window_types = {
  nonogram_puzzle: 0,
  file_browser: 1
}

const resolveType = (type) => {
  switch (type) {
    case window_types.nonogram_puzzle:
      return PuzzleWindow
    default:
      return undefined
  }
}

const WindowSeb = ({ id }) => {

  const dispath = useDispatch()
  const theme = useTheme()

  const MenuFolder = (props) => {

    const windows_menu = useSelector(state => state.windows.windows.find(w => w.id === id).menu)
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
      dispath(updateMenu({
        id,
        menu: windows_menu.filter((_, i) => i < props.level).concat(props.title)
      }))
    }

    const closeMenu = () => {
      dispath(updateMenu({
        id,
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
      dispath(updateMenu({ id, menu: [] }))
      action()
    }

    const level = props.root
      ? 0
      : props.level
        ? props.level
        : 0

    return props.description.map(item => {
      switch (item.type) {
        case menu_item_types.folder:
          return <MenuFolder title={item.title} variant={props.root ? 'menu' : 'submenu'} level={level}>
            <Menu description={item.content} root={false} level={level + 1} />
          </MenuFolder>
        case menu_item_types.entry:
          return <ListItem size='sm' onClick={() => handleMenuSelection(item.action)}>{item.title}</ListItem>
        default:
          return <Divider />
      }
    })
  }

  const window_data = useSelector(state => state.windows.windows.find(w => w.id === id))
  const window_content = resolveType(window_data.type)

  const closeThisWindow = () => {
    dispath(closeWindow(id))
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