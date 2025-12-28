import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, act, render, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter';

import { api } from '../../src/services/api';
import factory from '../utils/factory';
import { Matches } from '../../src/pages/Matches';
import { UserContext } from '../../src/contexts/User';
import { IDeveloper } from '../../src/components/Match';

const apiMock = new MockAdapter(api);

const mockDisconnect = jest.fn();
const mockConnect = jest.fn();

const callbacks: Record<string, (developer: IDeveloper) => void> = {};
const mockSubscribe = jest.fn().mockImplementation((channel, callback) => {
  callbacks[channel] = callback;
});
jest.mock('../../src/services/socket', () => {
  return {
    disconnect: () => mockDisconnect(),
    connect: (data: Record<string, string>) => mockConnect(data),
    subscribe: (channel: string, callback: (developer: IDeveloper) => void) =>
      mockSubscribe(channel, callback),
  };
});

describe('Matches page', () => {
  it('should be able to logout', async () => {
    const developers = await factory.attrsMany<IDeveloper>('Developer', 3);
    const setUser = jest.fn();
    const id = faker.number.int().toString();
    const token = faker.string.uuid();

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('matches').reply(200, developers);

    const { getByTestId } = render(
      <UserContext.Provider value={{ id, setUser }}>
        <Matches />
      </UserContext.Provider>
    );

    await act(async () => fireEvent.press(getByTestId('logout')));

    expect(setUser).toHaveBeenCalledWith({});
  });

  it('should be able to have a match', async () => {
    const matchDeveloper = await factory.attrs<IDeveloper>('Developer');
    const id = faker.number.int().toString();
    const token = faker.string.uuid();

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('developers').reply(200, []);

    const { getByTestId } = render(<Matches />);

    await waitFor(async () => expect(mockSubscribe).toHaveBeenCalled());

    await act(async () => {
      callbacks['match'](matchDeveloper);
    });

    await waitFor(() => getByTestId('match'));

    expect(getByTestId('match')).toBeTruthy();
  });
});
