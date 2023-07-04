import axios from 'axios'

export const getUser = async (configToken, logout) => {
  try {
    const { data } = await axios.get('/api/user', configToken)
    return data
  } catch (err) {
    err.response.status === 401 && logout()
    console.error(err)
    return err.response.data.message
  }
}

export const changePassword = async (passwordsData, configToken) => {
  try {
    await axios.put('/api/user/change-password', passwordsData, configToken)
  } catch (err) {
    console.error(err)
    return err.response.data.message
  }
}

export const deleteAccount = async (configToken) => {
  try {
    await axios.delete('/api/user', configToken)
  } catch (err) {
    console.error(err)
    return err.response.data.message
  }
}
