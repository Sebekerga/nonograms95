import { Button } from 'react95';
import './Grid.css'

import { cell_states, cellColor, getNewCellState } from '../common';

import { useDispatch, useSelector } from 'react-redux';
import { setPixel } from '../features/nonogramPuzzleReducer';


const Cell = ({ position }) => {

  // const [state, setState] = useState(initialState)
  const dispatch = useDispatch()
  const cell_state = useSelector(state => state.game.solution[position.x][position.y])
  const puzzle_solved = useSelector(state => state.game.solved)

  const handleClick = (event) => {
    event.preventDefault()

    if(!puzzle_solved)    
      dispatch(setPixel({
        position,
        state: getNewCellState(cell_state)
      }))
  }

  const button_is_active = cell_state !== cell_states.empty
  const button_color = cellColor(cell_state).color
  const button_class_name = puzzle_solved ? 'cell-button plain-colored' : 'cell-button'
  console.log(puzzle_solved)

  return <Button
    // style
    className={button_class_name}
    square={true}
    size='sm'

    // state
    active={button_is_active}
    style={{ backgroundColor: button_color }}

    // events
    onClick={handleClick} />
}

const Grid = ({ headers, dimensions }) => {

  const table_content = <>

    {headers.top ?
      <tr className='vertical-clue'>
        <th className='vertical-clue'></th>
        {headers.top.map((header, index) => <th className='vertical-clue' key={index}>{header}</th>)}
        <th className='vertical-clue'></th>
      </tr> : null}

    {Array.from({ length: dimensions.height }, (_, y) =>
      <tr key={y}>
        <th className='horizontal-clue'>{headers.left ? headers.left[y] : null}</th>
        {Array.from({ length: dimensions.width }, (_, x) =>
          <td key={x}>
            <Cell position={{ x, y }} />
          </td>
        )}
        <th className='horizontal-clue'>{headers.right ? headers.right[y] : null}</th>
      </tr>
    )}

    {headers.bottom ?
      <tr className='vertical-clue'>
        <th className='vertical-clue'></th>
        {headers.bottom.map((header, index) => <th className='vertical-clue' key={index}>{header}</th>)}
        <th className='vertical-clue'></th>
      </tr> : null}

  </>

  return (
    <table>
      <tbody>
        {table_content}
      </tbody>
    </table>
  )
}

export default Grid