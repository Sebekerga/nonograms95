import './App.css'
import { Window, WindowHeader, WindowContent } from "react95";
import { useDispatch } from "react-redux";
import { loadPuzzle } from "./features/nonogramPuzzleReducer";
import simpleCorner from './puzzles/simplerCorner'
import Puzzle from "./components/NonogramPuzzle";
import { useTheme } from 'styled-components';

const App = () => {

  const dispatch = useDispatch()
  dispatch(loadPuzzle(simpleCorner))

  return (
    <div className="centered" style={{backgroundColor: useTheme().desktopBackground}}>
      <Window>
        <WindowHeader>
          Nonograms
        </WindowHeader>
        <WindowContent>
          <Puzzle />
        </WindowContent>
      </Window>
    </div>
  )
}

export default App;