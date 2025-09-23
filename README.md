```

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react"
import { replace, useNavigate } from "react-router-dom"
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json'


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [authState , setAuthState] = useState({
        user : null,
        userType : null,
        loading : true,
        error : null,
        isRefreshingToken : null
    })

    const navigate = useNavigate()

    const logAuthState = (message) => {
        console.log( `[AuthState] ${message}`, {
            user : !!authState.user,
            userType: authState.userType,
            loading : authState.loading,
            error : authState.error
        })
    }

    const clearAuthData = useCallback(()=>{
        console.log(`[Auth] Clearing auth Data`);
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('userType')
        localStorage.removeItem('userId');
        delete axios.defaults.headers.common['Authorization'];
        setAuthState({
            user : null,
            userType : null,
            loading : false,
            error : null,
            isRefreshToken:false
        })
    },[])

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};


    const verifyToken = async (userType) => {
    try {
        console.log(`[Auth] verifying ${userType} token`);
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
        const response = await axios.get(`/edufusion/api/v2/${userType}/current-user`)
        return response.data?.data
    } catch (error) {
        console.error(`[Auth] Token verification failed: ${error.response?.data || error.message}`)
        throw error            
    }
}

    const fetchUserData = useCallback(async (userType)=>{
        try {
            console.log(`[Auth] Fetching ${userType} user data`);
            const response = await axios.get( `/edufusion/api/v2/${userType}/current-user`)
            
            const userData = response.data?.data;
            if(!userData) throw new Error("invalid User data")

            setAuthState(prev => ({
                ...prev,
                user :userData,
                userType :userType,
                loading : false,
                error : null
            }))
            return userData
        } catch (error) {
            console.log(`[Auth] Faild to Fetch
            user data : ${error.response?.data} || ${error.message}` );
            throw error
        }
    },[])

    const refreshAccessToken = useCallback(async()=>{
        const refreshToken = getCookie('refreshToken');
        const userType = localStorage.getItem('userType');

        if(!refreshToken || !userType) {
            throw new Error(`No refresh token available`);
        }

        try {
            console.log(`[Auth] Refreshing Access token`);

            setAuthState(prev => ({
                ...prev,
                isRefreshToken : true}))

            const response = await axios.get(
                   `/edufusion/api/v2/${userType}/refresh-token`
            )

            // Token are set as HTTP-only cookies by the server
            return true
        } catch (error) {
            console.error("[Auth] Token refresh failed :" , error.response?.data || error.message)
            clearAuthData()
            throw error
        } finally{
            setAuthState(prev => ({...prev, isRefreshToken: false}))
        }
    },[clearAuthData])


    useEffect(()=>{
        const initializeAuth = async() => {
            const userType = localStorage.getItem('userType')
            const userId = localStorage.getItem('userId')

            console.log(`[Auth] intializing auth state ${userType, userId}`);

            if(!userType || !userId) {
                console.log(`[Auth] No auth data found`);
                setAuthState(prev => ({...prev, loading: false}))
                return;
            }

            try {
                await verifyToken(userType)
                await fetchUserData(userType)
                logAuthState('intial auth sucessful')
            } catch (error) {
                console.error(`[Auth] initial auth faild ${error}`);

                if(error.response?.status === 401) {
                   try {
                     await refreshAccessToken()
                     await fetchUserData(userType)
                     logAuthState(`Token refresh successfully`)
                   } catch (refreshError) {
                        console.error(`[Auth] Token refresh Faild : ${refreshError}`);
                        clearAuthData()
                   }
                }
                else {
                    clearAuthData()
                }
            }
        }

        initializeAuth()
    },[refreshAccessToken, fetchUserData, clearAuthData])


    const login = async (credentials, userType = "admin") => {
        try {
            console.log(`[Auth] login intialed, {
                ${userType}}`)
                setAuthState(prev => ({...prev,loading: true, error: null}))

                if(!credentials.username || !credentials.password) {
                    throw new Error(`Username and password are required`)
                }

                const response = await axios.post(
                     `/edufusion/api/v2/users/${userType}/login`,
                credentials
                )

                console.log(`[Auth] Login response ${response.data}`)

                const {data : userData} = response.data
                const userId = userData?._id

                if(!userId) {
                    throw new Error("invalid login response")
                }

                // store user info in localStorage (tokens are in HTTP-only cookies)
                localStorage.setItem('userType', userType);
                localStorage.setItem('userId', userId)

                //update state
                setAuthState({
                    user : userData,
                    userType : userType,
                    loading : false,
                    error : null,
                    isRefreshToken : false
                });
                

                //Redirect 
                console.log(`[Auth] Redirect to /${userType}/dashboard`)
                navigate(`/${userType}/dashboard`, {replace: true})

                return {success: true, user : userData}
        } catch (error) {
            console.log(`[Auth] Login error: ${error}`);
            
            let errorMessage = 'Login failed. Please check Your credentials'
            if(error.response) {
                if(errorMessage) {
                    errorMessage = "Invalid username or password";
                } else if (error.response?.data?.message){
                    errorMessage = error.response.data.message
                }
            }

            setAuthState(prev => ({
                ...prev, 
                error : errorMessage, 
                loading :false
            }))

            return { success : false, message : errorMessage}
            
        }
    }

    const logout = useCallback(async() =>{
        try {
            console.log(`[Auth] Loggin out`);
            const userType = localStorage.getItem('userType')

                if(userType) {
                    await axios.post(
                          `/edufusion/api/v2/${userType}/logout`
                    )
                }
        } catch (error) {
            console.error(`[Auth] Logout failed, ${error}`)
        }finally{
            clearAuthData()
            navigate('/login',{replace : true})
        }
    },[ clearAuthData, navigate])

    useEffect(()=>{
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                
                if(error.response?.status === 401 || originalRequest._retry)  {
                    return Promise.reject(error)
                }

                const refreshToken = getCookie('refreshToken');
                const userType = localStorage.getItem('userType')

                if(!refreshToken || !userType || originalRequest.url.includes('refresh-token') || originalRequest.url.includes('login')) {
                    return Promise.reject(error)
                }

                console.log(`[Auth] Attempting token refresh for 401 error`);
                originalRequest._retry = true

                try {
                    await refreshAccessToken();
                    return axios(originalRequest)
                } catch (refreshError) {
                    await logout()
                    return Promise.reject(refreshError)
                }
            }
        
        )
        return () => axios.interceptors.response.eject(interceptor);
    },[logout, refreshAccessToken])

    const value = useMemo(()=>({
        ...authState,
        login,
        logout,
        isAuthenticated : !!authState.user && !!localStorage.getItem('userType'),
        isAdmin : authState.userType === "admin",
        isTeacher : authState.userType === "teacher",
        isStudent : authState.userType === "student",
        clearError: (()=>setAuthState(prev => ({...prev,error : null})))
    }),[authState, login, logout])

    return (
        <AuthContext.Provider value={value}>
                {!authState.loading && children}
        </AuthContext.Provider>
    )

}

```