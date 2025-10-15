import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/slice/authSlice';

function NavCard({
    className
}) {
    const user = useSelector((state) => state.auth.user);
    const {
        avatar,
        email,
        fullName,
        role : userType
    } = user

    
    console.log(userType);
    

    const [hoverd, setHovered] = useState(false)

    const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout()
    console.log(`logout`);
    
  }

    console.log(user);

   
    
  return (
            <div className="flex text-gray-500 items-center gap-3">
                <div className="flex flex-col"
                    onClick={()=>setHovered(prev => !prev)}
                >
                   <div className="flex items-center gap-3">
                     <img src={avatar} alt="" className='h-10 w-10 rounded-full border-2 border-blue-600'/>
                    <h2 className={`${className}`}>{fullName}</h2>
                   </div>
                    <div className="flex flex-col" ref={dropdownRef}>
                                {
                                    hoverd && (
                                        <div className="absolute text-[12px] bg-white border-[1px] border-blue-600 rounded-xl mt-3 text-gray-700 ">
                                            <ul className="flex flex-col gap-2 items-center my-3 mx-2 ">
                                                <li
                                                    className='hover:bg-blue-300 px-4 py-1 text-blue-700 rounded-2xl flex gap-2'
                                                >{email}</li>
                                                <li>
                                                    <NavLink to={`/${userType}/dashboard`} className={`hover:bg-green-300 px-4 py-1 text-green-700 rounded-2xl flex gap-2`}>
                                                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg> 
                                                            Dashboard
                                                    </NavLink>
                                                </li>
                                                <li> 
                                                    <NavLink onClick={handleLogout} className={`hover:bg-red-300 px-4 py-1 text-red-700 rounded-2xl flex gap-2`}>
                                                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                        </svg>
                                                         Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }

                            </div>
                    </div>
            </div>
  )
}

export default NavCard
