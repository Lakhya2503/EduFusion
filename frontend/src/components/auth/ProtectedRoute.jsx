import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, userType } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute