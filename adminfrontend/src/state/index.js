import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  admin: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const { toggleMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
