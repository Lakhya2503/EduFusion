import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' }
  ];

  const courses = [
    { name: 'Web Development', path: '/courses/web-dev' },
    { name: 'Data Science', path: '/courses/data-science' },
    { name: 'Machine Learning', path: '/courses/ml' },
    { name: 'Graphic Design', path: '/courses/design' },
    { name: 'Business Analytics', path: '/courses/business' },
    { name: 'Mobile Development', path: '/courses/mobile' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/edufusion', name: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/edufusion', name: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/edufusion', name: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/edufusion', name: 'LinkedIn' },
    { icon: <FaYoutube />, url: 'https://youtube.com/edufusion', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg mr-3">
                <span className="text-2xl font-bold text-white">EF</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                EduFusion
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming education through innovative learning solutions. Join thousands of students 
              mastering new skills with our expert-led courses and cutting-edge curriculum.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="text-blue-400 mr-3" />
                <span>info@edufusion.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaPhone className="text-blue-400 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="text-blue-400 mr-3" />
                <span>123 Education Street, Learning City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400">
              Popular Courses
            </h4>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <a 
                    href={course.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform block"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400">
              Stay Updated
            </h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <div className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-r-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © {currentYear} EduFusion. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;