import React, { useState, useEffect } from 'react';
import { 
  FiChevronDown, 
  FiChevronRight, 
  FiChevronUp, 
  FiMenu, 
  FiX,
  FiUser,
  FiHome,
  FiBell,
  FiSearch
} from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { useNavigate, Outlet } from 'react-router-dom';
import { Education_image } from '../../public';

const Dashboard = ({ 
  navItems = [], 
  stats = [], 
  title = 'Dashboard', 
  user = {}, 
  defaultTab = 'dashboard',
  showSearch = false,
  notifications = 0
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavItem = ({ icon, text, tab, action, badge, isActive }) => {
    const handleClick = () => {
      if (action) {
        action();
      } else {
        navigate(tab);
        if (isMobile) setMobileSidebarOpen(false);
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span className={`text-lg ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
          {icon}
        </span>
        {sidebarOpen && (
          <div className="flex items-center flex-1 ml-3">
            <span className="font-medium">{text}</span>
            {badge && (
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800">
                {badge}
              </span>
            )}
            {isActive && !badge && (
              <span className="ml-auto h-2 w-2 rounded-full bg-indigo-500"></span>
            )}
          </div>
        )}
      </button>
    );
  };

  const StatCard = ({ title, value, change, icon, trend, description }) => {
    const isPositive = trend === 'up';
    
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold mt-1 text-gray-800 group-hover:text-indigo-600 transition-colors">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <div className={`h-10 w-10 rounded-full ${
            isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          } flex items-center justify-center transition-colors group-hover:bg-opacity-80`}>
            {icon}
          </div>
        </div>
        {change && (
          <div className={`mt-3 flex items-center text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
            {isPositive ? (
              <FiChevronUp className="ml-1" />
            ) : (
              <FiChevronDown className="ml-1" />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderUserAvatar = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt="User" className="rounded-full h-full w-full object-cover" />;
    }
    return <span className="text-white font-bold">{user?.fullName?.charAt(0) || 'U'}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className={`hidden md:block ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white text-gray-700 transition-all duration-300 border-r border-gray-200 shadow-sm relative z-10`}>
          <div className="p-4 flex items-center justify-between h-16">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                EduFusion
              </h1>
            ) : (
              <img src={Education_image} alt="EduFusion" className='w-8 h-8 object-contain' />
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? (
                <FiChevronRight className="h-5 w-5" />
              ) : (
                <FiChevronDown className="h-5 w-5 transform rotate-90" />
              )}
            </button>
          </div>
          
          <nav className="mt-4 mx-2 px-2 space-y-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.tab}
                {...item}
                isActive={window.location.pathname.includes(item.tab)}
              />
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
                {renderUserAvatar()}
              </div>
              {sidebarOpen && (
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate text-gray-800">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Open menu"
            >
              <FiMenu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="flex items-center space-x-2">
              {notifications > 0 && (
                <button className="relative p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <FiBell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                </button>
              )}
            </div>
          </header>

          {/* Dashboard Content */}
          <section className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                {showSearch && (
                  <div className="mt-4 md:mt-0 relative w-full md:w-64">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    />
                  </div>
                )}
              </div>
              
              {stats.length > 0 && window.location.pathname.endsWith('dashboard') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                  {stats.map((stat, index) => (
                    <StatCard key={`stat-${index}`} {...stat} />
                  ))}
                </div>
              )}
              
              <Outlet />
            </div>
          </section>
        </main>
      </div>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-gray-600 bg-opacity-75" 
            onClick={() => setMobileSidebarOpen(false)}
            role="button"
            aria-label="Close sidebar"
            tabIndex={0}
          ></div>
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                EduFusion
              </h1>
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                aria-label="Close menu"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <NavItem 
                  key={item.tab}
                  {...item}
                  isActive={window.location.pathname.includes(item.tab)}
                />
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
                  {renderUserAvatar()}
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate text-gray-800">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;