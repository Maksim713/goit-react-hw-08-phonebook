import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/variables';
import authSelectors from './auth.selectors';

axios.defaults.baseURL = BASE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credential, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credential);

      if (!data || !data.token) {
        return thunkAPI.rejectWithValue('Invalid response data');
      }

      console.log('Response from signup:', data);
      token.set(data.token);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

const logIn = createAsyncThunk('auth/login', async credential => {
  try {
    const { data } = await axios.post('/users/login', credential);
    token.set(data.token);
    // console.log('Response from login:', data);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const prevToken = authSelectors.getToken(thunkAPI.getState());
    if (!prevToken) return thunkAPI.rejectWithValue(`No token`);
    token.set(prevToken);
    try {
      const { data } = await axios.get('/users/current');
      console.log('Response from fetchCurrentUser:', data);
      return data;
    } catch (e) {
      console.error('Error in fetchCurrentUser:', e);
    }
  }
);

const logOut = createAsyncThunk('auth/logout', async credential => {
  try {
    await axios.post('/users/logout', credential);
    token.unset();
  } catch (e) {
    console.error(e);
  }
});

const authOperations = {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
};

export default authOperations;
