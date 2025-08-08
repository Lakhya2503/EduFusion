import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { FiUser, FiMail, FiBook, FiAward, FiCalendar, FiEdit, FiSave, FiMapPin } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { BiHome } from 'react-icons/bi';

const StudentProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    studentId: user?.studentId || 'S123456',
    major: user?.major || 'Computer Science',
    year: user?.year || 'Junior',
    bio: user?.bio || 'Passionate student with a focus on technology and innovation',
    contact: user?.contact || '+1 (555) 123-4567',
    address: user?.address || '123 University Ave, Campus Town'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Updated profile:', formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Student Profile
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(!isEditing)}
            className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-300 ${
              isEditing 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
            }`}
          >
            {isEditing ? (
              <>
                <FiSave className="mr-2" size={18} />
                Save Changes
              </>
            ) : (
              <>
                <FiEdit className="mr-2" size={18} />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-indigo-600" size={20} />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Personal Information
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.name}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.email}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.contact}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Student ID</label>
                <p className="text-gray-800 font-medium">{formData.studentId}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBook className="mr-2 text-indigo-600" size={20} />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Academic Information
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Major</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.major}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Year</label>
                {isEditing ? (
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  >
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{formData.year}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiMapPin className="mr-2 text-indigo-600" size={20} />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contact Information
              </span>
            </h2>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                />
              ) : (
                <p className="text-gray-800">{formData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4 border-4 border-white shadow-md">
                  {user?.fullName?.charAt(0) || 'S'}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-800 text-center">{formData.name}</h3>
              <p className="text-sm text-gray-500 text-center">{formData.major}</p>
              <p className="text-sm font-medium text-indigo-600 mt-1">{formData.year}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiAward className="mr-2 text-indigo-600" size={20} />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Academic Stats
              </span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <FiAward className="text-indigo-600" />
                  </div>
                  <span className="text-gray-700">GPA</span>
                </div>
                <span className="font-bold text-indigo-700">3.8</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-full mr-3">
                    <FiBook className="text-emerald-600" />
                  </div>
                  <span className="text-gray-700">Credits</span>
                </div>
                <span className="font-bold text-emerald-700">72</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FiUser className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">Enrolled Courses</span>
                </div>
                <span className="font-bold text-blue-700">5</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiCalendar className="mr-2 text-indigo-600" size={20} />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Upcoming Deadlines
              </span>
            </h2>
            
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:shadow-sm transition-shadow">
                <p className="font-medium text-indigo-700">Math Midterm</p>
                <p className="text-sm text-gray-500">Tomorrow, 9:00 AM</p>
                <p className="text-xs text-gray-400 mt-1">Room: MATH-205</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:shadow-sm transition-shadow">
                <p className="font-medium text-indigo-700">Science Project Due</p>
                <p className="text-sm text-gray-500">Next Monday</p>
                <p className="text-xs text-gray-400 mt-1">Submit online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;