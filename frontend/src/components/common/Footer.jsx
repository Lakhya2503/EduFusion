import React from 'react'
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiBook,
  FiUsers,
  FiAward,
  FiLayers,
  FiHelpCircle,
  FiLock
} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Edufusion",
      icon: <FiBook className="inline mr-2" />,
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Instructors", href: "/instructors" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
      ]
    },
    {
      title: "Courses",
      icon: <FiLayers className="inline mr-2" />,
      links: [
        { name: "Browse Courses", href: "/courses" },
        { name: "Popular Topics", href: "/topics" },
        { name: "New Arrivals", href: "/new-courses" },
        { name: "Certification", href: "/certification" },
        { name: "Free Resources", href: "/free-resources" },
      ]
    },
    {
      title: "Community",
      icon: <FiUsers className="inline mr-2" />,
      links: [
        { name: "Discussion Forums", href: "/forums" },
        { name: "Events", href: "/events" },
        { name: "Study Groups", href: "/study-groups" },
        { name: "Mentorship", href: "/mentorship" },
        { name: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Support",
      icon: <FiHelpCircle className="inline mr-2" />,
      links: [
        { name: "Help Center", href: "/help" },
        { name: "FAQs", href: "/faqs" },
        { name: "Contact Us", href: "/contact" },
        { name: "System Status", href: "/status" },
        { name: "Feedback", href: "/feedback" },
      ]
    }
  ]

  const contactInfo = [
    { icon: <FiMapPin className="text-blue-400" />, text: "123 Education Blvd, Suite 200, San Francisco, CA 94107" },
    { icon: <FiPhone className="text-blue-400" />, text: "+1 (555) 123-4567" },
    { icon: <FiMail className="text-blue-400" />, text: "support@edufusion.com" },
    { icon: <FiClock className="text-blue-400" />, text: "Mon-Fri: 8am-6pm PST" }
  ]

  const socialLinks = [
    { icon: <FiFacebook />, href: "#", name: "Facebook" },
    { icon: <FiTwitter />, href: "#", name: "Twitter" },
    { icon: <FiInstagram />, href: "#", name: "Instagram" },
    { icon: <FiLinkedin />, href: "#", name: "LinkedIn" },
    { icon: <FiYoutube />, href: "#", name: "YouTube" }
  ]

  const appLinks = [
    { name: "iOS App", href: "#" },
    { name: "Android App", href: "#" },
    { name: "Desktop App", href: "#" }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Edufusion
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              Transforming education through innovative learning solutions. Join our community of 500,000+ learners worldwide.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="mb-8">
              <h4 className="text-white font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none border-2 border-blue-700 text-gray-400"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-xl"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                {section.icon}
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline hover:underline-offset-4"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-800 rounded-lg p-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start">
              <span className="mt-1 mr-3 text-xl">{info.icon}</span>
              <span className="text-gray-300">{info.text}</span>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <FiLock className="text-gray-500" />
            <p className="text-gray-500 text-sm">
              Secure & trusted learning platform
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {appLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="text-gray-300 hover:text-white text-sm border border-gray-700 px-3 py-1 rounded-full hover:bg-gray-800 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Accessibility</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Sitemap</a>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Edufusion. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer