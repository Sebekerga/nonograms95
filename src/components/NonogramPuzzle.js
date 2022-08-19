import Grid from "./Grid"
import './NonogramPuzzle.css'

import { useSelector } from "react-redux"
import { generatePuzzleClues } from "../common"


const empty_puzzle = [[]]

const Puzzle = () => {

  const current_puzzle = useSelector(state => state.game.puzzle)
  const current_solution = useSelector(state => state.game.solution)

  console.log(current_puzzle, generatePuzzleClues(current_solution))

  const headers = {
    left: current_puzzle.horizontal.map(row =>
      <ul className='horizontal-clue'>
        {row.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    ),
    top: current_puzzle.vertical.map(row =>
      <ul className='vertical-clue'>
        {row.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    )
  }

  return <>
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