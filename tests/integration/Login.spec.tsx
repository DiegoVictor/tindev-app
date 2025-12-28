import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter';

import { api } from '../../src/services/api';
import { Login } from '../../src/pages/Login';
import { UserContext } from '../../src/contexts/User';

const apiMock = new MockAdapter(api);

describe('Login page', () => {
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

    const id = faker.number.int();
    const token = faker.string.uuid();

    apiMock.onPost('developers').reply(200, { developer: { _id: id }, token });

    fireEvent.changeText(
      getByPlaceholderText('Digite seu usuáro no Github'),
      faker.internet.username()
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
