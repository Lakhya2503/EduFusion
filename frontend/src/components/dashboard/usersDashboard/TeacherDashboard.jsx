// components/dashboards/TeacherDashboard.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { 
  FiUsers,
  FiBook, 
  FiCalendar, 
  FiAward,
  FiPlus,
  FiUpload
} from 'react-icons/fi';
import Dashboard from '../../../pages/Dashboard';
import { LuLogOut } from 'react-icons/lu';
import { BiHome, BiUser } from 'react-icons/bi';

const TeacherDashboard = () => {
  const { user, logout ,userType} = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { icon: <FiUsers size={18} />, text: "Students", tab: 'students' },
    { icon: <FiBook size={18} />, text: "Courses", tab: 'courses' },
    { icon: <FiCalendar size={18} />, text: "Schedule", tab: 'schedule' },
    { icon: <FiAward size={18} />, text: "Grades", tab: 'grades' },
    { 
      icon: <BiHome size={18} />, 
      text: "Home", 
      tab: 'home',
      action: () => navigate(`/${userType}/dashboard`)
    },
    { 
        icon: <BiUser size={18} />, 
        text: "Profile", 
        tab: 'home',
        action: () => navigate(`/${userType}/dashboard/profile`)
      },
    { 
      icon: <LuLogOut size={18} />, 
      text: "Logout", 
      tab: 'logout',
      action: () => logout()
    }
  ];

  const stats = [
    { 
      title: 'Total Students', 
      value: '156', 
      change: '+8%', 
      icon: <FiUsers className="text-green-500" size={20} />,
      trend: 'up' 
    },
    { 
      title: 'Active Courses', 
      value: '7', 
      change: '+1', 
      icon: <FiBook className="text-blue-500" size={20} />,
      trend: 'up' 
    },
    { 
      title: 'Assignments Due', 
      value: '12', 
      change: '+3', 
      icon: <FiAward className="text-yellow-500" size={20} />,
      trend: 'up' 
    }
  ];

  return (
    <Dashboard 
      navItems={navItems}
      stats={stats}
      title="Teacher Dashboard"
      user={user}
      defaultTab="dashboard"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hello, {user?.fullName || 'Teacher'}</h2>
            <p className="text-gray-600 mt-1">Manage your courses and students from this dashboard.</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FiPlus className="mr-2" />
              New Assignment
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FiUpload className="mr-2" />
              Upload Materials
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-green-800 text-lg">Teaching Schedule</h3>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                View Calendar
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Monday: 9:00 AM - Math 101</p>
                <p className="text-sm text-gray-500 mt-1">Room 205, 25 students</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Wednesday: 11:00 AM - Science 201</p>
                <p className="text-sm text-gray-500 mt-1">Lab 3, 18 students</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Friday: 2:00 PM - History 301</p>
                <p className="text-sm text-gray-500 mt-1">Room 112, 22 students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-blue-800 text-lg">Upcoming Deadlines</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Assignment 1 due tomorrow</p>
                <p className="text-sm text-gray-500 mt-1">Math 101 - 25 submissions</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Midterm exams next week</p>
                <p className="text-sm text-gray-500 mt-1">Prepare exam materials</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Parent-teacher meetings</p>
                <p className="text-sm text-gray-500 mt-1">Schedule appointments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default TeacherDashboard;