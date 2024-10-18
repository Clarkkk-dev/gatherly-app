import axios from 'axios';

const API = axios.create({ baseURL: 'https://gatherly-app.onrender.com/api/auth' });

export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/login', data);
