// components/dashboards/StudentDashboard.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { 
  FiBook, 
  FiCalendar, 
  FiAward, 
  FiClipboard,
  FiDownload,
  FiUpload,
  FiSettings
} from 'react-icons/fi';
import Dashboard from '../../../pages/Dashboard';
import { LuLogOut } from 'react-icons/lu';
import { BiHome, BiUser } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';

const StudentDashboard = () => {
  const { user,userType, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { icon: <FiBook size={18} />, text: "Courses", tab: 'courses' },
    { icon: <FiCalendar size={18} />, text: "Schedule", tab: 'schedule' },
    { icon: <FiAward size={18} />, text: "Grades", tab: 'grades' },
    { icon: <FiClipboard size={18} />, text: "Assignments", tab: 'assignments' },
    { 
      icon: <BiUser size={18} />, 
      text: "Profile", 
      tab: 'home',
      action: () => navigate(`/${userType}/dashboard/profile`)
    },
      { 
          icon: <BiHome size={18} />, 
          text: "Home", 
          tab: 'home',
          action: () => navigate(`/${userType}/dashboard`)
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
      title: 'Enrolled Courses', 
      value: '5', 
      change: '+1', 
      icon: <FiBook className="text-indigo-500" size={20} />,
      trend: 'up' 
    },
    { 
      title: 'Assignments Due', 
      value: '3', 
      change: '+2', 
      icon: <FiClipboard className="text-red-500" size={20} />,
      trend: 'up' 
    },
    { 
      title: 'Current GPA', 
      value: '3.8', 
      change: '+0.2', 
      icon: <FiAward className="text-green-500" size={20} />,
      trend: 'up' 
    }
  ];

  return (
    <Dashboard 
      navItems={navItems}
      stats={stats}
      title="Student Dashboard"
      user={user}
      defaultTab="dashboard"
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.fullName || 'Student'}</h2>
            <p className="text-gray-600 mt-1">Track your learning progress and upcoming tasks.</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <FiDownload className="mr-2" />
              Download Materials
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FiUpload className="mr-2" />
              Submit Assignment
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-indigo-800 text-lg">Today's Classes</h3>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Full Schedule
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">9:00 AM - Mathematics</p>
                <p className="text-sm text-gray-500 mt-1">Room 205 with Prof. Smith</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">11:00 AM - Science</p>
                <p className="text-sm text-gray-500 mt-1">Lab 3 with Prof. Johnson</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">2:00 PM - History</p>
                <p className="text-sm text-gray-500 mt-1">Room 112 with Prof. Williams</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-yellow-800 text-lg">Upcoming Assignments</h3>
              <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Math homework - Due tomorrow</p>
                <p className="text-sm text-gray-500 mt-1">Chapter 5 exercises</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">Science project - Due next week</p>
                <p className="text-sm text-gray-500 mt-1">Group presentation</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-xs">
                <p className="font-medium text-gray-800">History essay - Due in 2 weeks</p>
                <p className="text-sm text-gray-500 mt-1">1500 words on WW2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default StudentDashboard;