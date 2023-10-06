import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilterValue } = phonebookSlice.actions;

export const getFilter = state => state.phonebook.filter;
