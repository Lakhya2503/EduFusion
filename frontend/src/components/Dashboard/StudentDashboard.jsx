import React from 'react'
import { useNavigate } from 'react-router-dom'

function StudentDashboard() {
  const navigate = useNavigate()
  return (
    <div>
          <ul>
                  <li onClick={()=>navigate('/')}>
                        home
                  </li>
          </ul>
    </div>
  )
}

export default StudentDashboard
