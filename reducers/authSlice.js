import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, userId: null, userType: null, isLoggedIn: false },
  reducers: {
    setUserRedux: (state, action) => {
      state.user = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    isLoggedIn: (state) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUserRedux, logout, setUserId, setUserType, isLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;
