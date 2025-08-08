import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedDashboardWrapper = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, userType, isLoading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading spinner while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user exists (redundant with isAuthenticated in most cases)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  // Render children or outlet if authorized
  return children ? children : <Outlet />;
};

ProtectedDashboardWrapper.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

export default ProtectedDashboardWrapper;