'use client'
import React, { useState } from 'react'

import TodoList from './Todo/TodoList'
import Side from './Side/Side'
import { TodoType } from '../types/todo'

/**
 * Home component.
 *
 * Renders the main home page / Renderiza la página principal.
 * Manages the state of todos and modalCreateOrEdit / Maneja el estado de los todos y el modalCreateOrEdit.
 * Handles CRUD operations for todos / Maneja las operaciones CRUD para los todos.
 */
const Home = () => {
  const [todos, setTodos] = useState([])
  // This was needed to be able to send it to TodoList and Side / Esto se necesito para poder enviarlo a TodoList y Side.
  const [modalCreateOrEdit, setModalCreateOrEdit] = useState({
    open: false,
    type: '',
    todoToEdit: {
      index: 0,
      title: '',
      priority: 4,
    },
  })

  /**
   * Deletes a todo from the todos array.
   * Elimina un todo de la lista.
   *
   * @param {number} indexToDelete - The index of the todo to delete / El índice del todo a eliminar.
   */
  const deleteTodo = (indxToDelete) => {
    // if user, delete from backend
    const todosDeleted = todos.filter((todo, indx) => indx !== indxToDelete)
    setTodos(todosDeleted)
  }

  /**
   * Deletes all todos from the todos array.
   * Elimina todos los Todos de la lista.
   */
  const deleteAllTodos = () => {
    if (todos.length === 0) {
      alert('There are not any todos in the list')
    } else {
      setTodos([])
    }
  }

  /**
   * Creates a new todo and adds it to the todos array.
   * Crea un nuevo todo y lo agrega a la lista.
   *
   * @param {TodoType} newTodo - The new todo to create / El nuevo todo a crear.
   */
  const createTodo = (newTodo: TodoType) => {
    // if user, create new todo from backend

    setTodos([...todos, newTodo])
  }

  /**
   * Edits a todo in the todos array.
   * Edita un todo en la lista.
   *
   * @param {number} indexToEdit - The index of the todo to edit / El índice del todo a editar.
   * @param {TodoType} newTodo - The updated todo / El nuevo todo.
   */
  const editTodo = (indxToEdit: number, newTodo: TodoType) => {
    // if user, edit from backend
    const todosEdited = todos
    todosEdited[indxToEdit] = newTodo
    setTodos(todosEdited)
  }

  return (
    <div className='flex flex-row justify-center items-center h-screen bg-slate-800 p-2'>
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        setModalCreateOrEdit={setModalCreateOrEdit}
      />
      <Side
        modalCreateOrEdit={modalCreateOrEdit}
        setModalCreateOrEdit={setModalCreateOrEdit}
        createTodo={createTodo}
        editTodo={editTodo}
        deleteAllTodos={deleteAllTodos}
      />
    </div>
  )
}

export default Home
