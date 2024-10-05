import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"; // Import your theme slice

export const store = configureStore({
    reducer: {
        theme: themeReducer, // Add theme reducer to store
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
