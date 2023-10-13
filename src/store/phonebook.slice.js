import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: {
    filter: '',
  },
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setFilterValue: (state, action) => {
      state.contacts.filter = action.payload;
    },
  },
});

export const { addContact, removeContactById, setFilterValue } =
  phonebookSlice.actions;

export const phonebookReducer = phonebookSlice.reducer;

export const getFilter = state => state.phonebook.contacts.filter;
