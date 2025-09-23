import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/authSlice";

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:5000/edufusion/api/v2/"
axios.defaults.headers.common['Content-Type'] = 'application/json'


 const useAuth =  () => {
    const dispatch =  useDispatch()

     const [credentials, setCredentials] = useState({
        user : {},
        error : null,
        loading : false,
        isRefreshingToken: false,
    })  


    const getCookie = (name) => {
       const value = `;${document.cookie}`;
       const part = value.split(`${name}=`)
       if(part.length === 2) return part.pop().split(';').shift()
       return {value, part}
    }

    const verifyToken = async(userType) =>{
        try {
            console.log(`[Auth], ${userType} token`);
            const accessToken = getCookie('accessToken')
            if(accessToken) {
                axios.defaults.headers.common[`Authorization`] = `Bearer ${accessToken}`
            }
            const response = await axios.get(`users/${userType}/current-user`)
            return response.data?.data
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw error
        }
    }   


    const clearCredentials = useCallback(()=> {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem(`userType`)
        localStorage.removeItem(`userId`)
        setCredentials({
            user: null,
            loading: true,
            isRefreshingToken : false,
            error : null,
        })
    },[])
    
    
   

     const userLogin = useCallback(async (data, userType="admin") => {
        setCredentials((prev)=> ({...prev, loading : true , error : null}))
        const {part, value} = getCookie('accessToken')
        console.log(`value: ${value}`);
        console.log(`part: ${part}`);
        
        try {
          const res =  await  axios.post(`users/${userType}/login`, data)
            
                const {data : user, role} = res.data
                const newCred = {
                user : user,
                userType : role,
                error : null,
                loading : false
                 }
                setCredentials(newCred)
                dispatch(login(newCred))
          
        } catch (error) {
            console.log(error.message);
        }
     },[dispatch])

    const currentUser = useCallback( async(userType) => {
         setCredentials((prev)=> ({...prev, loading : true , error : null}))
        
        try {
           const res =  await  axios.get(`users/${userType}/current-user`)
            
                const userData = res.data
                const newCred = {
                user : userData,
                userType : userType,
                error : null,
                loading : false
                 }
                setCredentials(newCred)
                
                dispatch(login(newCred))
        } catch (error) {
            console.log(error.message);
        }
     },[dispatch])

     const refreshAccessToken = useCallback(async()=>{
            const refreshToken = getCookie('refreshToken')
            const userType = localStorage.setItem('userType')

            if(!refreshToken || !userType) {
                throw new Error(`No refresh Token available`)
            }

            try {
                const response = await axios.get(`users/${userType}/refreshToken`)
                return true
            } catch (error) {
                console.error(error.response?.data || error.message);
                clearCredentials()
                throw error
            }finally{
                setCredentials(prev => ({...prev, isRefreshingToken: false}))
            }
        },[clearCredentials])

     useEffect(()=>{
        const authIntialize = async() => {
        const userType = localStorage.getItem('userType')
        const userId = localStorage.getItem('userId')

        if(!userType || !userId) {
            setCredentials(prev => ({...prev,loading : false}))
            return;
        }

        try {
            await verifyToken(userType)
            await currentUser(userType)
        } catch (error) {
            console.log(error.message?.status || "error message" );

            if(error.message?.status === 404) {
               try {
                    await refreshAccessToken()
                    await currentUser(userType)
               } catch (error) {
                    console.log(error.message);
                    clearCredentials()
               }
            }
            else {
                clearCredentials()
            }
        }
    }
},[clearCredentials, currentUser, refreshAccessToken])

    return {
        currentUser,
        userLogin,
        credentials
    }
 }


 export default useAuth