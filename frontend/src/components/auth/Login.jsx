import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaLock, FaChalkboardTeacher, FaUserGraduate, 
  FaUserShield, FaSignInAlt, FaEye, FaEyeSlash, FaExclamationCircle,
  FaSpinner
} from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { debounce } from 'lodash';

// Rive configuration
const RIVE_SRC = '/teddy_login.riv';
const STATE_MACHINE = 'Login Machine';

function Login() {
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    userType: "admin"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // --- Rive Hooks ---
  const { RiveComponent, rive } = useRive({
    src: RIVE_SRC,
    stateMachines: STATE_MACHINE,
    autoplay: true,
    // Remove layout property or use simple object format
  });
  
  const isHandsUp = useStateMachineInput(rive, STATE_MACHINE, 'isHandsUp');
  const isChecking = useStateMachineInput(rive, STATE_MACHINE, 'isChecking');
  const trigSuccess = useStateMachineInput(rive, STATE_MACHINE, 'trigSuccess');
  const trigFail = useStateMachineInput(rive, STATE_MACHINE, 'trigFail');
  const numLook = useStateMachineInput(rive, STATE_MACHINE, 'numLook');

  // --- Navigation on authentication ---
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${credentials.userType}/dashboard`);
    }
  }, [isAuthenticated, credentials.userType, navigate]);

  // --- Input validation ---
  const validateField = useCallback((name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Username is required';
        } else if (value.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        } else {
          delete newErrors.username;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [errors]);

  // --- Handle input changes with validation ---
  const handleInputChange = useCallback((field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      validateField(field, value);
    }
  }, [touched, validateField]);

  // --- Debounced username change for Rive animation ---
  const debouncedUsernameChange = useCallback(
    debounce((value) => {
      if (numLook) {
        numLook.value = Math.min(Math.round((value.length / 20) * 100), 100);
      }
    }, 150),
    [numLook]
  );

  const handleUsernameChange = useCallback((e) => {
    const value = e.target.value;
    handleInputChange('username', value);
    debouncedUsernameChange(value);
  }, [handleInputChange, debouncedUsernameChange]);

  // --- Handle input focus/blur for animations and validation ---
  const handleInputFocus = useCallback((field) => {
    if (field === 'password' && isHandsUp) isHandsUp.value = true;
    if (field === 'username' && isChecking) isChecking.value = true;
  }, [isHandsUp, isChecking]);

  const handleInputBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, credentials[field]);
    
    if (field === 'password' && isHandsUp) isHandsUp.value = false;
    if (field === 'username' && isChecking) isChecking.value = false;
  }, [credentials, validateField, isHandsUp, isChecking]);

  // --- Form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = { username: true, password: true, userType: true };
    setTouched(allTouched);
    
    // Validate all fields
    const isUsernameValid = validateField('username', credentials.username);
    const isPasswordValid = validateField('password', credentials.password);
    
    if (!isUsernameValid || !isPasswordValid) {
      if (trigFail) trigFail.fire();
      return;
    }
    
    setIsSubmitting(true);
    try {
      await userLogin(credentials, credentials.userType);
      if (trigSuccess) trigSuccess.fire();
    } catch (error) {
      if (trigFail) trigFail.fire();
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Login failed. Please check your credentials.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- User type options with icons ---
  const userTypes = useMemo(() => [
    { value: "admin", label: "Administrator", icon: <FaUserShield className="inline mr-2" /> },
    { value: "teacher", label: "Teacher", icon: <FaChalkboardTeacher className="inline mr-2" /> },
    { value: "student", label: "Student", icon: <FaUserGraduate className="inline mr-2" /> }
  ], []);

  // --- Toggle password visibility ---
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // --- Check if form is valid ---
  const isFormValid = useMemo(() => {
    return credentials.username.trim().length >= 3 && 
           credentials.password.length >= 6 && 
           Object.keys(errors).length === 0;
  }, [credentials, errors]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-3xl p-8 text-white max-w-md w-full">
        {/* Header with Rive Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mx-auto mb-4 shadow-lg bg-blue-500/20 overflow-hidden">
            {/* Rive component with proper container styling */}
            <RiveComponent 
              className="w-full h-full" 
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-blue-200 opacity-90">Sign in to access your dashboard</p>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center">
            <FaExclamationCircle className="mr-2 flex-shrink-0" />
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selector */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300">
              <HiSelector className="h-5 w-5" />
            </div>
            <select
              className="w-full bg-blue-800/40 text-white rounded-xl py-3 px-4 pl-10 outline-none border-2 border-blue-600/40 shadow-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition-all duration-300 appearance-none cursor-pointer"
              value={credentials.userType}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              onFocus={() => handleInputFocus('userType')}
              onBlur={() => handleInputBlur('userType')}
            >
              {userTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300">
              <FaUser className="h-5 w-5" />
            </div>
            <input
              type="text"
              id="username"
              className={`w-full bg-blue-800/40 border-2 px-4 py-3 pl-10 rounded-xl text-white placeholder-blue-300 outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-300 ${
                errors.username && touched.username 
                  ? 'border-red-500/60 focus:border-red-500' 
                  : 'border-blue-600/40 focus:border-cyan-400'
              }`}
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleUsernameChange}
              onFocus={() => handleInputFocus('username')}
              onBlur={() => handleInputBlur('username')}
              required
            />
            {errors.username && touched.username && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">
                <FaExclamationCircle className="h-5 w-5" />
              </div>
            )}
          </div>
          {errors.username && touched.username && (
            <p className="text-red-300 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1 h-3 w-3" />
              {errors.username}
            </p>
          )}

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300">
              <FaLock className="h-5 w-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full bg-blue-800/40 border-2 px-4 py-3 pl-10 pr-10 rounded-xl text-white placeholder-blue-300 outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-300 ${
                errors.password && touched.password 
                  ? 'border-red-500/60 focus:border-red-500' 
                  : 'border-blue-600/40 focus:border-cyan-400'
              }`}
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onFocus={() => handleInputFocus('password')}
              onBlur={() => handleInputBlur('password')}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-300 hover:text-cyan-400 transition-colors duration-200"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-300 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1 h-3 w-3" />
              {errors.password}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-500 disabled:to-gray-600 text-white px-12 py-3 rounded-xl shadow-xl hover:shadow-2xl disabled:shadow-none transform hover:-translate-y-1 disabled:transform-none transition-all duration-300 font-bold mt-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2 h-4 w-4" />
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

        {/* Demo Credentials Hint */}
        <div className="mt-6 p-4 bg-blue-800/20 rounded-xl border border-blue-600/30">
          <p className="text-blue-200 text-sm text-center">
            <strong>Demo:</strong> Username: demo | Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;