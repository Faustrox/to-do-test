'use client'
import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { AuthContext } from './AuthProvider'
import { loginUser } from '../../utils/api/auth'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    const userToLogin = {
      email: user.email.toLowerCase(),
      password: user.password,
    }

    const res = await loginUser(userToLogin, login)
    if (typeof res === 'string') {
      setError(res)
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={(e) => {
        handleLogin()
        e.preventDefault()
      }}
      className={classNames(
        'flex flex-col items-center',
        'w-[526px] mr-2 p-12',
        'bg-gradient-to-l from-slate-600 via-slate-600 to-slate-700 duration-300 rounded-xl'
      )}
    >
      <h1
        className={`text-2xl ${
          error !== '' ? 'mb-3' : ''
        } text-white font-bold`}
      >
        LOGIN
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
        <label className='input-group opacity-70 shadow-xl mt-3'>
          <span className='w-[100px]'>Password</span>
          <input
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='****************'
            className='input input-bordered text-white duration-300 focus:scale-105'
          />
        </label>
      </div>
      <div className='mt-auto'>
        <button
          disabled={loading}
          className={classNames(
            'btn w-[77px] duration-300 hover:scale-110',
            'bg-green-400 border-green-400 hover:!bg-green-600 hover:!border-green-600',
            'text-white font-bold'
          )}
        >
          {loading ? (
            <span className='loading loading-dots loading-xs' />
          ) : (
            'Login'
          )}
        </button>
      </div>
    </form>
  )
}

export default Login
