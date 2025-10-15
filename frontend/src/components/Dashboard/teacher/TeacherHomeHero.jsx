import React from 'react'
import { FaCalendarAlt, FaBell, FaBook, FaUsers, FaAward, FaChalkboardTeacher, FaGraduationCap, FaClock } from 'react-icons/fa'
import { MdEmail, MdComputer, MdSchedule } from 'react-icons/md'
import { IoIosSchool } from 'react-icons/io'

function TeacherHomeHero({ user }) {
  
  // Use props data with fallbacks
  const avatar = user?.avatar || "https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
  const fullName = user?.fullName || "Dr. Sarah Johnson"
  const email = user?.email || "s.johnson@university.edu"
  const department = user?.teacherType || "Computer Science"
  
  // Handle join date properly
  const joinDate = user?.createdAt ? 
    new Date(user.createdAt).getFullYear().toString() : 
    "2022"

  const stats = [
    { icon: <FaBook className="text-blue-500" />, label: 'Active Courses', value: 5 },
    { icon: <FaUsers className="text-green-500" />, label: 'Total Students', value: 142 },
    { icon: <FaClock className="text-purple-500" />, label: 'Today\'s Classes', value: 3 },
    { icon: <FaAward className="text-yellow-500" />, label: 'Completion Rate', value: '92%' }
  ]

  const todaysClasses = [
    { time: '9:00 AM', subject: 'Data Structures', icon: <MdComputer className="text-blue-400" /> },
    { time: '11:00 AM', subject: 'Web Development', icon: <IoIosSchool className="text-green-400" /> },
    { time: '2:00 PM', subject: 'Database Systems', icon: <FaGraduationCap className="text-purple-400" /> }
  ]

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg overflow-hidden w-full">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={avatar} 
                alt={`${fullName}'s profile`}
                className="w-24 h-24 rounded-2xl border-4 border-white/20 object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="text-white">
              <h1 className="text-3xl font-bold capitalize mb-2">{fullName}</h1>
              <div className="flex items-center gap-2 text-blue-100 mb-1">
                <FaChalkboardTeacher className="text-lg" />
                <span className="font-medium">Professor of {department}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                <MdEmail className="text-lg" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm">
                <FaCalendarAlt className="text-lg" />
                <span>Teaching since {joinDate}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200">
              <FaCalendarAlt />
              Schedule
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200">
              <FaBell />
              Notifications
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20 hover:bg-white/15 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-blue-100 text-sm mt-1">{stat.label}</p>
                </div>
                <div className="text-2xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 px-8 py-4 border-t border-white/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MdSchedule className="text-white text-xl" />
            <span className="font-medium text-white">Today's Schedule:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {todaysClasses.map((classItem, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-lg">
                <div className="text-xl">
                  {classItem.icon}
                </div>
                <div className="text-white">
                  <div className="font-medium text-sm">{classItem.subject}</div>
                  <div className="text-blue-100 text-xs">{classItem.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            All classes on schedule
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherHomeHero