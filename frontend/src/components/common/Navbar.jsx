import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { 
  FiMenu, FiX, FiSearch, FiUser, 
  FiBell, FiMessageSquare,
  FiHome, FiGrid, FiBook, FiInfo, FiMail,
  FiLogOut
} from 'react-icons/fi';
import { AuthContext } from '../auth/AuthContext';
import { Education_image } from '../../../public';

const Navbar = () => {
  const {user, isAuthenticated, userType,logout } = useContext(AuthContext)
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
    setIsOpen(false);
  };

  const navItems = [
    { id: 1, name: 'Home', path: '/', icon: <FiHome className="mr-2" /> },
    { id: 3, name: 'Courses', path: '/courses', icon: <FiBook className="mr-2" /> },
    { id: 4, name: 'About', path: '/about', icon: <FiInfo className="mr-2" /> },
    { id: 5, name: 'Contact', path: '/contact', icon: <FiMail className="mr-2" /> },
  ].filter(item => item.visible !== false);

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    return names.map(n => n[0]?.toUpperCase()).join('').slice(0, 2);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 shadow-sm backdrop-blur-sm py-2 border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with increased spacing */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img src={Education_image} alt="EduFusion Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                EduFusion
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-6"> {/* Added ml-6 for more space */}
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4"> {/* Increased space-x */}
            {/* Search Bar - Desktop - Made larger */}
            <div className="hidden md:block relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-800 transition-all duration-200"
              />
            </div>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-indigo-500 relative transition-colors duration-200"
                >
                  <FiBell size={18} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-xs text-indigo-500">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="px-4 py-3 text-center text-sm text-gray-500">
                        No new notifications
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile or Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="User" 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" 
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
                      {getUserInitials()}
                    </div>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || ''}
                      </p>
                      {userType && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700">
                          {userType.charAt(0).toUpperCase() + userType.slice(1)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                         navigate(`/${userType}/profile`);
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <FiUser className="text-indigo-500" />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/${userType}/dashboard`);
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <FiGrid className="text-indigo-500" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <FiLogOut className="text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-4"> 
                  <NavLink
                className='px-6 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md' 
                  to="/login"
                  >
                    Login
                  </NavLink>  
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
              aria-label="Menu"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
          {/* Search Bar - Mobile - Made larger */}
          <div className="relative mb-3 px-2"> {/* Increased mb */}
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-800"
            />
          </div>

          {/* Mobile Menu Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center px-3 py-3 rounded-lg text-base font-medium ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}

          {/* Auth Buttons - Mobile */}
          {!isAuthenticated ? (
            <div className="pt-3 px-2 space-y-3"> {/* Increased spacing */}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2.5 text-center rounded-lg text-base font-medium text-indigo-600 hover:bg-gray-100"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="pt-3 px-2 space-y-3"> {/* Increased spacing */}
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="mr-2 text-indigo-500" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2.5 rounded-lg text-base font-medium text-red-500 hover:bg-red-50"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;