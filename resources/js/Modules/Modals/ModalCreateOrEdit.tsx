'use client'
import React, { useState, useEffect } from 'react'

import { TodoType } from '../../types/todo'

type TodoToEditType = TodoType & {
  index: number
}

type ModalCreateOrEditProps = {
  open: boolean
  type: string
  todoToEdit: TodoToEditType
  createTodo: (newTodo: TodoType) => void
  editTodo: (indxToEdit: number, newTodo: TodoType) => void
  setOpen: (open: boolean) => void
}

/**
 * ModalCreateOrEdit component.
 * @param open - boolean indicating whether the modal is open or not / indicando cuando el modal esta abierto o no.
 * @param type - string indicating the type of action (create or edit) / indicando el tipo de accion del modal (crear o editar).
 * @param todoToEdit - object containing the todo to be edited / objeto contiene el todo a editar.
 * @param createTodo - function to create a new todo / funcion para crear un nuevo todo.
 * @param editTodo - function to edit an existing todo / funcion para editar un todo existente.
 * @param setOpen - function to set the open state of the modal (opened or not opened) / funcion para establecer el estado del modal (abierto o no abierto).
 */
const ModalCreateOrEdit: React.FC<ModalCreateOrEditProps> = ({
  open,
  type,
  todoToEdit,
  createTodo,
  editTodo,
  setOpen,
}) => {
  const [newTodo, setNewTodo] = useState({ title: '', priority: 4 })

  /**
   * useEffect hook para actualizar el newTodo state cuando el modal es usado para editar algun todo.
   * useEffect hook to update the newTodo state when the todoToEdit prop changes.
   */
  useEffect(() => {
    if (type === 'edit') {
      setNewTodo({
        title: todoToEdit.title,
        priority: todoToEdit.priority,
      })
    }
  }, [todoToEdit])

  /**
   * Function to handle form submission.
   * Funcion para manejar el envio del formulario.
   * @param newTodo - object containing the new todo / objeto contiene el nuevo todo.
   */
  const onSubmit = (newTodo: TodoType) => {
    if (newTodo.title === '') {
      alert('You need to enter a title')
    } else if (type === 'create') {
      createTodo(newTodo)
      setOpen(false)
    } else {
      editTodo(todoToEdit.index, newTodo)
      setOpen(false)
    }
    setNewTodo({ title: '', priority: 4 })
  }
  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='flex flex-col h-[400px] justify-center items-center modal-box'>
        <h1 className='text-2xl mb-3'>Create new todo</h1>
        <div className='my-6'>
          <label className='input-group shadow-xl'>
            <span>Todo Title</span>
            <input
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              value={newTodo.title}
              type='text'
              placeholder='What do you need to do?'
              className='input input-bordered selection:'
            />
          </label>
          <select
            onChange={(e) =>
              setNewTodo({ ...newTodo, priority: e.target.value })
            }
            className='select select-bordered shadow-xl mt-3'
            value={newTodo.priority}
          >
            <option disabled>Priority</option>
            <option value={4}>Low</option>
            <option value={3}>Medium</option>
            <option value={2}>High</option>
            <option value={1}>Very High</option>
          </select>
        </div>
        <div className='mt-auto'>
          <button
            onClick={() =>
              onSubmit({
                title: newTodo.title,
                priority: parseInt(newTodo.priority),
              })
            }
            className='btn bg-green-500 hover:bg-green-700 text-white shadow-xl mr-3'
          >
            {type === 'edit' ? 'EDIT' : 'CREATE'}
          </button>
          <button
            onClick={() => setOpen(false)}
            className='btn bg-red-500 hover:bg-red-900 text-white shadow-xl ml-3'
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ModalCreateOrEdit
