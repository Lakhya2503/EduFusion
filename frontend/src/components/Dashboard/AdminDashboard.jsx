import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()
  return (
    <div className="flex bg-blue-300">






       <li onClick={()=>navigate('/')}>
                        home
                  </li>
    </div>
  )
}

export default AdminDashboard
