import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { loadPuzzle } from "./features/nonogramPuzzleReducer";
import { useTheme } from 'styled-components';
import { getNonogramClues, getNonogramsList } from './services/nonograms';
import { useEffect } from 'react';
import WindowSeb, { window_types } from './components/WindowSeb';
import { newWindow } from './features/windowsReducer'

const App = () => {

  const dispatch = useDispatch()

  // // loading puzzle
  // useEffect(() => {
  //   const load_puzzle = async () => {
  //     const all_nonograms = await getNonogramsList()
  //     const first_nonogram_clues = await getNonogramClues(all_nonograms[1].id)
  //     dispatch(loadPuzzle({
  //       id: all_nonograms[1].id,
  //       puzzle: first_nonogram_clues
  //     }))
  //   }
  //   load_puzzle()
  // }, [dispatch])

  // opening nonograms window
  useEffect(() => {
    dispatch(newWindow({
      id: 'non_puzzle_1',
      type: window_types.nonogram_puzzle,
      menu: []
    }))
  }, [])

  const window_ids = (useSelector(state => state.windows.windows)).map(w => w.id)
  console.log(window_ids)

  return (
    <div className='centered' style={{ backgroundColor: useTheme().desktopBackground, }}>
      <div className='windows-conteiner'>
        {window_ids.map(i => <WindowSeb id={i} />)}
      </div>
    </div>
  )
}

export default App;