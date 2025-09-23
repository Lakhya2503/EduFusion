import { Route, Routes, Navigate, useLocation } from 'react-router-dom'

// {
//   // import AdminDashboard from './components/dashboard/usersDashboard/AdminDashboard'
// // import TeacherDashboard from './components/dashboard/usersDashboard/TeacherDashboard'
// // import StudentDashboard from './components/dashboard/usersDashboard/StudentDashboard'
// // import Login from './components/auth/Login'
// // import Navbar from './components/common/Navbar'
// // import { AuthProvider } from './components/auth/AuthContext'
// // import Footer from './components/common/Footer'
// // import ProtectedRoute from './components/auth/ProtectedRoute'
// // import HomePage from './pages/HomePage'
// // import AdminProfile from './components/profiles/AdminProfile'
// // import TeacherProfile from './components/profiles/TeacherProfile'
// // import StudentProfile from './components/profiles/StudentProfile'
// // import CoursesPage from './pages/CoursesPage'
// // import AboutPage from './pages/AboutPage'
// // import ContactPage from './pages/ContactPage'
// // import Users from './components/dashboard/Users'
// // import Courses from './components/dashboard/Courses'
// // import ProtectedDashboardWrapper from './components/auth/ProtectedDashboardWrapper'
// // import Calendar from './components/dashboard/Calendar'
// // import Analytics from './components/dashboard/Analytics'
// // import Settings from './components/dashboard/Settings'
// // import Dashboard from './pages/Dashboard'
// // import Students from './components/dashboard/Students'
// // import Teachers from './components/dashboard/Teachers'
// // import AuthInitializer from './store/slice/AuthInitializer';
// }

import { useSelector } from 'react-redux';

import Login from './components/auth/Login'
import AdminDashboard from './components/Dashboard/AdminDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import Home from './components/page/Home';
// import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import About from './components/page/About';
import Contact from './components/page/Contact';
import PricingFAQ from './components/page/PricingFAQ';
import Blogs from './components/page/Blogs';
import Courses from './components/page/Courses';
function App() {
// {
//     // const location = useLocation()
//   // const isAuthPage = location.pathname === '/login'
//   // const isAnyDashboard = [
//   //   '/dashboard',
//   //   '/admin/dashboard',
//   //   '/admin/profile',
//   //   '/teacher/dashboard',
//   //   '/teacher/profile',
//   //   '/student/dashboard',
//   //   '/student/profile',
//   // ].some(path => location.pathname.startsWith(path))
// }

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  const user = useSelector((state)=>state.auth)
  console.log(user);

  // const  {
  //   _id,
  //   userType
  // } = user.user

  // console.log(_id);
  

  <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-10 ">

  </div>

  

      


  // return (
  //   //  <AuthInitializer>

  //   //   <div className="flex flex-col min-h-screen bg-[#ECECEC]">
  //   //     {!isAuthPage && !isAnyDashboard && <Navbar className="fixed top-0 w-full z-50" />}
        
  //   //     <main className={`flex-grow ${!isAuthPage && !isAnyDashboard ? 'mt-14' : ''}`}>
  //   //       <Routes>
  //   //         {/* Public Routes */}
  //   //         <Route path="/" element={<HomePage />} />
  //   //         {/* <Route path="/login" element={<Login />} /> */}
  //   //         <Route path="/login" element={<LoginComponent />} />
  //   //         <Route path="/courses" element={<CoursesPage />} />
  //   //         <Route path="/about" element={<AboutPage />} />
  //   //         <Route path="/contact" element={<ContactPage />} />

  //   //         {/* Protected Dashboard Routes (no navbar) */}
  //   //          {/* <Route element={<ProtectedDashboardWrapper allowedRoles={['admin']} />}> */}
  //   //             <Route path="/admin/dashboard" element={<AdminDashboard />}>
  //   //             <Route path="teachers" element={<Teachers />} />
  //   //             <Route path="students" element={<Students />} />
  //   //             <Route path="courses" element={<Courses />} />
  //   //             <Route path="home" element={<Dashboard />} />
  //   //             <Route path="profile" element={<AdminProfile />} />
  //   //             <Route path="calendar" element={<Calendar />} />
  //   //             <Route path="analytics" element={<Analytics />} />
  //   //             <Route path="settings" element={<Settings />} />
  //   //         </Route>
  //   //       {/* </Route>   */}

  //   //         {/* <Route element={<ProtectedRoute allowedRoles={['teacher']} />}> */}
  //   //           <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
  //   //           <Route path="/teacher/dashboard/profile" element={<TeacherProfile role="teacher" />} />
  //   //           <Route path="/teacher/profile" element={<TeacherProfile role="teacher" />} />
  //   //         {/* </Route> */}

  //   //         {/* <Route element={<ProtectedRoute allowedRoles={['student']} />}> */}
  //   //           <Route path="/student/dashboard" element={<StudentDashboard />} />
  //   //           <Route path="/student/dashboard/profile" element={<StudentProfile role="student" />} />
  //   //           <Route path="/student/profile" element={<StudentProfile role="student" />} />
  //   //         {/* </Route> */}

  //   //         {/* Legacy dashboard route - redirect based on role */}
  //   //         <Route 
  //   //           path="/dashboard" 
  //   //           element={
  //   //             <ProtectedRoute>
  //   //               {({ userType }) => {
  //   //                 switch(userType) {
  //   //                   case 'admin': return <Navigate to="/admin/dashboard" replace />
  //   //                   case 'teacher': return <Navigate to="/teacher/dashboard" replace />
  //   //                   case 'student': return <Navigate to="/student/dashboard" replace />
  //   //                   default: return <Navigate to="/login" replace />
  //   //                 }
  //   //               }}
  //   //             </ProtectedRoute>
  //   //           } 
  //   //         />

  //   //         {/* Catch-all route */}
  //   //         <Route path="*" element={<Navigate to="/" replace />} />
  //   //       </Routes>
  //   //     </main>

  //   //     {/* Footer - shown everywhere except login and dashboard pages */}
  //   //     {!isAuthPage && !isAnyDashboard && <Footer />}
  //   //   </div>
  //   //  </AuthInitializer>


    
  // !isAuthenticated ? (
  //          <LoginComponent/> 
  // ) : (
  //    <Card/>
  // )

      return (
         <div className="flex h-fit flex-col">
          {/* <Navbar/> */}
             <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/pricing-faq' element={<PricingFAQ/>} />
                <Route path='/blogs' element={<Blogs/>} />
                <Route path='/courses' element={<Courses/>} />
                <Route path='admin/dashboard' element={<AdminDashboard/>} />
                <Route path='teacher/dashboard' element={<TeacherDashboard/>} />
                <Route path='login' element={<Login/>} />
                <Route path='student/dashboard' element={<StudentDashboard/>} />
          </Routes>
              <Footer/>
         </div>
      )


  // )

}

export default App 