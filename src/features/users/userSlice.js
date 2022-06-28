import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        fullName: '',
        phoneNumber: '',
        sex: '',
        birthday: '',
        type: null,
    },
    reducers: {
        addUser: (state, action) => {
            state.type = action.payload.type;
        },

    }
});

const { actions, reducer } = user;
export const { addUser } = actions;
export default reducer;
