import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        id: '',
        fullName: '',
        phoneNumber: '',
        avatarImg: '',
        sex: null,
        birthday: '',
        type: null,
    },
    reducers: {
        storeUser: (state, action) => {
            console.log('[userSlice] action: ', action)
            state.id = action.payload.id;
            state.type = action.payload.type;
        },

    }
});

const { actions, reducer } = user;
export const { storeUser } = actions;
export default reducer;
