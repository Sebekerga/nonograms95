// this file is intended for declaration of all possible windows in app

import AboutWindow from "../components/windows/About"
import FileBrowser from "../components/windows/FileBrowser"
import PuzzleWindow from "../components/windows/NonogramPuzzle"
import RulesWindow from "../components/windows/Rules"

export const window_types = {
    nonogram_puzzle: 0,
    file_browser: 1,
    about: 2,
    rules: 3
  }
  
export const resolveType = (type, id) => {
    switch (type) {
      case window_types.nonogram_puzzle:
        return PuzzleWindow(id)
      case window_types.file_browser:
        return FileBrowser(id)
      case window_types.about:
        return AboutWindow(id)
      case window_types.rules:
        return RulesWindow(id)
      default:
        return undefined
    }
  }