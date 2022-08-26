import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from 'styled-components';
import { useEffect } from 'react';
import WindowSeb from './components/WindowSeb';
import { newWindow } from './features/windowsReducer'
import { window_types } from './app/windows';

const App = () => {

  const dispatch = useDispatch()

  // opening nonograms window
  useEffect(() => {
    dispatch(newWindow({
      id: 'nonogram',
      type: window_types.nonogram_puzzle
    }))
  }, [dispatch])

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