import Grid from "./Grid"
import './NonogramPuzzle.css'

import { useSelector } from "react-redux"
import { useTheme } from "styled-components"
import { Button } from "react95"


const empty_puzzle = [[]]

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
    <Button disabled>asd</Button>
    {current_puzzle !== empty_puzzle
      ? <Grid
        headers={headers}
        dimensions={{
          width: current_puzzle.vertical.length,
          height: current_puzzle.horizontal.length
        }}
      />
      : <p>Puzzle was not loaded</p>}

  </>
}

export default Puzzle