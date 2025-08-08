import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaAward, FaBookOpen } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">About EduFusion</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Bridging the gap between traditional education and modern technology to create transformative learning experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2018, EduFusion began as a small team of educators and technologists passionate about revolutionizing learning. 
              We noticed the growing disconnect between traditional classroom methods and the digital-native generation.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a weekend project quickly grew into a comprehensive learning management system serving over 500,000 students 
              and 20,000 educators worldwide. Our mission is to make quality education accessible, engaging, and personalized.
            </p>
            <p className="text-gray-600">
              Today, EduFusion stands at the forefront of educational technology, continuously innovating to meet the evolving needs of 
              learners in the 21st century.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Students learning together" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Beliefs</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <FaGraduationCap size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Mission</h3>
              <p className="text-gray-600">
                To empower learners of all ages by providing an intuitive, engaging platform that adapts to individual 
                learning styles while fostering collaboration and critical thinking skills.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-purple-600 mb-4">
                <FaChalkboardTeacher size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Vision</h3>
              <p className="text-gray-600">
                We envision a world where geographical and socioeconomic barriers don't limit access to quality education, 
                where learning is a lifelong, joyful journey powered by technology and human connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">EduFusion in Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <FaUsers size={48} className="text-indigo-300" />
              </div>
              <p className="text-5xl font-bold mb-2">500K+</p>
              <p className="text-indigo-200">Active Learners</p>
            </div>
            
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <FaChalkboardTeacher size={48} className="text-indigo-300" />
              </div>
              <p className="text-5xl font-bold mb-2">20K+</p>
              <p className="text-indigo-200">Educators</p>
            </div>
            
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <FaBookOpen size={48} className="text-indigo-300" />
              </div>
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="text-indigo-200">Courses</p>
            </div>
            
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <FaAward size={48} className="text-indigo-300" />
              </div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-indigo-200">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Leadership</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Dr. Sarah Chen', role: 'CEO & Founder', bio: 'Former professor of education with 15+ years in curriculum development.', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'James Rodriguez', role: 'CTO', bio: 'Tech visionary specializing in educational platforms and AI learning systems.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Priya Patel', role: 'Head of Learning', bio: 'Expert in pedagogical approaches and student engagement strategies.', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
            { name: 'Michael Johnson', role: 'Product Director', bio: 'Focuses on creating intuitive user experiences for diverse learners.', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
            { name: 'Elena Petrov', role: 'Community Manager', bio: 'Builds and nurtures our global learning community.', img: 'https://randomuser.me/api/portraits/women/63.jpg' },
            { name: 'David Kim', role: 'Head of Partnerships', bio: 'Connects EduFusion with institutions and organizations worldwide.', img: 'https://randomuser.me/api/portraits/men/81.jpg' },
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={member.img} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the EduFusion Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Whether you're a student, educator, or lifelong learner, we have something for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Explore Courses
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors duration-300">
              Teach With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;