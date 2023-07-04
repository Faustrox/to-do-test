'use client'
import React, { useState, useContext, useEffect } from 'react'

import Register from './Auth/Register'
import Login from './Auth/Login'
import TodoList from './Todo/TodoList'
import Side from './Side/Side'
import { AuthContext } from './Auth/AuthProvider'
import { TodoType } from '../types/todo'
import { config } from '../config/axios'

import {
  getTodos,
  createTodo as createTodoApi,
  editTodo as editTodoApi,
  deleteTodo as deleteTodoApi,
  deleteAllTodos as deleteAllTodosApi,
} from '../utils/api/todo'

import { getUser } from '../utils/api/user'

/**
 * Home component.
 *
 * Renders the main home page / Renderiza la página principal.
 * Manages the state of todos and modalCreateOrEdit / Maneja el estado de los todos y el modalCreateOrEdit.
 * Handles CRUD operations for todos / Maneja las operaciones CRUD para los todos.
 */
const Home = () => {
  const [todos, setTodos] = useState([])
  const { isAuthenticated, isGuest, token, username, loginGuest, logout } =
    useContext(AuthContext)

  const [modalCreateOrEdit, setModalCreateOrEdit] = useState({
    open: false,
    type: '',
    todoToEdit: {
      index: 0,
      title: '',
      priority: 4,
    },
  })

  const configToken = {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUser(configToken, logout)

      getTodos(configToken)
        .then((data) => {
          setTodos(data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [isAuthenticated])

  /**
   * Creates a new todo and adds it to the todos array.
   * Crea un nuevo todo y lo agrega a la lista.
   *
   * @param {TodoType} newTodo - The new todo to create / El nuevo todo a crear.
   */
  const createTodo = async (newTodo: TodoType) => {
    // if user, create new todo from backend

    if (isAuthenticated) {
      await createTodoApi(newTodo, configToken)
    }

    setTodos([...todos, newTodo])
  }

  /**
   * Deletes a todo from the todos array.
   * Elimina un todo de la lista.
   *
   * @param {number} indexToDelete - The index of the todo to delete / El índice del todo a eliminar.
   */
  const deleteTodo = async (indxToDelete) => {
    // if user, delete from backend
    let resultTodos: TodoType[] = []
    if (isAuthenticated) {
      resultTodos = await deleteTodoApi(indxToDelete, configToken)
    } else {
      resultTodos = todos.filter((todo, indx) => indx !== indxToDelete)
    }
    setTodos(resultTodos)
  }

  /**
   * Deletes all todos from the todos array.
   * Elimina todos los Todos de la lista.
   */
  const deleteAllTodos = async () => {
    if (todos.length === 0) {
      alert('There are not any todos in the list')
    } else if (isAuthenticated) {
      await deleteAllTodosApi(configToken)
      setTodos([])
    } else {
      setTodos([])
    }
  }

  /**
   * Edits a todo in the todos array.
   * Edita un todo en la lista.
   *
   * @param {number} indexToEdit - The index of the todo to edit / El índice del todo a editar.
   * @param {TodoType} newTodo - The updated todo / El nuevo todo.
   */
  const editTodo = async (indxToEdit: number, newTodo: TodoType) => {
    // if user, edit from backend
    let todosEdited: TodoType[] = []

    if (isAuthenticated) {
      const newTodos = await editTodoApi(indxToEdit, newTodo, configToken)
      todosEdited = newTodos
    } else {
      todosEdited = todos
      todosEdited[indxToEdit] = newTodo
    }

    setTodos(todosEdited)
  }

  return (
    <div
      className={`flex flex-row ${
        isAuthenticated ? 'justify-center' : 'justify-center'
      } items-center h-screen bg-slate-800 p-2`}
    >
      {isGuest ? (
        <>
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            setModalCreateOrEdit={setModalCreateOrEdit}
          />
          <Side
            username={username}
            modalCreateOrEdit={modalCreateOrEdit}
            setModalCreateOrEdit={setModalCreateOrEdit}
            createTodo={createTodo}
            editTodo={editTodo}
            deleteAllTodos={deleteAllTodos}
          />
        </>
      ) : isAuthenticated ? (
        <>
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            setModalCreateOrEdit={setModalCreateOrEdit}
          />
          <Side
            username={username}
            modalCreateOrEdit={modalCreateOrEdit}
            setModalCreateOrEdit={setModalCreateOrEdit}
            createTodo={createTodo}
            editTodo={editTodo}
            deleteAllTodos={deleteAllTodos}
          />
        </>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-row mb-12 mt-12'>
            <Login />
            <Register />
          </div>
          <div className='flex flex-col items-center'>
            <p>You want to use this application without an account?</p>
            <button
              onClick={loginGuest}
              className='text-white duration-100 hover:text-green-400 hover:font-bold'
            >
              Enter as a guest
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
