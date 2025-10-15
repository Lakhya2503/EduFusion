import React, { useState } from 'react';
import Navbar from '../common/Navbar';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    course: '',
    issueType: 'general',
    urgency: 'medium',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    'Web Development Bootcamp',
    'Data Science Fundamentals',
    'Machine Learning Advanced',
    'UI/UX Design',
    'Digital Marketing',
    'Python Programming',
    'React Masterclass'
  ];

  const issueTypes = [
    { value: 'technical', label: 'Technical Support', icon: '🔧' },
    { value: 'course', label: 'Course Content', icon: '📚' },
    { value: 'payment', label: 'Payment Issue', icon: '💳' },
    { value: 'account', label: 'Account Problem', icon: '👤' },
    { value: 'feedback', label: 'Feedback', icon: '💬' },
    { value: 'general', label: 'General Inquiry', icon: '❓' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'text-green-400' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { value: 'high', label: 'High', color: 'text-orange-400' },
    { value: 'critical', label: 'Critical', color: 'text-red-400' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Support ticket submitted:', formData);
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    
    setFormData({
      name: '',
      email: '',
      studentId: '',
      course: '',
      issueType: 'general',
      urgency: 'medium',
      message: ''
    });
    setIsSubmitting(false);
  };

  const supportStats = [
    { number: '15min', label: 'Avg. Response Time', icon: '⚡' },
    { number: '24/7', label: 'Support Available', icon: '🌙' },
    { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
    { number: '1h', label: 'Max Resolution Time', icon: '✅' }
  ];

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-950 text-white'>
      <Navbar />
      
      {/* Main Content */}
      <div className='container mx-auto px-4 py-16 pt-24'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
            LMS Support Center
          </h1>
          <p className='text-xl text-blue-200 max-w-3xl mx-auto'>
            Get help with your courses, technical issues, or provide feedback. Our support team is here to ensure your learning journey is smooth and successful.
          </p>
        </div>

        {/* Support Statistics */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto'>
          {supportStats.map((stat, index) => (
            <div key={index} className='bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 text-center border border-blue-700/30'>
              <div className='text-2xl mb-2'>{stat.icon}</div>
              <div className='text-2xl font-bold text-cyan-300'>{stat.number}</div>
              <div className='text-blue-200 text-sm'>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {/* Left Sidebar - Quick Help */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Quick Actions */}
            <div className='bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30'>
              <h3 className='text-xl font-semibold mb-4 text-cyan-300'>Quick Help</h3>
              <div className='space-y-3'>
                <button className='w-full text-left p-3 bg-blue-800/30 rounded-lg hover:bg-blue-700/40 transition-colors border border-blue-600/30'>
                  📖 FAQ & Knowledge Base
                </button>
                <button className='w-full text-left p-3 bg-blue-800/30 rounded-lg hover:bg-blue-700/40 transition-colors border border-blue-600/30'>
                  🎥 Video Tutorials
                </button>
                <button className='w-full text-left p-3 bg-blue-800/30 rounded-lg hover:bg-blue-700/40 transition-colors border border-blue-600/30'>
                  📋 Course Guidelines
                </button>
                <button className='w-full text-left p-3 bg-blue-800/30 rounded-lg hover:bg-blue-700/40 transition-colors border border-blue-600/30'>
                  🔒 Technical Requirements
                </button>
              </div>
            </div>

            {/* Support Channels */}
            <div className='bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30'>
              <h3 className='text-xl font-semibold mb-4 text-cyan-300'>Support Channels</h3>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3 p-3 bg-green-900/20 rounded-lg border border-green-600/30'>
                  <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                  <span>💬 Live Chat (Online)</span>
                </div>
                <div className='flex items-center space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-600/30'>
                  <span>📞 Phone Support</span>
                  <span className='text-blue-300 text-sm'>+1 (555) LMS-HELP</span>
                </div>
                <div className='flex items-center space-x-3 p-3 bg-purple-900/20 rounded-lg border border-purple-600/30'>
                  <span>👥 Community Forum</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className='bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-700/30'>
              <h3 className='text-xl font-semibold mb-3 text-red-300'>🚨 Urgent Issues</h3>
              <p className='text-sm text-red-200 mb-3'>
                For critical system outages or urgent technical problems that prevent learning:
              </p>
              <button className='w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold transition-colors'>
                Emergency Hotline
              </button>
            </div>
          </div>

          {/* Main Contact Form */}
          <div className='lg:col-span-2'>
            <div className='bg-blue-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/30'>
              <div className='flex items-center mb-6'>
                <div className='w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse'></div>
                <h2 className='text-3xl font-semibold text-cyan-300'>Submit Support Ticket</h2>
              </div>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-blue-200 mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors placeholder-blue-400'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-blue-200 mb-2'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors placeholder-blue-400'
                      placeholder='student@email.com'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='studentId' className='block text-sm font-medium text-blue-200 mb-2'>
                      Student ID
                    </label>
                    <input
                      type='text'
                      id='studentId'
                      name='studentId'
                      value={formData.studentId}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors placeholder-blue-400'
                      placeholder='Optional - for faster help'
                    />
                  </div>
                  <div>
                    <label htmlFor='course' className='block text-sm font-medium text-blue-200 mb-2'>
                      Related Course
                    </label>
                    <select
                      id='course'
                      name='course'
                      value={formData.course}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white'
                    >
                      <option value=''>Select a course...</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='issueType' className='block text-sm font-medium text-blue-200 mb-2'>
                      Issue Type *
                    </label>
                    <select
                      id='issueType'
                      name='issueType'
                      value={formData.issueType}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white'
                    >
                      {issueTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor='urgency' className='block text-sm font-medium text-blue-200 mb-2'>
                      Urgency Level *
                    </label>
                    <select
                      id='urgency'
                      name='urgency'
                      value={formData.urgency}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white'
                    >
                      {urgencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          <span className={level.color}>●</span> {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-blue-200 mb-2'>
                    Detailed Description *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 bg-blue-900/30 border border-blue-600/30 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors resize-none placeholder-blue-400'
                    placeholder='Please describe your issue in detail. Include error messages, steps to reproduce, and what you were trying to accomplish...'
                  />
                </div>

                <div className='flex items-center space-x-4 p-4 bg-blue-900/20 rounded-lg border border-blue-600/30'>
                  <input
                    type='checkbox'
                    id='screenshot'
                    className='w-4 h-4 text-cyan-400 bg-blue-900/30 border-blue-600 rounded focus:ring-cyan-400'
                  />
                  <label htmlFor='screenshot' className='text-sm text-blue-200'>
                    I have attached screenshots or relevant files that may help resolve this issue faster
                  </label>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {isSubmitting ? (
                    <div className='flex items-center justify-center'>
                      <div className='w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-3'></div>
                      Submitting Ticket...
                    </div>
                  ) : (
                    '🎫 Submit Support Ticket'
                  )}
                </button>
              </form>
            </div>

            {/* Additional Resources */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              <div className='bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-700/30'>
                <h3 className='text-lg font-semibold mb-3 text-green-300'>📚 Learning Resources</h3>
                <p className='text-green-200 text-sm mb-3'>Access additional learning materials and guides</p>
                <button className='text-green-300 hover:text-green-200 text-sm font-medium'>
                  View Resources →
                </button>
              </div>
              <div className='bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30'>
                <h3 className='text-lg font-semibold mb-3 text-purple-300'>👥 Peer Support</h3>
                <p className='text-purple-200 text-sm mb-3'>Connect with other students in our community</p>
                <button className='text-purple-300 hover:text-purple-200 text-sm font-medium'>
                  Join Community →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Contact;