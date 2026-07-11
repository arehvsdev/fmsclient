import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'
import '../styles/Topbar.css'

interface TopbarProps {
  title: string
}

function Topbar({ title }: TopbarProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="topbar">
      <div className="topbar-content">
        <h1 className="topbar-title">{title}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Topbar
