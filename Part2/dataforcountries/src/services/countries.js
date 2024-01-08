import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const nameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {
  return axios.get(baseUrl)
}
const searchAll = (name) => {
    return axios.get(`${nameUrl}/${name}`)
}

export default { getAll, searchAll}