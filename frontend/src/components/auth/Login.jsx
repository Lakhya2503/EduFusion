import { useState } from 'react'
import { useSelector } from 'react-redux'
import useAuth from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaChalkboardTeacher, FaUserGraduate, FaUserShield, FaSignInAlt } from 'react-icons/fa'
import { HiSelector } from 'react-icons/hi'

function Login() {
    const { userLogin } = useAuth()
    const navigate = useNavigate()
    
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        userType: "admin"
    })
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const user = useSelector((state) => state.auth)
    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await userLogin(credentials, credentials.userType)
            navigate(`/${credentials.userType}/dashboard`)
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setIsSubmitting(false)
        }
    }  

    // User type options with icons
    const userTypes = [
        { value: "admin", label: "Administrator", icon: <FaUserShield className="inline mr-2" /> },
        { value: "teacher", label: "Teacher", icon: <FaChalkboardTeacher className="inline mr-2" /> },
        { value: "student", label: "Student", icon: <FaUserGraduate className="inline mr-2" /> }
    ]

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-3xl p-8 text-white w-full max-w-md mx-4">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-4 shadow-lg">
                        <FaSignInAlt className="text-2xl text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="text-blue-200 opacity-90">Sign in to access your dashboard</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300">
                            <HiSelector className="h-5 w-5" />
                        </div>
                        <select
                            className="w-full bg-blue-800/40 text-white rounded-xl py-3 px-4 pl-10 outline-none border-2 border-blue-600/40 shadow-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition-all duration-300 appearance-none cursor-pointer"
                            value={credentials.userType}
                            onChange={e => setCredentials(prev => ({ ...prev, userType: e.target.value }))}
                        >
                            {userTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.icon} {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300">
                            <FaUser className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            id="user_name"
                            className="w-full bg-blue-800/40 border-2 border-blue-600/40 px-4 py-3 pl-10 rounded-xl text-white placeholder-blue-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition-all duration-300"
                            placeholder="Enter username"
                            onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300">
                            <FaLock className="h-5 w-5" />
                        </div>
                        <input
                            type="password"
                            id="pass"
                            className="w-full bg-blue-800/40 border-2 border-blue-600/40 px-4 py-3 pl-10 rounded-xl text-white placeholder-blue-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition-all duration-300"
                            placeholder="Enter password"
                            onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            <>
                                <FaSignInAlt className="mr-2" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
                
                {/* <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-blue-200 text-sm text-center">
                        <span className="font-semibold">Demo credentials:</span><br />
                        Admin: admin / admin123<br />
                        Teacher: teacher / teach123<br />
                        Student: student / student123
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default Login