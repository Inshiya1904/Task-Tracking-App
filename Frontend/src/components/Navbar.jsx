import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
  <div className='navbar'>
    <div className="nav-container">
    <h2>Task Tracker</h2>
    <button className='logout-btn' onClick={handleLogout}>Logout</button>
  </div>
  </div>
  )
}

export default Navbar