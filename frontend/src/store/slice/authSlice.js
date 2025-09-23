import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   user : null,
   userType : "",
   loading : false,
   isAuthenticated : false,
   error : null,
   token : null
}

const authSlice = createSlice({
  name : 'auth',
  initialState,
  reducers : ({
      login : (state, action) => {
        state.user = action.payload.user,
        state.userType = action.payload.user.role,
        state.isAuthenticated = true,
        state.loading = false,
        state.error = null
      },
      logout : (state) => {
        state.user = null,
        state.isAuthenticated = false,
        state.userType = "",
        state.error = null,
        state.loading = false
      }
  })
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer