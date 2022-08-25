import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  windows: [],
}

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    newWindow: (state, action) => {
      if (!state.windows.find(w => w.id === action.payload.id))
        return {
          windows: state.windows.concat({
            ...action.payload
          })
        }
    },
    closeWindow: (state, action) => {
      return state.windows.filter(w => w.id !== action.payload)
    },
    updateMenu: (state, action) => {
      return {
        ...state,
        windows: state.windows.map(window => window.id === action.payload.id
          ? { ...window, menu: action.payload.menu }
          : window)
      }
    }
  }
})

export const { newWindow, closeWindow } = windowsSlice.actions
export default windowsSlice.reducer