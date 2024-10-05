// src/store/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    dark: boolean;
}

const initialState: ThemeState = {
    dark: false, // Default to light theme
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.dark = !state.dark;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
