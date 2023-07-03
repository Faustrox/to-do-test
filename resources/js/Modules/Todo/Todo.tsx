import React from 'react'
import classNames from 'classnames'
import {
  FaBackspace as DeleteTodoIcon,
  FaEdit as EditTodoIcon,
} from 'react-icons/fa'

import { TodoProps } from '../../types/todo'

/**
 * Render a Todo component.
 * Renderiza un componente Todo.
 *
 * @param {Object} props - The props for the Todo component / Los props para el componente Todo.
 * @param {string} props.title - The title of the todo / El título del todo.
 * @param {number} props.priority - The priority of the todo / El prioridad del todo.
 * @param {number} props.indexOnArray - The index of the todo in the array / El índice del todo en el array.
 * @param {function} props.deleteTodo - The function to delete the todo / La función para eliminar el todo.
 * @param {function} props.setModalCreateOrEdit - The function to set the modal for create or edit / La función para establecer el modal para crear/editar.
 */
const Todo: React.FC<TodoProps> = ({
  title,
  priority,
  indexOnArray,
  deleteTodo,
  setModalCreateOrEdit,
}) => {
  return (
    <div
      className={classNames(
        'flex flex-row',
        'w-[350px] h-[100px]',
        'bg-transparent shadow-xl rounded-xl',
        'duration-300 hover:bg-slate-800'
      )}
    >
      <div className='m-4'>
        <div className='text-gray-200 font-bold'>{title}</div>
        <div className='flex text-gray-200 font-bold'>
          <button
            onClick={() => deleteTodo(indexOnArray)}
            className='text-red-300 font-bold'
          >
            <DeleteTodoIcon size={20} />
          </button>
          <button
            onClick={() =>
              setModalCreateOrEdit({
                open: true,
                type: 'edit',
                todoToEdit: { index: indexOnArray, title, priority },
              })
            }
            className='ml-2 text-green-300 font-bold'
          >
            <EditTodoIcon size={20} />
          </button>
        </div>
      </div>
      <div
        className={classNames('ml-auto h-full w-12 rounded-r-xl opacity-70', {
          'bg-red-400': priority === 1,
          'bg-orange-400': priority === 2,
          'bg-yellow-400': priority === 3,
          'bg-green-400': priority === 4,
        })}
      />
    </div>
  )
}

export default Todo
