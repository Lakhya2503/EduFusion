import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { 
  FaBookOpen, 
  FaUserGraduate, 
  FaUsers, 
  FaChartBar, 
  FaClock, 
  FaAward,
  FaPlay,
  FaStar,
  FaGraduationCap,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaGlobe,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaUserTie,
  FaHandshake,
  FaArrowRight
} from 'react-icons/fa';
import { 
  SiGooglescholar,
  // SiGoogledevs
} from 'react-icons/si';

function About() {
  const [activeTab, setActiveTab] = useState('mission');
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const stats = [
    { icon: FaUsers, value: '50,000+', label: 'Active Students', color: 'from-blue-500 to-cyan-500' },
    { icon: FaChalkboardTeacher, value: '500+', label: 'Expert Instructors', color: 'from-purple-500 to-pink-500' },
    { icon: FaBookOpen, value: '2,000+', label: 'Courses Available', color: 'from-green-500 to-emerald-500' },
    { icon: FaAward, value: '95%', label: 'Success Rate', color: 'from-orange-500 to-red-500' }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Chief Learning Officer',
      icon: FaGraduationCap,
      bio: 'PhD in Education Technology with 15+ years experience in online learning',
      courses: 42,
      rating: 4.9,
      color: 'text-blue-400'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Technology',
      icon: FaLaptopCode,
      bio: 'Former Google engineer passionate about scalable learning platforms',
      courses: 28,
      rating: 4.8,
      color: 'text-purple-400'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Curriculum Director',
      icon: SiGooglescholar,
      bio: 'Specialized in instructional design and student engagement strategies',
      courses: 35,
      rating: 4.9,
      color: 'text-green-400'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Student Success Manager',
      icon: FaUserTie,
      bio: 'Dedicated to ensuring every student achieves their learning goals',
      courses: 19,
      rating: 4.7,
      color: 'text-orange-400'
    }
  ];

  const features = [
    {
      icon: FaPlay,
      title: 'Interactive Video Lessons',
      description: 'Engaging video content with interactive quizzes and assignments',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaChartBar,
      title: 'Progress Tracking',
      description: 'Real-time analytics to monitor your learning journey',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaUsers,
      title: 'Community Learning',
      description: 'Connect with peers and instructors in discussion forums',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaClock,
      title: 'Self-Paced Learning',
      description: 'Learn at your own convenience with lifetime access',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const values = [
    {
      icon: FaRocket,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge educational technology',
      color: 'text-blue-400'
    },
    {
      icon: FaAward,
      title: 'Excellence',
      description: 'Committed to the highest standards in education quality',
      color: 'text-purple-400'
    },
    {
      icon: FaGlobe,
      title: 'Accessibility',
      description: 'Making quality education available to everyone, everywhere',
      color: 'text-green-400'
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Driven by our love for teaching and learning',
      color: 'text-red-400'
    }
  ];

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white'>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <FaGraduationCap className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Edufusion
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transforming education through innovative technology and personalized learning experiences. 
            Join over 50,000 students in their journey to mastery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center text-gray-300">
              <FaStar className="text-yellow-400 mr-2" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center text-gray-300">
              <FaGlobe className="text-blue-400 mr-2" />
              <span>150+ Countries</span>
            </div>
            <div className="flex items-center text-gray-300">
              <FaHandshake className="text-green-400 mr-2" />
              <span>98% Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-2xl transition-all duration-300 group-hover:scale-105`}>
                  <div className="bg-gray-900 rounded-2xl p-6 text-center h-full">
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-2">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800 rounded-xl p-1 mb-8 max-w-md mx-auto">
            {[
              { id: 'mission', label: 'Mission', icon: FaRocket },
              { id: 'story', label: 'Story', icon: FaBookOpen },
              { id: 'values', label: 'Values', icon: FaHeart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center space-x-2 flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
            {activeTab === 'mission' && (
              <div className="text-center">
                <FaLightbulb className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  To democratize education by providing accessible, high-quality learning opportunities 
                  to students worldwide. We believe everyone deserves the chance to learn, grow, and 
                  achieve their full potential through innovative technology and expert instruction.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-300 font-semibold">
                      "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="text-center">
                <FaBookOpen className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                <h3 className="text-3xl font-bold mb-4">Our Story</h3>
                <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Founded in 2018 by a team of educators and technologists, our LMS platform was born 
                  from a shared vision to bridge the gap between traditional education and modern 
                  learning needs. Today, we serve students across 150+ countries with cutting-edge 
                  learning solutions.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2018</div>
                    <div className="text-gray-400">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">50K+</div>
                    <div className="text-gray-400">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">150+</div>
                    <div className="text-gray-400">Countries</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="text-center">
                <FaHeart className="w-16 h-16 mx-auto mb-6 text-red-400" />
                <h3 className="text-3xl font-bold mb-4">Our Values</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {values.map((value, index) => (
                    <div key={index} className="bg-gray-900/50 p-6 rounded-xl group hover:bg-gray-900/80 transition-all duration-300">
                      <value.icon className={`w-12 h-12 mx-auto mb-4 ${value.color} group-hover:scale-110 transition-transform`} />
                      <div className="text-xl font-bold text-white mb-2">{value.title}</div>
                      <p className="text-gray-300 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose LearnMaster?
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Discover the features that make our learning platform stand out from the rest
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${feature.gradient} p-0.5 rounded-2xl transition-all duration-300 group-hover:scale-105`}>
                  <div className="bg-gray-900 rounded-2xl p-6 h-full">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                    <div className="mt-4 flex items-center text-blue-400 text-sm font-semibold">
                      <span>Learn more</span>
                      <FaArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Passionate educators and technologists dedicated to your learning success
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="group relative"
                onMouseEnter={() => setHoveredTeam(member.id)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 transition-all duration-300 ${
                  hoveredTeam === member.id ? 'border-blue-500 scale-105' : 'border-gray-700'
                }`}>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-800 rounded-full">
                      <member.icon className={`text-3xl ${member.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-center mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm text-center mb-4">{member.bio}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{member.courses} courses</span>
                    <div className="flex items-center space-x-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span>{member.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-gray-700 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400 rounded-full blur-xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-400 rounded-full blur-xl opacity-30"></div>
            
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of students who have transformed their careers with our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <FaBookOpen className="mr-2" />
                  Explore Courses
                </button>
                <button className="border border-gray-600 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center">
                  <FaPlay className="mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;