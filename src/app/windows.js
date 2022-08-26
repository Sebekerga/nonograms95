// this file is intended for declaration of all possible windows in app

import FileBrowser from "../components/windows/FileBrowser"
import PuzzleWindow from "../components/windows/NonogramPuzzle"

export const window_types = {
    nonogram_puzzle: 0,
    file_browser: 1
  }
  
export const resolveType = (type) => {
    switch (type) {
      case window_types.nonogram_puzzle:
        return PuzzleWindow
      case window_types.file_browser:
        return FileBrowser
      default:
        return undefined
    }
  }