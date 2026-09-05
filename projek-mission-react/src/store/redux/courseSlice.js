import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
    },
    reducers: {
        setCourses: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;