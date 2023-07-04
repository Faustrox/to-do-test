import axios from 'axios'

import { config } from '../../config/axios'

export const loginUser = async (user, login) => {
  try {
    console.log(user)
    const { data } = await axios.post('/api/login', user, config)
    login(data.token, data.name)
    return data
  } catch (err) {
    console.error(err)
    return err.response.data.message
  }
}

export const logoutUser = async (configToken, logout) => {
  try {
    await axios.post('/api/logout', {}, configToken)
    logout()
  } catch (err) {
    console.error(err)
    return err.response.data.message
  }
}
export const registerUser = async (user, login) => {
  try {
    const res = await axios.post('/api/register', user, config)
    login(res.data.token, user.name)
    return res.data
  } catch (err) {
    console.error(err)
    return err.response.data
  }
}
