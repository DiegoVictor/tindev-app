import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_API_URL,
});

export function setAuthorization(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
