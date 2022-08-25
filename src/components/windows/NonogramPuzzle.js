import Grid from "../Grid"
import './NonogramPuzzle.css'

import { useSelector } from "react-redux"
import { useTheme } from "styled-components"
import { Cutout } from "react95"
import { initialState } from "../../features/nonogramPuzzleReducer"
import { menu_folder, menu_entry } from "../Menu"


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

const PuzzleWindow = {
  title: 'Nonograms',
  content: <>
    <Puzzle />
  </>,
  menu: [
    menu_folder('File', [
      menu_entry('Open puzzle', () => console.log('open puzzle')),
      menu_folder('Open recent', [
        menu_entry('puzzle 1', () => console.log('puzzle 1')),
        menu_entry('puzzle 2', () => console.log('puzzle 2')),
      ]),
    ]),
    menu_folder('Help', [
      menu_entry('Puzzle rules', () => console.log('rules')),
      menu_entry('About', () => console.log('about')),
    ])
  ]
}

export default PuzzleWindow