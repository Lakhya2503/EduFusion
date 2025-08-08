import React, { useContext, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { 
  FiUsers, 
  FiSettings, 
  FiBook, 
  FiPieChart, 
  FiCalendar,
  FiPlus,
  FiFileText,
  FiDownload,
  FiActivity,
  FiAward
} from 'react-icons/fi';
import Dashboard from '../../../pages/Dashboard';
import { LuLogOut } from 'react-icons/lu';
import { BiHome, BiUser } from 'react-icons/bi';

// Import all sub-components
import Users from '../Users';
import Courses from '../Courses';
import Calendar from '../Calendar';
import Analytics from '../Analytics';
import Settings from '../Settings';
import Profile from '../../profiles/AdminProfile';

const AdminDashboard = () => {
  const { user, logout, userType } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notifications] = useState(3); // Example notification count

  const navItems = [
    { icon: <FiUsers size={18} />, text: "Users", tab: 'users' },
    { icon: <FiBook size={18} />, text: "Courses", tab: 'courses' },
    { icon: <FiCalendar size={18} />, text: "Calendar", tab: 'calendar' },
    { icon: <FiPieChart size={18} />, text: "Analytics", tab: 'analytics' },
    { 
        icon: <FiSettings size={18} />, 
        text: "Setting", 
        tab: 'setting',
      },
    { 
        icon: <BiHome size={18} />, 
        text: "Home", 
        tab: 'home',
      },
    { 
      icon: <BiUser size={18} />, 
      text: "Profile", 
      tab: 'profile',
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
      title: 'Total Users', 
      value: '1,234', 
      change: '+12%', 
      icon: <FiUsers className="text-blue-500" size={20} />,
      trend: 'up',
      description: 'Active users this month'
    },
    { 
      title: 'Active Courses', 
      value: '56', 
      change: '+5%', 
      icon: <FiBook className="text-purple-500" size={20} />,
      trend: 'up',
      description: 'Currently available'
    },
    { 
      title: 'Pending Requests', 
      path: "calendar",
      value: '23', 
      change: '-2%', 
      icon: <FiCalendar className="text-yellow-500" size={20} />,
      trend: 'down',
      description: 'Require approval'
    },
    { 
      title: 'Engagement Rate', 
      value: '78%', 
      change: '+8%', 
      icon: <FiActivity className="text-green-500" size={20} />,
      trend: 'up',
      description: 'User activity'
    }
  ];




  return (
    <Dashboard 
      navItems={navItems}
      stats={stats}
      title="Admin Dashboard"
      user={{
        fullName: user?.fullName,
        email: user?.email,
        avatar: user?.avatar,
        role: 'Administrator'
      }}
      showSearch={true}
      notifications={notifications}
    >

      
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="profile" element={<Profile user={user} />} />
      </Routes>
    </Dashboard>
  );
};

export default AdminDashboard;