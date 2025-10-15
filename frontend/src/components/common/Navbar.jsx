import React, { useState } from 'react';
import { Education_image } from '../../../public/index';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavCard from '../cards/NavCard';
import { 
  FiHome, 
  FiPhone, 
  FiBook, 
  FiDollarSign, 
  FiFileText, 
  FiInfo,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { MdEmojiObjects } from "react-icons/md";


function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome className="mr-1" />
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <FiPhone className="mr-1" />
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <FiBook className="mr-1" />
    },
    {
      name: "demo",
      path: "/demo",
      icon: <MdEmojiObjects  className="mr-1" />
    },
    {
      name: "Blogs",
      path: "/blogs",
      icon: <FiFileText className="mr-1" />
    },
    {
      name: "About",
      path: "/about",
      icon: <FiInfo className="mr-1" />
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full text-white">
      <nav className="px-6 py-3 w-full flex justify-between items-center max-w-7xl mx-auto">

        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate('/')}
        >
          <img src={Education_image} className="object-cover h-12 w-12 rounded-lg hover:rotate-[-25deg] duration-500" alt="Edufusion Logo" />
          <h3 className="text-2xl font-bold text-white">Edufusion</h3>
        </div>


        <ul className="hidden md:flex justify-between gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                className={({isActive}) =>
                  `flex items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-white text-blue-700 shadow-md" 
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink> 
            </li>
          ))}
        </ul>


        <div className="hidden md:flex items-center">
          {isAuthenticated && (
            <NavCard className="text-white" />
          )}

          {
            !isAuthenticated &&  (
            <NavLink 
              to="/login" 
              className="flex items-center py-2 px-5 rounded-lg bg-white text-blue-700 font-medium transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
            >
              Login
            </NavLink>
          )
          }
        </div>


        <button 
          className="md:hidden text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 px-6 py-4 shadow-inner transition-all duration-500 ease-in-out">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({isActive}) =>
                    `flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-white text-blue-700" 
                        : "text-blue-100 hover:bg-blue-700"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink> 
              </li>
            ))}
            <li className="mt-4">
              {isAuthenticated ? (
                <div onClick={() => setIsMobileMenuOpen(false)}>
                  <NavCard />
                </div>
              ) : (
                <NavLink 
                  to="/login" 
                  className="flex justify-center items-center py-3 px-4 rounded-lg bg-white text-blue-700 font-medium transition-all duration-300 hover:bg-blue-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;