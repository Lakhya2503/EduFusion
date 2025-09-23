import React from 'react'
import Navbar from '../common/Navbar'
import { HERO_girl, Student_1, Student_2, Student_3, Student_4, Teacher_Teaching } from '../../../public'
import { GiBookmarklet } from "react-icons/gi";
import { IoMdCall } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { MdScreenShare } from "react-icons/md";
import { BiChalkboard } from "react-icons/bi";
import { HiMiniHandRaised } from "react-icons/hi2";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi"; 
import { LuChartSpline } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CourseCarousel from './../cards/CourseCarousel';

function Home() {



  return (
    <div className='h-fit w-full text-white'>
          <nav className='h-fit w-full bg-blue-400 rounded-br-[250px] px-25'>
                  <Navbar/> 
                  <div className="flex w-full mt-3 py-10 justify-between items-center">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 uppercase">
                              <button className='px-1 py-1 my-3 font-medium uppercase bg-orange-400 hover:bg-blue-400 rounded-2xl flex gap-2 duration-200 cursor-pointer'>
                                <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-6 h-6"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <polygon points="8,5 19,12 8,19" />
                                        </svg>
                            </button>
                                get a Demo on demand
                            </div>
                            <div className="flex flex-col gap-3 text-7xl leading-24 w-60">
                               <h2 className=' font-bold capitalize'>Blending Innovation with <span className='text-pink-500'>Education</span></h2>
                               <h2 className=' font-bold capitalize'>  </h2>
                              <h2 className=' font-bold capitalize'></h2>
                              <h2 className='uppercase leading-7 text-[15px] w-[600px] opacity-60'>Edufusion transforms learning by merging innovation with education. Experience engaging courses, personalized paths, and collaborative tools—all designed to empower learners and educators for success in a dynamic digital world.</h2>
                            </div>
                            <div className="flex my-7 py-3 gap-10 font-medium">
                                  <button className='px-5 py-4 font-medium uppercase bg-orange-400 rounded-full flex gap-2  hover:bg-transparent duration-200 cursor-pointer border border-blue-400 hover:border-white'>
                                        start Learning
                                  </button>
                                  <button className='px-5 py-4 font-medium uppercase hover:text-orange-500 rounded-full flex gap-2 duration-200 cursor-pointer'>
                                          <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-6 h-6"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <polygon points="8,5 19,12 8,19" />
                                        </svg>
                                        All courses
                                  </button>
                            </div>
                        </div>


 
                       <div className="h-[100%] w-[50%] overflow-hidden">
                        <img src={HERO_girl} alt="" className=" relative z-0 h-full w-full object-cover " 
                         style={{
                         WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
                         maskImage: 'linear-gradient(to top, transparent 0%, black 20%)',
                           }}/>
                              <div className="z-30 absolute px-8 py-6 rounded-full top-40 text-gray-500 shadow-cyan-600 bg-white/40 text-center border border-blue-400 hover:border-white hover:text-white hover:bg-blue-400 duration-200">
                                  <div className="flex items-center flex-col">
                                          <GiBookmarklet  
                                                size='30px'>
                                        </GiBookmarklet >
                                <h2 className='text-xl font-bold '> 20+</h2>
                                <h2 className='text-[15px] font-medium  '>Courses </h2>
                              </div>
                                </div>
                      </div>
                  </div>
          </nav>
          <div className="flex flex-col px-25 text-zinc-900">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col my-20">
                      <h3 className='text-5xl font-bold'>Technologies You </h3>
                      <h3 className='text-5xl font-bold'>will Learn </h3>
                </div>
                      <ul className="flex flex-wrap justify-center gap-6 max-w-4xl">

                          {/* HTML */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-orange-500 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-[15px]">HTML</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">HTML</span>
                          </div>
                        </li>

                         {/* CSS */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-blue-400 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-[15px]">CSS</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">CSS</span>
                          </div>
                        </li>

                        {/* JavaScript */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-yellow-400 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-[15px]">JS</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">JavaScript</span>
                          </div>
                        </li>

                        {/* Angular */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-red-600 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-[15px]">ANG</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">Angular</span>
                          </div>
                        </li>

                        {/* React */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-[15px]">React</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">React</span>
                          </div>
                        </li>

                        {/* Express.js */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-gray-800 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-sm">Express</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">Express.js</span>
                          </div>
                        </li>

                        {/* Java */}
                        <li className="group relative">
                          <div className="w-18 h-18 bg-red-500 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-[15px]">JAVA</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">Java</span>
                          </div>
                        </li>

                        <li className="group relative">
                          <div className="w-18 h-18 bg-green-600 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                            <span className="text-white font-bold text-xl">Dj</span>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-black text-sm font-medium whitespace-nowrap">Django</span>
                          </div>
                        </li>
                     </ul>
        </div>
            <div className="flex justify-between gap-30 items-center my-10 w-full">
                          <div className="py-8 px-2 flex flex-col gap-5">
                                {/* <h2 className="text-3xl font-medium">Online Learning with meet</h2> */}
                                <div className="flex flex-col content-start ">
                                       <div className="flex gap-2 px-3 py-3 bg-gray-200 w-full rounded-t-2xl">
                                      <span className='px-1 py-1 bg-red-500 rounded-full'></span>
                                      <span className='px-1 py-1 bg-green-500 rounded-full'></span>
                                      <span className='px-1 py-1 bg-yellow-500 rounded-full'></span>
                                </div>
                                  <div className="flex flex-col bg-gray-100 p-3 rounded-b-2xl ">
                                        <div className="flex flex-row w-fit  rounded-b-2xl  gap-2 items-center">
                                              <div className="flex justify-center items-center w-full h-full">
                                                 <img src={Teacher_Teaching} alt="" className='h-[250px] w-fit rounded-xl ' />
                                              </div>
                                          <div className="grid grid-cols-2 gap-2 w-1/2  pr-3">
                                                <img src={Student_1} alt="" className='h-32 w-full object-cover rounded-xl' />
                                                <img src={Student_2} alt="" className='h-32 w-full object-cover rounded-xl'/>
                                                <img src={Student_3} alt="" className='h-32 w-full object-cover rounded-xl' />
                                                <img src={Student_4} alt="" className='h-32 w-full object-cover rounded-xl'/>
                                          </div>
                                        </div>
                                        <div className="flex justify-center gap-3 mt-5">
                                              <button className='text-xl font-medium bg-gray-500 px-3 py-3 text-white rounded-full hover:bg-gray-700 duration-150'><IoMdCall /></button>
                                              <button className='text-xl font-medium bg-gray-500 px-3 py-3 text-white rounded-full hover:bg-gray-700 duration-150'><FaMicrophone /></button>
                                              <button className='text-xl font-medium bg-gray-500 px-3 py-3 text-white rounded-full hover:bg-gray-700 duration-150'><MdScreenShare /></button>
                                              <button className='text-xl font-medium bg-gray-500 px-3 py-3 text-white rounded-full hover:bg-gray-700 duration-150'><HiMiniHandRaised /></button>
                                              <button className='text-xl font-medium bg-gray-500 px-3 py-3 text-white rounded-full hover:bg-gray-700 duration-150'><BiChalkboard /></button>
                                        </div>
                                  </div>
                                </div>
          </div>
          <div className="w-[50%] h-fit">
                          <h3 className='text-4xl font-bold mb-8'>
                                <span className='text-blue-700 '>Benefits</span> from our Online Learning
                          </h3>
                          <ul className='flex flex-col gap-5 my-4'>
                                <li className='flex gap-6'>
                                        <span
                                        className='bg-blue-400 hover:bg-blue-700 p-3 h-fit  rounded-full w-fit flex items-center duration-400'
                                    ><MdOutlineWatchLater 
                                        className="text-white text-4xl icon-transition" 
                                    /></span>
                                      <div className="flex flex-col font-bold">
                                          <h2 className='text-2xl'>Flexibilty</h2>
                                          <p className='opacity-60'>Learn at your own pace, anytime and anywhere, without discrupting your schedule.</p>
                                      </div>
                                </li>
                                <li className='flex gap-6'>
                                      <span
                                        className='bg-blue-400 hover:bg-blue-700 p-3 h-fit  rounded-full w-fit flex items-center duration-400'
                                    ><FiUserCheck 
                                        className="text-white text-4xl icon-transition" 
                                    /></span>
                                      <div className="flex flex-col font-bold">
                                          <h2 className='text-2xl'>Expert Instructors</h2>
                                          <p className='opacity-60'>Going knowledge from industry professionals with real-world experience.</p>
                                      </div>
                                </li>
                                <li className='flex gap-6'>
                                       <span
                                          className='bg-blue-400 hover:bg-blue-700 p-3 h-fit  rounded-full w-fit flex items-center duration-400'
                                    ><LuChartSpline  
                                        className="text-white text-4xl icon-transition" 
                                    /></span>
                                      <div className="flex flex-col font-bold">
                                          <h2 className='text-2xl'>Career Growth</h2>
                                          <p className='opacity-60'>Develop in-demand skills, earn cerufucations, and advance tour career with confidence.</p>
                                      </div>
                                </li>
                          </ul>                        
              </div>
                </div>

                <div className="my-4 flex flex-col">
                          <div className="flex items-center justify-between">
                            <h3 className='text-3xl font-bold uppercase'>
                                Expore our Courses
                          </h3>
                            <div className='py-3 flex items-center gap-3 w-full max-w-[350px] h-auto mb-6'>
                                <div 
                                className="flex items-center w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
                                >
                                  <input 
                                    type="search" 
                                    placeholder={`search....`}
                                    className="w-full h-auto py-2 px-4 border-none focus:outline-none focus:ring-0"
                                  />
                                  <button 
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 transition-colors duration-200 flex items-center justify-center"
                                    aria-label="Search"
                                  >
                                    <FaMagnifyingGlass />
                                  </button>
                              </div>
                              </div>
                          </div>
                                      <CourseCarousel/>
                  </div>



              
          </div>

    </div>
  )
}

export default Home
