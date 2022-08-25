import axios from "axios"

const base_url = `${process.env.REACT_APP_API}/api/non`

export const getNonogramsList = async () => {
  const response = await axios.get(`${base_url}/summary`)
  return response.data
}

export const getNonogramClues = async (id) => {
  const response = await axios.get(`${base_url}/${id}`)
  return response.data.clues
}