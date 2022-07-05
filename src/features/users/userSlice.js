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
            state.id = action.payload.id;
            state.fullName = action.payload.fullName;
            state.phoneNumber = action.payload.phoneNumber;
            state.avatarImg = action.payload.avatarImg;
            state.sex = action.payload.sex;
            state.birthday = action.payload.birthday;
            state.type = action.payload.type;
        },

    }
});

const { actions, reducer } = user;
export const { storeUser } = actions;
export default reducer;
