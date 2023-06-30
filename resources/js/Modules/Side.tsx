import React from 'react'
import classNames from 'classnames'

const Side = () => {
  return (
    <div
      className={classNames(
        'flex flex-col items-center',
        'h-5/6 w-[15%] ml-2',
        'bg-gradient-to-r from-slate-600 via-slate-600 to-slate-700 rounded-xl'
      )}
    >
      <div className='text-gray-200 font-bold mt-8'>
        <h2>User Name</h2>
        <div
          className={classNames(
            'flex flex-col justify-center items-center',
            'h-[85px] w-[85px] mt-4 cursor-pointer',
            'shadow-lg rounded-full bg-slate-800'
          )}
        >
          icon
        </div>
      </div>
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
        <div
          className={classNames(
            'flex flex-col justify-center items-center',
            'h-[85px] w-[85px] mr-2 cursor-pointer',
            'shadow-xl rounded-full text-red-300 duration-300 hover:bg-slate-800'
          )}
        >
          Delete
          <span>ALL</span>
        </div>
        <div
          className={classNames(
            'flex flex-col justify-center items-center',
            'h-[85px] w-[85px] ml-2 cursor-pointer',
            'shadow-xl rounded-full text-green-300 duration-300 hover:bg-slate-800'
          )}
        >
          Create
        </div>
      </div>
    </div>
  )
}

export default Side
