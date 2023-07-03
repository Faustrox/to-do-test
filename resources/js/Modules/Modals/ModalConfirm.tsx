import React from 'react'
import classNames from 'classnames'

type ModalConfirmProps = {
  open: boolean
  setOpen: (open: boolean) => void
  actionToConfirm: () => void
}

/**
 * ModalConfirm component displays a confirmation modal dialog.
 * El componente ModalConfirm muestra un modal de confirmación.
 *
 * @param open - A boolean indicating whether the modal is open or not / Boolean indicando si el modal está abierto.
 * @param setOpen - A function to set the open state of the modal / Función para establecer el estado de la modal.
 * @param actionToConfirm - A function to be called when the confirmation is accepted / Función para ser llamado cuando se acepta la confirmación..
 */
const ModalConfirm: React.FC<ModalConfirmProps> = ({
  open,
  setOpen,
  actionToConfirm,
}) => {
  const handleConfirm = () => {
    setOpen(false)
    actionToConfirm()
  }

  return (
    <dialog id='modal_create' className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='flex flex-col justify-center items-center modal-box'>
        <h1 className='text-2xl mb-3'>Are you sure?</h1>
        <div className='flex my-6'>
          <div
            onClick={() => setOpen({ open: false, handler: null })}
            className={classNames(
              'flex flex-col justify-center items-center',
              'h-[85px] w-[85px] mr-2 cursor-pointer',
              'rounded-full text-red-300 hover:!text-white duration-300 hover:bg-red-500'
            )}
          >
            NO
          </div>
          <button
            onClick={handleConfirm}
            className={classNames(
              'flex flex-col justify-center items-center',
              'h-[85px] w-[85px] ml-2',
              'rounded-full text-green-300 hover:!text-white duration-300 hover:bg-green-500'
            )}
          >
            YES
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ModalConfirm
