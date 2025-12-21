import { createContext } from 'react';

export interface IUser {
  id?: string;
  token?: string;
}

const user: IUser = {};

export const UserContext = createContext({
  ...user,
  setUser: (data: IUser) => {
    Object.assign(user, data);
  },
});
