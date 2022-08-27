import { Button, Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow } from "react95"
import './FileBrowser.css'
import { useEffect, useState } from "react"
import { getNonogramClues, getNonogramsList } from "../../services/nonograms"
import { loadPuzzle } from "../../features/nonogramPuzzleReducer"
import { useDispatch } from "react-redux"
import { closeWindow } from "../../features/windowsReducer"

const page_size = 5
const recent_size = 5

const FileBrowser = ({ window_id }) => {

  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const load_puzzle_list = async () => {
      const puzzle_list = await getNonogramsList()
      setContent(puzzle_list)
    }
    load_puzzle_list()
  }, [setContent])


  const nextPage = () => {
    if (page * page_size < content.length)
      setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1)
      setPage(page - 1)
  }

  const selectPuzzle = (selected_puzzle) => {
    const loadAndClose = async () => {
      const selected_puzzle_clues = await getNonogramClues(selected_puzzle.id)
      dispatch(loadPuzzle({
        id: selected_puzzle.id,
        puzzle: selected_puzzle_clues
      }))
      dispatch(closeWindow(window_id))

      const item_template = {
        id: selected_puzzle.id,
        name: selected_puzzle.title,
        clues: selected_puzzle_clues
      }

      const current_recent = JSON.parse(localStorage.getItem('recent_nonograms'))
      if (!current_recent) {
        localStorage.setItem('recent_nonograms', JSON.stringify(
          [ item_template ]
        ))
      }
      else {
        const filtered = current_recent.filter(item => item.id !== selected_puzzle.id)
        const appended = [ item_template ].concat(filtered)
        const cut = appended.filter((_, i) => i < recent_size)

        localStorage.setItem('recent_nonograms', JSON.stringify(cut))
      }
    }
    loadAndClose()
  }

  return <div>
    {content.length !== 0
      ? <>
        <Table>
          <TableHead>
            <TableRow head>
              <TableHeadCell style={{ width: '120px' }}>Name</TableHeadCell>
              <TableHeadCell style={{ width: '50px' }}>Size</TableHeadCell>
              <TableHeadCell style={{ width: '250px' }}>Description</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.filter((_, i) => (i >= (page - 1) * page_size) && i < page * page_size).map((puzzle, i) => (
              <TableRow key={i} onClick={() => selectPuzzle(puzzle)}>
                <TableDataCell>{puzzle.title}</TableDataCell>
                <TableDataCell>{puzzle.size.width}x{puzzle.size.height}</TableDataCell>
                <TableDataCell>{puzzle.description}</TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='paginator'>
          <span>Page: {page}</span>
          <Button onClick={prevPage}>{'<'}</Button>
          <Button onClick={nextPage}>{'>'}</Button>
        </div>
      </>
      : 'Loading puzzles...'}
  </div>
}
const FileBrowserWindow = (id) => ({
  title: 'Open file',
  content: <>
    <FileBrowser window_id={id} />
  </>,
  menu: []
})

export default FileBrowserWindow