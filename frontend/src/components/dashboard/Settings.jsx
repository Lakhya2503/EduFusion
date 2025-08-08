import React, { useState } from 'react';
import { FiSettings, FiSave, FiLock, FiMail, FiBell, FiUser } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    notifications: true,
    securityLevel: 'high'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center w-full p-3 rounded-lg text-left ${
                activeTab === 'general' 
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiSettings className="mr-3" />
              General
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center w-full p-3 rounded-lg text-left ${
                activeTab === 'profile' 
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiUser className="mr-3" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center w-full p-3 rounded-lg text-left ${
                activeTab === 'security' 
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiLock className="mr-3" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center w-full p-3 rounded-lg text-left ${
                activeTab === 'notifications' 
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiBell className="mr-3" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center w-full p-3 rounded-lg text-left ${
                activeTab === 'email' 
                  ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiMail className="mr-3" />
              Email Settings
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Theme</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.theme || 'light'}
                    onChange={handleChange}
                    name="theme"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.language || 'en'}
                    onChange={handleChange}
                    name="language"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="analytics"
                    name="analytics"
                    checked={formData.analytics || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="analytics" className="ml-2 block text-sm text-gray-700">
                    Enable Analytics Tracking
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <FiUser className="text-gray-500 text-xl" />
                    </div>
                    <button
                      type="button"
                      className="ml-4 px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiSave className="mr-2" />
                  Save Profile
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Security Level</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.securityLevel}
                    onChange={handleChange}
                    name="securityLevel"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="twoFactor"
                      name="twoFactor"
                      checked={formData.twoFactor || false}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700">
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Adds an extra layer of security to your account
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                  <button
                    type="button"
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Change Password
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiSave className="mr-2" />
                  Save Security Settings
                </button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                    Enable Notifications
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Sound</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.notificationSound || 'default'}
                    onChange={handleChange}
                    name="notificationSound"
                  >
                    <option value="default">Default</option>
                    <option value="chime">Chime</option>
                    <option value="bell">Bell</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNewsletter"
                        name="emailNewsletter"
                        checked={formData.emailNewsletter || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="emailNewsletter" className="ml-2 block text-sm text-gray-700">
                        Newsletter
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailUpdates"
                        name="emailUpdates"
                        checked={formData.emailUpdates || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="emailUpdates" className="ml-2 block text-sm text-gray-700">
                        System Updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailPromotions"
                        name="emailPromotions"
                        checked={formData.emailPromotions || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="emailPromotions" className="ml-2 block text-sm text-gray-700">
                        Promotions
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiSave className="mr-2" />
                  Save Notification Settings
                </button>
              </div>
            </form>
          )}

          {activeTab === 'email' && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Email Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Signature</label>
                  <textarea
                    name="emailSignature"
                    value={formData.emailSignature || ''}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email signature here..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Email Format</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.emailFormat || 'html'}
                    onChange={handleChange}
                    name="emailFormat"
                  >
                    <option value="html">HTML</option>
                    <option value="plain">Plain Text</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailReadReceipts"
                    name="emailReadReceipts"
                    checked={formData.emailReadReceipts || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailReadReceipts" className="ml-2 block text-sm text-gray-700">
                    Request Read Receipts
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiSave className="mr-2" />
                  Save Email Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;