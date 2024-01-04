import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObj => {
  return axios.post(baseUrl, newObj)
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const deleteID = (id) => {
 return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deleteID }