// this files helps unifing all actions with cell states and tying it to a single place

import original from 'react95/dist/themes/original';
export const app_theme = original


export // all possible cell states
  const cell_states = {
    empty: 0,   // player has not decided on this cell's state
    crossed: 1, // player marked this cell as white (non filled)
    filled: 2   // player marked this cell as black (filled)
  }


export /**
 * converts cell state into a color
 *
 * @param {Number} state from a cell_states enum
 * @return {String} color 
 */
  const cellColor = (state) => {
    switch (state) {
      case cell_states.filled:
        return app_theme.materialText
      case cell_states.crossed:
        return app_theme.materialTextInverted
      default:
        return app_theme.material
    }
  }

// converts a row into a lines sequence
export const rowToClues = (row) => {
  let clues = []
  let last_was_empty = true

  for (let cell_index = 0; cell_index < row.length; cell_index++) {
    if (row[cell_index] === cell_states.filled) {
      if (last_was_empty)
        clues.push(0)
      clues[clues.length - 1]++
      last_was_empty = false
    } else {
      last_was_empty = true
    }
  }

  return clues
}

export /**
 * generates clues that are used for solving a puzzle or checking solution 
 *
 * @param {Array{Array}} puzzle
 */
  const generatePuzzleClues = (puzzle) => {
    const vertical = puzzle.map(column => rowToClues(column))
    const horizontal = Array.from({length: puzzle[0].length}, (_, i) => rowToClues(puzzle.map(column => column[i])))

    return {
      horizontal,
      vertical
    }
  }


export /**
 * function that defines sequence of cell state
 *
 * @param {Number} current_state current state as defined in 'cell_states'
 */
const getNewCellState = (current_state) => {
  switch (current_state) {
    case cell_states.empty:
      return cell_states.filled
    case cell_states.filled:
      return cell_states.crossed
    default:
      return cell_states.empty
  }
}


