import axios from 'axios'
import { TodoType } from '../../types/todo'

export const getTodos = async (configToken) => {
  try {
    const res = await axios.get('/api/todos', configToken)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const createTodo = async (todo: TodoType, configToken) => {
  try {
    const res = await axios.post('/api/todo', todo, configToken)
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const editTodo = async (id: number, todo: TodoType, configToken) => {
  try {
    await axios.put('/api/todo', todo, configToken)
    return await getTodos(configToken)
  } catch (err) {
    console.error(err)
  }
}

export const deleteTodo = async (id: number, configToken) => {
  try {
    await axios.delete('/api/todo/' + id, configToken)
    return await getTodos(configToken)
  } catch (err) {
    console.error(err)
  }
}

export const deleteAllTodos = async (configToken) => {
  try {
    const res = await axios.delete('/api/todos', configToken)
    return res
  } catch (err) {
    console.error(err)
  }
}
