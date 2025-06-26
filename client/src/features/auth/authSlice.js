import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: initialToken || "",
        // isUserLoggedIn: localStorage.getItem("token")? true: false,
        isUserLoggedIn: !!initialToken,
        userFullName: ""
    },
    reducers: {
        // setToken: (state, action) => {
        //     const token=action.payload.token
        //     state.token = token
        //     state.isUserLoggedIn= true
        //     localStorage.setItem("token", token)
        // },
        setToken: (state, action) => {
            const { token, username } = action.payload;
            state.token = token;
            state.username = username || "";
            state.isUserLoggedIn = true;
            localStorage.setItem("token", token);
        },

        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
        }
    }
})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions