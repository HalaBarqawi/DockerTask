import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63920f0df3456e5d1ce84d72",
  email:"asala@gmail.com",
  adminEmail:"asala@gmail.com",
  user:null,
  token:null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCredentials:(state,action)=>{
    const{user,accessToken}=action.payload
    state.user = user
    state.token = accessToken
  },}
});

export const { setMode,setCredentials } = globalSlice.actions;

export default globalSlice.reducer;

export const selectCurrentUser = (state) => state.global.user
export const selectCurrentToken = (state) => state.global.token
