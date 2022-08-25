import { createSlice } from "@reduxjs/toolkit";
import { cell_states, generatePuzzleClues } from "../app/common";

const checkSolution = (puzzle, solution) => {
  // that is not the best way to do this
  return JSON.stringify(puzzle) === JSON.stringify(generatePuzzleClues(solution))
}

// "solution" holds current players solution and "puzzle" holds a desired solution
export const initialState = {
  id: undefined,
  puzzle: {
    horizontal: [],
    vertical: []
  },
  solution: [],
  solved: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

    // Loads a new puzzle passed in a payload and clears solution for a previous puzzle
    loadPuzzle: (state, action) => {
      return {
        id: action.payload.id,
        puzzle: action.payload.puzzle,
        solution: Array.from({ length: action.payload.puzzle.vertical.length }, () =>
          Array.from({ length: action.payload.puzzle.horizontal.length }, () =>
            cell_states.empty)),
        solved: false
      }
    },

    // Assigns a state to a single pixel in a player's solution
    setPixel: (state, action) => {
      const { x, y } = action.payload.position

      state.solution[x][y] = action.payload.state
      state.solved = checkSolution(state.puzzle, state.solution)

      if (state.solved)
        state.solution = state.solution.map(
          column => column.map(
            item => item === cell_states.filled ? item : cell_states.crossed))
    }
  }
})

export const { loadPuzzle, setPixel } = gameSlice.actions
export default gameSlice.reducer