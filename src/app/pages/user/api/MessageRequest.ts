import axios from 'axios'
import { environment } from '../../../../config';

const API = axios.create({ baseURL: environment.apiBaseUrl });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);