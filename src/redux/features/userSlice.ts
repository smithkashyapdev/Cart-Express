import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model/user";

type AuthState = Partial<User> & { isAuthenticated: boolean };

const initialState: AuthState = {
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            return { ...action.payload, isAuthenticated: true };
        },
        logout: () => initialState, // Reset state on logout
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;