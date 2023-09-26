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

const register = createAsyncThunk('auth/register', async credential => {
  try {
    const { data } = await axios.post('/users/signup', credential);
    token.set(data.token);
    return data;
  } catch (e) {
    console.log(e);
  }
});

const logIn = createAsyncThunk('auth/login', async credential => {
  try {
    const { data } = await axios.post('/users/login', credential);
    token.set(data.token);
    return data;
  } catch (e) {
    console.log(e);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const prevToken = authSelectors.getToken(thunkAPI.getState());
    if (prevToken === null) return thunkAPI.rejectWithValue(`No token`);
    token.set(prevToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

const logOut = createAsyncThunk('auth/logout', async credential => {
  try {
    await axios.post('/users/logout', credential);
    token.unset();
  } catch (e) {
    console.log(e);
  }
});

const authOperations = {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
};

export default authOperations;
