import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://632091ed9f82827dcf2fd3a0.mockapi.io';

export const getAllContacts = createAsyncThunk(
  'contacts/getAllContacts',
  async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  }
);

export const addContactItem = createAsyncThunk(
  'contacts/addContactItem',
  async (item, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to add contact');
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactById = createAsyncThunk(
  'contacts/deleteContactById',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${contactId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContactItem.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        state.data = state.data.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export default contactsSlice;
