'use client'
import React, { createContext, useState, useEffect } from 'react'

// Create the Auth Context
export const AuthContext = createContext()

type AuthProviderProps = {
  children: React.ReactNode
}

// Create the Auth Context Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [username, setUsername] = useState('')

  // Check if the user is already authenticated on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')

    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  // Login function
  const login = (token, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    setToken(token)
    setUsername(username)
    setIsAuthenticated(true)
  }

  const loginGuest = () => {
    localStorage.setItem('username', 'Guest')
    setIsGuest(true)
    setUsername('Guest')
    setIsAuthenticated(false)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUsername('')
    setIsAuthenticated(false)
  }

  const logoutGuest = () => {
    localStorage.removeItem('guest')
    setIsGuest(false)
    setUsername('')
    setIsAuthenticated(false)
  }

  // Provide the token and isAuthenticated values to the consuming components
  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAuthenticated,
        isGuest,
        login,
        loginGuest,
        logout,
        logoutGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
