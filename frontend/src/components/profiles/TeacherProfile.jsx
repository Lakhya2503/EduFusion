import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { FiUser, FiMail, FiBook, FiAward, FiClock, FiEdit, FiSave, FiPhone, FiCalendar, FiMapPin, FiInfo } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { BiHome } from 'react-icons/bi';

const TeacherProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    contact: user?.contact || '',
    dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
    gender: user?.gender || '',
    addressLine1: user?.addressLine1 || '',
    addressLine2: user?.addressLine2 || '',
    pincode: user?.pincode || '',
    teacherId: user?._id || 'T789012',
    department: user?.department || 'Computer Science',
    position: user?.position || 'Associate Professor',
    yearsOfExperience: user?.yearsOfExperience || '10',
    subjectsTaught: user?.subjectsTaught || 'JAVA',
    professionalBiography: user?.professionalBiography || '',
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
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Teacher Profile
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(!isEditing)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              isEditing 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
            }`}
          >
            {isEditing ? (
              <>
                <FiSave className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <FiEdit className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-indigo-600" />
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
                <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {new Date(formData.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium capitalize">{formData.gender}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Teacher ID</label>
                <p className="text-gray-800 font-medium">{formData.teacherId}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiMapPin className="mr-2 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Address Information
              </span>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Address Line 1</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.addressLine1}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Address Line 2</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.addressLine2}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Pincode</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.pincode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiBook className="mr-2 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Professional Information
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.department}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Position</label>
                {isEditing ? (
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  >
                    <option value="Lecturer">Lecturer</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor">Professor</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{formData.position}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Years of Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.yearsOfExperience} years</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Subjects Taught</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="subjectsTaught"
                    value={formData.subjectsTaught}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.subjectsTaught}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiInfo className="mr-2 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Professional Biography
              </span>
            </h2>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              {isEditing ? (
                <textarea
                  name="professionalBiography"
                  value={formData.professionalBiography}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 bg-white"
                />
              ) : (
                <p className="text-gray-800">{formData.professionalBiography}</p>
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
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold mb-4 border-4 border-white shadow-md">
                  {user?.fullName?.charAt(0) || 'T'}
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-800 text-center">{formData.name}</h3>
              <p className="text-sm text-gray-500 text-center">{formData.position}</p>
              <p className="text-sm font-medium text-indigo-600 mt-1">{formData.department}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiAward className="mr-2 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Teaching Stats
              </span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <FiAward className="text-indigo-600" />
                  </div>
                  <span className="text-gray-700">Years Experience</span>
                </div>
                <span className="font-bold text-indigo-700">{formData.yearsOfExperience} years</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-full mr-3">
                    <FiBook className="text-emerald-600" />
                  </div>
                  <span className="text-gray-700">Subjects Taught</span>
                </div>
                <span className="font-bold text-emerald-700">{formData.subjectsTaught}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FiUser className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">Current Courses</span>
                </div>
                <span className="font-bold text-blue-700">4</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <FiUser className="text-purple-600" />
                  </div>
                  <span className="text-gray-700">Total Students</span>
                </div>
                <span className="font-bold text-purple-700">156</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiClock className="mr-2 text-indigo-600" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Upcoming Classes
              </span>
            </h2>
            
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:shadow-sm transition-shadow">
                <p className="font-medium text-indigo-700">Advanced Java</p>
                <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                <p className="text-xs text-gray-400 mt-1">Room: CS-201</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:shadow-sm transition-shadow">
                <p className="font-medium text-indigo-700">Enterprise Systems</p>
                <p className="text-sm text-gray-500">Wednesday, 1:00 PM</p>
                <p className="text-xs text-gray-400 mt-1">Room: CS-105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;