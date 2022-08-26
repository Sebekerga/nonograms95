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
            ...action.payload,
            menu: [],
            z: 2000 + state.windows.length * 100
          })
        }
    },

    closeWindow: (state, action) => {
      return {
        windows: state.windows.filter(w => w.id !== action.payload).map((w, i) => ({
          ...w,
          z: 2000 + i * 100
        }))
      }
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

export const { newWindow, closeWindow, updateMenu } = windowsSlice.actions
export default windowsSlice.reducer