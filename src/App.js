import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { loadPuzzle } from "./features/nonogramPuzzleReducer";
import { useTheme } from 'styled-components';
import { getNonogramClues, getNonogramsList } from './services/nonograms';
import { useEffect } from 'react';
import WindowSeb, { window_types } from './components/windows/core/WindowSeb';
import { closeWindow, newWindow } from './features/windowsReducer'

const App = () => {

  const dispatch = useDispatch()

  // opening nonograms window
  useEffect(() => {
    dispatch(newWindow({
      id: 'non_puzzle_1',
      type: window_types.nonogram_puzzle
    }))
  }, [])

  const window_ids = (useSelector(state => state.windows.windows)).map(w => w.id)

  return (
    <div className='centered' style={{ backgroundColor: useTheme().desktopBackground, }}>
      <div className='windows-conteiner'>
        {window_ids.map(win_id => <WindowSeb id={win_id} key={win_id}/>)}
      </div>
    </div>
  )
}

export default App;