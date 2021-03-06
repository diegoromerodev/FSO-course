import axios from 'axios'
const baseUrl = '/api/notes'

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const create = newObject => {
  return axios.post(baseUrl, newObject).then(res => res.data)
}

export const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}