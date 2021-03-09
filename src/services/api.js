import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL,
});

export function setAuthorization(value) {
  api.defaults.headers.common.Authorization = `Bearer ${value}`;
}

export default api;
