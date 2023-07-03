'use client'
import React, { useState } from 'react'
import classNames from 'classnames'

import Todo from './Todo'
import { MedalCreateOrEditType } from '../../types/modal'
import { TodoProps } from '../../types/todo'

type TodoListProps = {
  todos: TodoProps[]
  deleteTodo: (indxToDelete: number) => void
  setModalCreateOrEdit: (newMedal: MedalCreateOrEditType) => void
}

/**
 * Renders a list of todos.
 * Renderiza una lista de todos.
 *
 * @param todos - The array of todos / El array de todos.
 * @param deleteTodo - The function to delete a todo / La función para eliminar un todo.
 * @param setModalCreateOrEdit - The function to set the modal for creating/editing a todo / La función para establecer el modal para crear/editar un todo.
 */
const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  setModalCreateOrEdit,
}) => {
  return (
    <div
      className={classNames(
        'h-5/6 w-4/5 mr-2 p-12',
        'bg-gradient-to-l from-slate-600 via-slate-600 to-slate-700 duration-300 rounded-xl'
      )}
    >
      <div
        className={classNames(
          'grid grid-cols-4 grid-rows-6 gap-4 h-[97%] duration-300'
        )}
      >
        {todos.map((todo, indx) => {
          return (
            <Todo
              key={indx}
              title={todo.title}
              priority={todo.priority}
              indexOnArray={indx}
              deleteTodo={deleteTodo}
              setModalCreateOrEdit={setModalCreateOrEdit}
            />
          )
        })}
      </div>
      <div className='font-bold !w-1/2'>
        {/* If user is not signed in */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <span>You are not signed in, your todos will not be saved!</span>
      </div>
    </div>
  )
}

export default TodoList
