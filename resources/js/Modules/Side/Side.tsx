'use client'
import React, { useState, useContext } from 'react'
import classNames from 'classnames'

import { FaUser as UserIcon, FaPlus as CreateIcon } from 'react-icons/fa'
import { MdDelete as DeleteAllIcon } from 'react-icons/md'

import ModalCreateOrEdit from '../Modals/ModalCreateOrEdit'
import ModalDeleteConfirm from '../Modals/ModalConfirm'
import { TodoType } from '../../types/todo'
import { MedalCreateOrEditType } from '../../types/modal'

import { AuthContext } from '../Auth/AuthProvider'
import { logoutUser } from '../../utils/api/auth'
import { config } from '../../config/axios'

type SideProps = {
  username: string
  modalCreateOrEdit: MedalCreateOrEditType
  setModalCreateOrEdit: (newMedal: MedalCreateOrEditType) => void
  createTodo: (newTodo: TodoType) => void
  editTodo: (indxToEdit: number, newTodo: TodoType) => void
  deleteAllTodos: () => void
}

/**
 * Renders the Side component.
 * Renderiza el componente Side.
 *
 * @param modalCreateOrEdit - The state for the modal create or edit / El state para el modal create o edit.
 * @param setModalCreateOrEdit - The function to set the state for the modal create or edit / La función para establecer el estado para el modal create or edit.
 * @param createTodo - The function to create a new todo / La función para crear un nuevo todo.
 * @param editTodo - The function to edit a todo / La función para editar un todo.
 * @param deleteAllTodos - The function to delete all todos / La función para eliminar todos.
 */
const Side: React.FC<SideProps> = ({
  username,
  modalCreateOrEdit,
  setModalCreateOrEdit,
  createTodo,
  editTodo,
  deleteAllTodos,
}) => {
  const [modalConfirm, setModalConfirm] = useState({
    open: false,
    action: null,
  })
  const { token, isAuthenticated, logoutGuest, logout } =
    useContext(AuthContext)

  const handleLogoOut = async () => {
    if (isAuthenticated) {
      const configToken = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await logoutUser(configToken, logout)
    } else {
      logoutGuest()
    }
  }

  return (
    <>
      <ModalCreateOrEdit
        createTodo={createTodo}
        editTodo={editTodo}
        open={modalCreateOrEdit.open}
        type={modalCreateOrEdit.type}
        todoToEdit={modalCreateOrEdit.todoToEdit}
        setOpen={setModalCreateOrEdit}
      />
      <ModalDeleteConfirm
        open={modalConfirm.open}
        setOpen={setModalConfirm}
        actionToConfirm={modalConfirm.action}
      />
      <div
        className={classNames(
          'flex flex-col items-center',
          'h-5/6 w-[15%] ml-2',
          'bg-gradient-to-r from-slate-600 via-slate-600 to-slate-700 rounded-xl'
        )}
      >
        <div className='text-gray-200 font-bold mt-8'>
          <h2 className='font-bold text-xl text-center'>{username}</h2>
          <div
            className={classNames(
              'flex flex-col justify-center items-center',
              'h-[85px] w-[85px] mt-4 cursor-pointer',
              'shadow-lg rounded-full bg-slate-800'
            )}
          >
            <UserIcon size={40} />
          </div>
        </div>
        <button
          onClick={handleLogoOut}
          className={classNames(
            'btn duration-300 hover:scale-105',
            'bg-red-400 border-red-400 hover:bg-red-500 hover:border-red-500',
            'shadow-xl mt-12 rounded-lg p-2'
          )}
        >
          <h1 className='text-white font-bold text-lg'>LOG OUT</h1>
        </button>
        <div
          className={classNames(
            'flex justify-center items-center',
            'w-full h-12 mt-12 cursor-pointer',
            'shadown-xl bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200'
          )}
        >
          <h1 className='text-white font-bold'>SUSCRIBE</h1>
        </div>
        <div className='flex mt-auto mb-6'>
          <button
            onClick={() =>
              setModalConfirm({ open: true, action: deleteAllTodos })
            }
            className={classNames(
              'flex flex-col justify-center items-center',
              'h-[85px] w-[85px] mr-2 cursor-pointer',
              'shadow-xl rounded-full text-red-300 duration-300 hover:bg-slate-800'
            )}
          >
            <DeleteAllIcon size={35} />
          </button>
          <button
            onClick={() => setModalCreateOrEdit({ open: true, type: 'create' })}
            className={classNames(
              'flex flex-col justify-center items-center',
              'h-[85px] w-[85px] ml-2',
              'shadow-xl rounded-full text-green-300 duration-300 hover:bg-slate-800'
            )}
          >
            <CreateIcon size={30} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Side
