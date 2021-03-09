import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';
import Login from '~/pages/Login';
import { UserContext } from '~/contexts/User';

describe('Login page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to login', async () => {
    const setUser = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <UserContext.Provider
        value={{
          setUser,
        }}
      >
        <Login />
      </UserContext.Provider>
    );

    const id = faker.random.number();
    const token = faker.random.uuid();

    apiMock.onPost('developers').reply(200, { developer: { _id: id }, token });

    fireEvent.changeText(
      getByPlaceholderText('Digite seu usuáro no Github'),
      faker.internet.userName()
    );

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    expect(await AsyncStorage.getItem('tindev_user')).toBe(
      JSON.stringify({ id, token })
    );
    expect(setUser).toHaveBeenCalledWith({ id, token });
  });
});
