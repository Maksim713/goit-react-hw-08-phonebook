import { configureStore } from '@reduxjs/toolkit';
import { phonebookSlice } from './phonebook.slice';
import contactsSlice from './contacts.service';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    phonebook: phonebookSlice.reducer,
  },
});
