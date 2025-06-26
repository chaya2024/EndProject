import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialUsername = localStorage.getItem("username");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: initialToken || "",
        isUserLoggedIn: !!initialToken,
        username: initialUsername || "",
        name: localStorage.getItem("name") || ""
    },
    reducers: {
        setToken: (state, action) => {
            const { token, username, name } = action.payload;
            state.token = token;
            state.username = username || "";
            state.name = name || username || "";
            state.isUserLoggedIn = true;
            
            localStorage.setItem("token", token);
            localStorage.setItem("username", username || "");
            localStorage.setItem("name", name || username || "");
        },
        removeToken: (state) => {
            state.token = "";
            state.username = "";
            state.name = "";
            state.isUserLoggedIn = false;
            
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("name");
        }
    }
})

export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions