import { cell_states, rowToClues } from "./common";

const e = cell_states.empty
const f = cell_states.filled

describe('tests of converting a row into a string', () => {
  it('empty rows', () => {
    expect(rowToClues([])).toEqual([])
    expect(rowToClues([e])).toEqual([])
    expect(rowToClues([e, e, e])).toEqual([])
  })

  it('single line rows', () => {
    expect(rowToClues([e, e, f, e, e])).toEqual([1])
    expect(rowToClues([f, e, e, e, e])).toEqual([1])
    expect(rowToClues([e, f, f, f, e])).toEqual([3])
    expect(rowToClues([e, e, f, f, f])).toEqual([3])
  })

  it('various combined rows', () => {
    expect(rowToClues([e, f, f, f, e, f, e, f, f, f])).toEqual([3, 1, 3])
    expect(rowToClues([f, e, f, f, e, e, e, e, e, f])).toEqual([1, 2, 1])
    expect(rowToClues([e, e, f, e, e, e, f, f, f, e])).toEqual([1, 3])
    expect(rowToClues([f, f, e, e, e, e, f, e, f, f])).toEqual([2, 1 ,2])
    expect(rowToClues([e, e, e, f, f, e, f, e, e, f])).toEqual([2, 1, 1])
    expect(rowToClues([e, e, f, f, f, f, f, e, e, f])).toEqual([5, 1])
    expect(rowToClues([f, e, f, e, f, e, f, f, f, f])).toEqual([1, 1, 1, 4])
  })
})