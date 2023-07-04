'use client'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import classNames from 'classnames'

import { AuthContext } from './AuthProvider'
import { registerUser } from '../../utils/api/auth'

const Register = () => {
  const { login } = useContext(AuthContext)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')
    setLoading(true)

    const userToRegister = {
      name: user.name,
      email: user.email,
      password: user.password,
      confirm_password: user.confirm,
    }

    const { errors, message } = await registerUser(userToRegister, login)

    if (errors?.confirm_password) {
      setError(errors.confirm_password)
    } else {
      setError(message)
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={(e) => {
        handleRegister()
        e.preventDefault()
      }}
      className={classNames(
        'flex flex-col items-center',
        'w-[826px] mr-2 p-12',
        'bg-gradient-to-l from-slate-700 via-slate-600 to-slate-600 duration-300 rounded-xl'
      )}
    >
      <h1
        className={`text-2xl ${
          error !== '' ? 'mb-3' : ''
        } text-white font-bold`}
      >
        REGISTER
      </h1>
      <div
        className={`alert alert-error ${
          error !== '' ? 'scale-100' : 'scale-0'
        } duration-300 w-2/3`}
      >
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
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span>{error}</span>
      </div>
      <div className={`${error !== '' ? 'mt-6' : ''} mb-6`}>
        <div className='flex'>
          <label className='input-group opacity-70 shadow-xl mb-3 mr-3'>
            <span className='w-[100px]'>Username</span>
            <input
              type='text'
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder='Example'
              className='input input-bordered text-white duration-300 focus:scale-105'
            />
          </label>
          <label className='input-group opacity-70 shadow-xl mb-3'>
            <span className='w-[100px]'>E-mail</span>
            <input
              type='email'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder='email@example.com'
              className='input input-bordered text-white duration-300 focus:scale-105'
            />
          </label>
        </div>
        <div className='flex'>
          <label className='input-group opacity-70 shadow-xl mt-3 mr-3'>
            <span className='w-[100px]'>Password</span>
            <input
              type='password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder='****************'
              className='input input-bordered text-white duration-300 focus:scale-105'
            />
          </label>
          <label className='input-group opacity-70 shadow-xl mt-3'>
            <span className='w-[100px]'>Confirm</span>
            <input
              type='password'
              value={user.confirm}
              onChange={(e) => setUser({ ...user, confirm: e.target.value })}
              placeholder='****************'
              className='input input-bordered text-white duration-300 focus:scale-105'
            />
          </label>
        </div>
      </div>
      <div className='mt-auto'>
        <button
          disabled={loading}
          className={classNames(
            'btn w-[98px] duration-300 hover:scale-110',
            'bg-green-400 border-green-400 hover:!bg-green-600 hover:!border-green-600',
            'text-white font-bold'
          )}
        >
          {loading ? (
            <span className='loading loading-dots loading-xs' />
          ) : (
            'Register'
          )}
        </button>
      </div>
    </form>
  )
}

export default Register
