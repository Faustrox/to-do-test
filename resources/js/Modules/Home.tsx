import React from 'react'
import classNames from 'classnames'

type Todo = {
  priority: number
}

const Todo = ({ priority }) => {
  return (
    <div
      className={classNames(
        'flex flex-row',
        'w-full h-[100px]',
        'bg-transparent shadow-xl rounded-xl',
        'duration-300 hover:bg-slate-800'
      )}
    >
      <div className='m-4'>
        <div className='text-gray-200 font-bold'>
          Create new todo list project
        </div>
        <div className='w-[50px] text-red-300 font-bold cursor-pointer'>
          Delete
        </div>
        <div className='w-[40px] text-green-300 font-bold cursor-pointer'>
          Edit
        </div>
      </div>
      <div
        className={classNames('ml-auto h-full w-12 rounded-r-xl', {
          'bg-red-400 opacity-70': priority === 1,
          'bg-orange-400 opacity-70': priority === 2,
          'bg-yellow-400 opacity-70': priority === 3,
          'bg-green-400 opacity-70': priority === 4,
        })}
      />
    </div>
  )
}

const Home = () => {
  return (
    <div
      className={classNames(
        'flex flex-row',
        'h-5/6 w-4/5 mr-2 p-12',
        'bg-gradient-to-l from-slate-600 via-slate-600 to-slate-700 rounded-xl'
      )}
    >
      <div className='flex flex-col justify-between w-[25%]'>
        <Todo priority={1} />
      </div>
      <div className='flex flex-col ml-4 justify-between w-[25%]'>
        <Todo priority={2} />
      </div>
      <div className='flex flex-col ml-4 justify-between w-[25%]'>
        <Todo priority={3} />
      </div>
      <div className='flex flex-col ml-4 justify-between w-[25%]'>
        <Todo priority={4} />
      </div>
    </div>
  )
}

export default Home
