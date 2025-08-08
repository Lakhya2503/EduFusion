import { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { FiUser, FiSettings, FiShield, FiEdit, FiSave, FiCamera } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { BiHome } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName?.toUpperCase() || '',
    email: user?.email || '',
    adminId: user?._id || 'A456789',
    role: user?.role?.toUpperCase() || 'SYSTEM ADMINISTRATOR',
    department: user?.department || 'IT SERVICES',
    avatar: user?.avatar || "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
  });
  const [tempAvatar, setTempAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (tempAvatar) {
      setFormData(prev => ({ ...prev, avatar: tempAvatar }));
      setTempAvatar(null);
    }
    console.log('Updated profile:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempAvatar(null);
    setFormData({
      name: user?.fullName?.toUpperCase() || '',
      email: user?.email || '',
      adminId: user?._id || 'A456789',
      role: user?.role?.toUpperCase() || 'SYSTEM ADMINISTRATOR',
      department: user?.department || 'IT SERVICES',
      avatar: user?.avatar || "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">ADMIN PROFILE</h1>
          <p className="text-indigo-600 font-medium">Manage your account settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-emerald-200"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all shadow"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-200"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="relative group">
              <img 
                src={tempAvatar || formData.avatar} 
                alt="Admin Avatar" 
                className="w-full h-64 object-cover rounded-lg mb-4 border-4 border-white shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-xl cursor-pointer hover:bg-gray-100 transition-all transform hover:scale-110">
                  <FiCamera className="text-indigo-600 text-lg" />
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">{formData.name}</h3>
              <p className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full inline-block mt-2">
                {formData.role}
              </p>
              <p className="text-gray-500 text-sm mt-3 bg-gray-50 px-3 py-1 rounded-full">
                {formData.department}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiSettings className="mr-2 text-indigo-600" />
              SYSTEM STATS
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between py-3 px-2 border-b border-gray-100 hover:bg-indigo-50 rounded-lg transition-colors">
                <span className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Total Users
                </span>
                <span className="font-medium text-gray-800">1,234</span>
              </div>
              <div className="flex justify-between py-3 px-2 border-b border-gray-100 hover:bg-indigo-50 rounded-lg transition-colors">
                <span className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Active Courses
                </span>
                <span className="font-medium text-gray-800">56</span>
              </div>
              <div className="flex justify-between py-3 px-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <span className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  System Status
                </span>
                <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-sm">ONLINE</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiShield className="mr-2 text-indigo-600" />
              QUICK ACTIONS
            </h2>
            
            <div className="space-y-2">
              <button 
                className="w-full flex items-center px-4 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all hover:translate-x-1"
                onClick={() => navigate(`/admin/dashboard`)}
              >
                <BiHome className="mr-2 text-lg" />
                Dashboard
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all hover:translate-x-1">
                <FiUser className="mr-2 text-lg" />
                Manage Users
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all hover:translate-x-1">
                <FiSettings className="mr-2 text-lg" />
                System Settings
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center px-4 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all hover:translate-x-1 mt-4"
              >
                <LuLogOut className="mr-2 text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center pb-2 border-b border-gray-100">
              <FiUser className="mr-2 text-indigo-600 text-xl" />
              PERSONAL INFORMATION
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all shadow-sm"
                  />
                ) : (
                  <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border border-gray-200">{formData.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all shadow-sm"
                  />
                ) : (
                  <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border border-gray-200">{formData.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Admin ID</label>
                <p className="text-gray-800 font-medium p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-700">
                  {formData.adminId}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Last Login</label>
                <p className="text-gray-800 font-medium p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-700">
                    {user?.updatedAt 
                      ? new Date(user.updatedAt).toLocaleString('en-US', {
                          weekday: 'short', 
                          year: 'numeric',  
                          month: 'short',  
                          day: 'numeric',    
                          hour: '2-digit',  
                          minute: '2-digit', 
                          hour12: true       
                        }) 
                      : 'N/A'}
                  </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center pb-2 border-b border-gray-100">
              <FiShield className="mr-2 text-indigo-600 text-xl" />
              ADMINISTRATIVE INFORMATION
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Role</label>
                {isEditing ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 appearance-none bg-white shadow-sm"
                  >
                    <option value="SYSTEM ADMINISTRATOR">SYSTEM ADMINISTRATOR</option>
                    <option value="DATABASE ADMINISTRATOR">DATABASE ADMINISTRATOR</option>
                    <option value="NETWORK ADMINISTRATOR">NETWORK ADMINISTRATOR</option>
                    <option value="SUPER ADMINISTRATOR">SUPER ADMINISTRATOR</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border border-gray-200">{formData.role}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all shadow-sm"
                  />
                ) : (
                  <p className="text-gray-800 font-medium p-3 bg-gray-50 rounded-lg border border-gray-200">{formData.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Permissions</label>
                <p className="text-gray-800 font-medium p-3 bg-purple-50 rounded-lg border border-purple-100 text-purple-700">
                  Full Access
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Account Status</label>
                <p className="text-emerald-800 font-medium p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  ACTIVE
                </p>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl shadow-lg border border-indigo-200">
              <h2 className="text-lg font-semibold text-indigo-800 mb-6 flex items-center pb-2 border-b border-indigo-100">
                <FiShield className="mr-2 text-indigo-600 text-xl" />
                PASSWORD UPDATE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all shadow-sm"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <p className="text-sm text-indigo-500 mt-3 italic">Leave blank if you don't want to change password</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;