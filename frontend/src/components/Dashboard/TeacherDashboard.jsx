import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { FaArrowAltCircleLeft, FaBell, FaArrowAltCircleRight } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import { FaBookOpen, FaCircleUser, FaMagnifyingGlass, FaGear } from "react-icons/fa6"
import { IoIosCalendar, IoIosNotifications } from "react-icons/io"
import { SiGooglemessages } from "react-icons/si"
import { useSelector } from 'react-redux'
import Calendar from './teacher/Calendar'
import Message from './teacher/Message'
import TeacherCourse from './teacher/TeacherCourse'
import Notification from './teacher/Notification'
import TeacherDashHome from './teacher/TeacherDashHome'
import TeacherSettings from './teacher/TeacherSettings'
import { EduFusionSVG } from '../../../public'
import { FaHome } from 'react-icons/fa'

function TeacherDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)

  // Set active item based on current route
  useEffect(() => {
    const currentPath = location.pathname.split('/').pop()
    setActiveItem(currentPath || 'home')
  }, [location])

  const openSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setActiveItem(path)
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Add search functionality here
  }

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "home",
      icon: MdDashboard 
    },
    {
      name: "My Courses",
      path: "courses",
      icon: FaBookOpen
    },
    {
      name: "Notification",
      path: "notification",
      icon: IoIosNotifications
    },
    {
      name: "Message",
      path: "message",
      icon: SiGooglemessages
    },
    {
      name: "Calendar",
      path: "calendar",
      icon: IoIosCalendar
    },
    {
      name: "Settings",
      path: "setting",
      icon: FaGear
    },
    {
      name: "Home",
      path: "/",
      icon: FaHome
    },
  ]

  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 min-h-screen w-full">
      {/* Sidebar */}
      <div className={`flex flex-col h-screen bg-gradient-to-b from-white to-blue-50/30 shadow-xl border-r border-blue-100 transition-all duration-500 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}>
        {/* Logo Section */}
        <div className="flex justify-start p-4 border-b border-blue-100/50">
          <div className={`flex items-center justify-between my-2 rounded-2xl font-medium transition-all duration-300 ${
            isSidebarOpen ? "w-full " : "w-20"
          }`}>
            <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 absolute"
            }`}>
              Edufusion
            </span>
            <span className={`text-2xl font-bold text-blue-700 transition-all duration-300 ${
              isSidebarOpen ? "opacity-0 scale-0 absolute" : "opacity-100 scale-100"
            }`}>
              
            </span> 
            <button 
              onClick={openSidebar} 
              className=''
            >
              {isSidebarOpen ?  
                <FaArrowAltCircleLeft className="text-lg" /> :
                <div className="h-12 w-12">
              <img src={EduFusionSVG} alt=""  className='h-full w-full hover:rotate-[-25deg] transition-all duration-500'/>
              </div>
              }
            </button> 
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ul className={`flex flex-col gap-2 transition-all duration-300 ${
            isSidebarOpen ? "w-64 px-3" : "w-20 px-2"
          }`}>
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`flex items-center w-full transition-all duration-300 rounded-xl group relative ${
                    isSidebarOpen 
                      ? "px-4 py-3 text-lg justify-start gap-4" 
                      : "p-3 justify-center"
                  } ${
                    activeItem === item.path
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25 border-l-4 border-white"
                      : "text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md border-l-4 border-transparent"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                  aria-label={item.name}
                >
                  <item.icon className={`text-xl transition-transform duration-200 ${
                    activeItem === item.path ? "scale-110" : "group-hover:scale-110"
                  }`} />
                  <span className={`transition-all duration-300 font-medium ${
                    isSidebarOpen 
                      ? "opacity-100 translate-x-0 pr-4" 
                      : "opacity-0 translate-x-4 absolute left-full ml-2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
                  } ${isSidebarOpen ? "" : "group-hover:opacity-100 group-hover:translate-x-0"}`}>
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className={`p-4 border-t border-blue-100/50 bg-white/50 backdrop-blur-sm ${
          isSidebarOpen ? "" : "flex justify-center"
        }`}>
          {isAuthenticated ? (
            <div className={`flex items-center ${isSidebarOpen ? "gap-3" : "justify-center"}`}>
               <img src={user.avatar} className='rounded-full h-10 w-10 object-cover' alt="" /> 
              
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{user.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              )}
            </div>
          ) : (
            <div className={`flex items-center ${isSidebarOpen ? "gap-3" : "justify-center"}`}>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <FaCircleUser className="text-xl text-gray-500" />
              </div>
              {isSidebarOpen && (
                <div>
                  <p className="font-semibold text-gray-800">Guest User</p>
                  <p className="text-xs text-gray-500">Please sign in</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-gradient-to-r from-white to-blue-50/30 shadow-sm border-b border-blue-100/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Welcome Section */}
              <div className="flex items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome back{isAuthenticated ? `, ${user.fullName}` : ", Teacher"}
                </h2>
                {isAuthenticated && (
                  <span className="ml-3 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full shadow-sm">
                    {user.teacherType || "Teacher"}
                  </span>
                )}
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMagnifyingGlass className='text-gray-400'/>
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses, students, or resources..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm"
                    aria-label="Search"
                  />
                </div>
              </div>

              {/* Notifications and User Info */}
              <div className="flex items-center gap-4">
                <button 
                  className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                  aria-label="Notifications"
                >
                  <FaBell className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-pulse">
                    3
                  </span>
                </button>

                <div className="w-px h-8 bg-gray-200"></div>

                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <p className="font-semibold text-gray-800">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                      <img src={user.avatar} className="rounded-full h-10 w-10 object-cover" alt="" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                      <p className="font-semibold text-gray-800">Guest Teacher</p>
                      <p className="text-sm text-gray-500">Sign in to continue</p>
                    </div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <FaCircleUser className="text-xl text-gray-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50/30 to-indigo-50/30">
          <div className="p-6">
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 min-h-[calc(100vh-12rem)] shadow-sm border border-white/50">
              <Routes>
                <Route path='*' element={<TeacherDashHome />} />
                <Route path='home' element={<TeacherDashHome />} />
                <Route path='courses' element={<TeacherCourse />} />
                <Route path='notification' element={<Notification />} />
                <Route path='message' element={<Message />} />
                <Route path='calendar' element={<Calendar />} />
                <Route path='setting' element={<TeacherSettings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard