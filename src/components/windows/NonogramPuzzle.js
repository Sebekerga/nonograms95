import Grid from "../Grid"
import './NonogramPuzzle.css'

import { useSelector } from "react-redux"
import { useTheme } from "styled-components"
import { Cutout } from "react95"
import { initialState, loadPuzzle } from "../../features/nonogramPuzzleReducer"
import { menu_items } from "../../app/menu"
import { newWindow } from "../../features/windowsReducer"
import { window_types } from "../../app/windows"


const Puzzle = () => {

  const current_theme = useTheme()
  const disabled_text_style = {
    color: current_theme.materialTextDisabled,
    textShadow: `1px 1px ${current_theme.materialTextDisabledShadow}`
  }

  const current_puzzle = useSelector(state => state.game.puzzle)
  const puzzle_solved = useSelector(state => state.game.solved)

  const headers = {
    left: current_puzzle.horizontal.map(row =>
      <ul className='horizontal-clue'>
        {row.map((item, index) => <li key={index}><p style={puzzle_solved ? disabled_text_style : undefined}>{item}</p></li>)}
      </ul>
    ),
    top: current_puzzle.vertical.map(row =>
      <ul className='vertical-clue'>
        {row.map((item, index) => <li key={index}><p style={puzzle_solved ? disabled_text_style : undefined}>{item}</p></li>)}
      </ul>
    )
  }

  return <>
    <Cutout style={{ padding: '8px' }}>
      {current_puzzle !== initialState.puzzle
        ? <Grid
          headers={headers}
          dimensions={{
            width: current_puzzle.vertical.length,
            height: current_puzzle.horizontal.length
          }}
        />
        : <p>Puzzle was not loaded</p>}
    </Cutout>
  </>
}

const recent = () => {
  const local_recent = JSON.parse(localStorage.getItem('recent_nonograms'))

  console.log(local_recent)

  return local_recent
    ? local_recent.map((item, i) =>
      menu_items.entry(`${item.name}`, (dispatch) => dispatch(loadPuzzle({
        id: item.id,
        puzzle: item.clues
      })))
    )
    : []
}

const PuzzleWindow = (id) => ({
  title: 'Nonograms',
  content: <Puzzle window_id={id} />,
  config: {
    closable: false
  },
  menu: [
    menu_items.folder('File', [
      menu_items.entry('Open', (dispatch) =>
        dispatch(newWindow({
          id: 'nonogram_browser',
          type: window_types.file_browser
        }))),
      menu_items.folder('Open recent', recent()),
    ]),
    menu_items.folder('Help', [
      menu_items.entry('Puzzle rules', (dispatch) =>
        dispatch(newWindow({
          id: 'rules',
          type: window_types.rules
        }))),
      menu_items.entry('About', (dispatch) =>
        dispatch(newWindow({
          id: 'about',
          type: window_types.about
        }))),
    ])
  ]
})

export default PuzzleWindow