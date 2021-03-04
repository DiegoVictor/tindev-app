import { createContext } from 'react';

const user = {};

export const UserContext = createContext({
  ...user,
  setUser: () => {},
});
