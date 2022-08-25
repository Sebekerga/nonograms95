import { useSelector } from "react-redux"
import { Toolbar, Window, WindowContent, WindowHeader } from "react95"
import Menu, { descriptionToDOM } from "./Menu"
import PuzzleWindow from "./windows/NonogramPuzzle"
import './WindowSeb.css'


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

  // const dispatch = useDispatch()

  const window_data = useSelector(state => state.windows.windows.find((w => w.id === id)))
  const window_content = resolveType(window_data.type)

  return <Window className='window'>
    <WindowHeader>{window_content.title}</WindowHeader>
    <Toolbar style={{ paddingTop: '2px', padding: '0px' }}>
      <Menu description={window_content.menu} root={true}/>
    </Toolbar>
    <WindowContent style={{ padding: '4px' }}>
      {window_content.content}
    </WindowContent>
  </Window>
}

export default WindowSeb