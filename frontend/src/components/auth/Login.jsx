import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import {
    Teacher_image,
    Student_image,
    Admin_image
} from '../../../public/index'

const Login = () => {
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '',
        userType: 'admin'
    });
    
    const { login, loading, error, isAuthenticated, userType } = useContext(AuthContext);
    const [focusField, setFocusField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && userType) {
            navigate(`/${userType}/dashboard`, { replace: true });
        }
    }, [isAuthenticated, userType, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAnimating(true);
        await login(credentials, credentials.userType);
        setIsAnimating(false);
    };

    const handleUserTypeChange = (e) => {
        setIsAnimating(true);
        setCredentials({...credentials, userType: e.target.value});
        setTimeout(() => setIsAnimating(false), 500);
    };

    const userTypeConfig = {
        admin: { 
            bg: 'from-blue-50/95 to-indigo-50/95 via-blue-100/80',
            button: 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
            text: 'text-blue-700',
            accent: 'text-indigo-600',
            label: 'Administrator',
            border: 'border-blue-200/80',
            ring: 'ring-blue-300/50',
            shadow: 'shadow-xl shadow-blue-200/30',
            bgDark: 'bg-gradient-to-r from-blue-600 to-indigo-700',
            dot: 'bg-blue-500',
            image: Admin_image,
            bgImage: 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90',
            selectBg: 'bg-blue-50/80',
            selectHover: 'hover:bg-blue-100/80',
            selectActive: 'bg-blue-200/80',
            buttonText: 'text-white',
            inputBg: 'bg-white/95',
            errorBg: 'bg-red-50/95',
            imageOverlay: 'bg-white/20 backdrop-blur-[0.5px]', // Reduced overlay opacity
            iconColor: 'text-blue-500/90',
            linkHover: 'hover:text-indigo-700',
            imageOpacity: 'opacity-90' // Increased image opacity
        },
        teacher: { 
            bg: 'from-purple-50/95 to-fuchsia-50/95 via-purple-100/80',
            button: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700',
            text: 'text-purple-700',
            accent: 'text-fuchsia-600',
            label: 'Teacher',
            border: 'border-purple-200/80',
            ring: 'ring-purple-300/50',
            shadow: 'shadow-xl shadow-purple-200/30',
            bgDark: 'bg-gradient-to-r from-purple-600 to-fuchsia-700',
            dot: 'bg-purple-500',
            image: Teacher_image,
            bgImage: 'bg-gradient-to-br from-purple-50/90 to-fuchsia-50/90',
            selectBg: 'bg-purple-50/80',
            selectHover: 'hover:bg-purple-100/80',
            selectActive: 'bg-purple-200/80',
            buttonText: 'text-white',
            inputBg: 'bg-white/95',
            errorBg: 'bg-red-50/95',
            imageOverlay: 'bg-white/20 backdrop-blur-[0.5px]', // Reduced overlay opacity
            iconColor: 'text-purple-500/90',
            linkHover: 'hover:text-fuchsia-700',
            imageOpacity: 'opacity-90' // Increased image opacity
        },
        student: { 
            bg: 'from-emerald-50/95 to-cyan-50/95 via-emerald-100/80',
            button: 'bg-gradient-to-br from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700',
            text: 'text-emerald-700',
            accent: 'text-cyan-600',
            label: 'Student',
            border: 'border-emerald-200/80',
            ring: 'ring-emerald-300/50',
            shadow: 'shadow-xl shadow-emerald-200/30',
            bgDark: 'bg-gradient-to-r from-emerald-600 to-cyan-700',
            dot: 'bg-emerald-500',
            image: Student_image,
            bgImage: 'bg-gradient-to-br from-emerald-50/90 to-cyan-50/90',
            selectBg: 'bg-emerald-50/80',
            selectHover: 'hover:bg-emerald-100/80',
            selectActive: 'bg-emerald-200/80',
            buttonText: 'text-white',
            inputBg: 'bg-white/95',
            errorBg: 'bg-red-50/95',
            imageOverlay: 'bg-white/20 backdrop-blur-[0.5px]', // Reduced overlay opacity
            iconColor: 'text-emerald-500/90',
            linkHover: 'hover:text-cyan-700',
            imageOpacity: 'opacity-90' // Increased image opacity
        }
    };

    const currentConfig = userTypeConfig[credentials.userType];
    return (
        
        <div className={`min-h-screen bg-gradient-to-br ${currentConfig.bg} flex items-center justify-center p-4 transition-all duration-700 ease-in-out`}>
            <div className={`w-full max-w-5xl flex rounded-[1.75rem] overflow-hidden ${currentConfig.shadow} transform transition-all duration-500 ${isAnimating ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
               
                {/* Image Section */}
                <div className={`hidden md:flex flex-1 ${currentConfig.bgImage} items-center justify-center p-8 transition-all duration-700 relative overflow-hidden`}>
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src={currentConfig.image} 
                            alt={`${credentials.userType} login`}
                            className={`w-full h-full object-cover object-center ${currentConfig.imageOpacity}`} // Increased opacity here
                            style={{ mixBlendMode: 'normal' }} // Changed to normal blend mode
                        />
                        <div className={`absolute inset-0 ${currentConfig.imageOverlay}`}></div>
                    </div>
                    <div className={`relative z-10 text-center ${currentConfig.text} font-bold text-3xl mt-auto mb-8 tracking-tight drop-shadow-md`}>
                        Welcome to <br /> {currentConfig.label} Portal
                    </div>
                </div>
                
                {/* Form Section */}
                <div className={`w-full md:w-[48%] ${currentConfig.inputBg} backdrop-blur-sm border ${currentConfig.border} relative`}>
                    {/* Header accent */}
                    <div className={`h-2.5 w-full ${currentConfig.bgDark}`}></div>
                    
                    <div className="p-8 md:p-10">
                        {/* Logo/Icon - Mobile Only */}
                        <div className="md:hidden text-center mb-8">
                            <div className={`mx-auto w-24 h-24 mb-4 rounded-full bg-white ${currentConfig.shadow} flex items-center justify-center border-2 ${currentConfig.border} transition-all duration-500 hover:rotate-12 hover:scale-110`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${currentConfig.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className={`text-xl ${currentConfig.accent} font-semibold tracking-wide`}>
                                {currentConfig.label} Portal
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User Type Selector */}
                            <div className="mb-6">
                                <label htmlFor="userType" className="block text-sm font-medium text-gray-600 mb-3 ml-1.5">
                                    Select Your Role
                                </label>
                                
                                <div className="relative">
                                    <select
                                        id="userType"
                                        value={credentials.userType}
                                        onChange={handleUserTypeChange}
                                        className={`
                                            w-full p-4 pl-12 pr-10 rounded-xl
                                            border-2 ${currentConfig.border} 
                                            focus:ring-2 ${currentConfig.ring} focus:border-transparent
                                            ${currentConfig.selectBg} backdrop-blur-sm
                                            text-gray-700 font-medium
                                            cursor-pointer transition-all duration-300
                                            shadow-sm hover:shadow-md
                                            ${loading ? 'opacity-80 cursor-not-allowed' : ''}
                                            appearance-none
                                        `}
                                        disabled={loading}
                                    >
                                        <option value="admin" className={`${currentConfig.selectBg} ${currentConfig.selectHover} ${currentConfig.selectActive} flex items-center gap-2 p-3 my-1 rounded-lg`}>
                                            <span className={`w-2.5 h-2.5 rounded-full ${userTypeConfig.admin.dot}`}></span>
                                            Administrator
                                        </option>
                                        <option value="teacher" className={`${currentConfig.selectBg} ${currentConfig.selectHover} ${currentConfig.selectActive} flex items-center gap-2 p-3 my-1 rounded-lg`}>
                                            <span className={`w-2.5 h-2.5 rounded-full ${userTypeConfig.teacher.dot}`}></span>
                                            Teacher
                                        </option>
                                        <option value="student" className={`${currentConfig.selectBg} ${currentConfig.selectHover} ${currentConfig.selectActive} flex items-center gap-2 p-3 my-1 rounded-lg`}>
                                            <span className={`w-2.5 h-2.5 rounded-full ${userTypeConfig.student.dot}`}></span>
                                            Student
                                        </option>
                                    </select>

                                    {/* Left icon */}
                                    <div className={`absolute left-4 top-4 ${currentConfig.iconColor}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>

                                    {/* Dropdown arrow */}
                                    <div className={`absolute right-4 top-4 ${currentConfig.iconColor} transition-transform duration-200`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Username Field */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2 ml-1.5">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                        onFocus={() => setFocusField('username')}
                                        onBlur={() => setFocusField(null)}
                                        className={`
                                            w-full p-4 pl-12 border-2 ${currentConfig.border} 
                                            ${focusField === 'username' ? `border-transparent ring-2 ${currentConfig.ring}` : 'border-gray-200'} 
                                            rounded-xl transition-all duration-300 hover:shadow-md
                                            ${currentConfig.inputBg} backdrop-blur-sm
                                            placeholder-gray-400
                                            focus:outline-none
                                        `}
                                        disabled={loading}
                                        required
                                        autoComplete="username"
                                    />
                                    <div className={`absolute left-4 top-4 ${focusField === 'username' ? currentConfig.iconColor : 'text-gray-400/90'} transition-colors duration-300`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Password Field */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2 ml-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                        onFocus={() => setFocusField('password')}
                                        onBlur={() => setFocusField(null)}
                                        className={`
                                            w-full p-4 pl-12 pr-12 border-2 ${currentConfig.border}
                                            ${focusField === 'password' ? `border-transparent ring-2 ${currentConfig.ring}` : 'border-gray-200'}
                                            rounded-xl transition-all duration-300 hover:shadow-md
                                            ${currentConfig.inputBg} backdrop-blur-sm
                                            placeholder-gray-400
                                            focus:outline-none
                                        `}
                                        disabled={loading}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <div className={`absolute left-4 top-4 ${focusField === 'password' ? currentConfig.iconColor : 'text-gray-400/90'} transition-colors duration-300`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        className={`absolute right-4 top-4 ${showPassword ? currentConfig.iconColor : 'text-gray-400/90'} hover:${currentConfig.iconColor.split('/')[0]} transition-colors duration-200`}
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Error Message */}
                            {error && (
                                <div className={`p-4 ${currentConfig.errorBg} text-red-700 rounded-xl text-sm border-2 border-red-200/80 flex items-start backdrop-blur-sm animate-fade-in`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    w-full py-4 px-6 rounded-xl ${currentConfig.buttonText} font-semibold 
                                    ${currentConfig.button} transition-all duration-500 
                                    ${loading ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-xl'} 
                                    shadow-lg transform hover:-translate-y-1 active:translate-y-0
                                    flex items-center justify-center
                                    focus:outline-none focus:ring-2 ${currentConfig.ring}
                                `}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Authenticating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Login
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;