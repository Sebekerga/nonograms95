import { Button } from 'react95';
import './Grid.css'

import { cell_states, cellColor, getNewCellState } from '../common';

import { useDispatch, useSelector } from 'react-redux';
import { setPixel } from '../features/nonogramPuzzleReducer';


const Cell = ({ position }) => {

  // const [state, setState] = useState(initialState)
  const dispatch = useDispatch()
  const state = useSelector(state => state.game.solution[position.x][position.y])

  const handleClick = (event) => {
    event.preventDefault()
    dispatch(setPixel({
      position,
      state: getNewCellState(state)
    }))
  }

  const button_is_active = state !== cell_states.empty
  const button_color = cellColor(state)

  return <Button
    // style
    className='cell-button'
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