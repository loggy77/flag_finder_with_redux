import { createSlice } from '@reduxjs/toolkit';

const LocalStoragedark = localStorage.getItem("darkmode");

const initialState = {
    dark: LocalStoragedark,
};

export const settings = createSlice({
    name: 'settings',
    initialState,

    reducers: {
        switchDark: (state) => {
            localStorage.getItem(!state.dark);
            return { ...state, dark: !state.dark }
        },
    },
});

export const { switchDark } = settings.actions;

export const selectItems = (state) => state.settings.items;

export default settings.reducer;