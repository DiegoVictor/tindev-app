import React from 'react';
import { act, render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter';

import { api } from '../../src/services/api';
import factory from '../utils/factory';
import { Main } from '../../src/pages/Main';
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

describe('Main page', () => {
  it('should be able to logout', async () => {
    const developers = await factory.attrsMany<IDeveloper>('Developer', 3);
    const setUser = jest.fn();
    const id = faker.number.int().toString();
    const token = faker.string.uuid();

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('developers').reply(200, developers);

    const { getByTestId } = render(
      <UserContext.Provider value={{ id, setUser }}>
        <Main />
      </UserContext.Provider>
    );

    await act(async () => fireEvent.press(getByTestId('logout')));

    expect(setUser).toHaveBeenCalledWith({});
  });

  it('should be able to like a developer', async () => {
    const id = faker.number.int().toString();
    const token = faker.string.uuid();
    const [developer, ...rest] = await factory.attrsMany<IDeveloper>(
      'Developer',
      3
    );

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock
      .onGet('developers')
      .reply(200, [developer, ...rest])
      .onPost(`developers/${developer._id}/like`)
      .reply(200);

    const { getByTestId, queryByTestId } = render(
      <UserContext.Provider value={{ id, setUser: jest.fn() }}>
        <Main />
      </UserContext.Provider>
    );

    await waitFor(async () => getByTestId(`developer_${developer._id}`));

    await act(async () => fireEvent.press(getByTestId('like')));

    expect(queryByTestId(`developer_${developer._id}`)).toBeFalsy();
  });

  it('should be able to dislike a developer', async () => {
    const id = faker.number.int().toString();
    const token = faker.string.uuid();
    const [developer, ...rest] = await factory.attrsMany<IDeveloper>(
      'Developer',
      3
    );

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock
      .onGet('developers')
      .reply(200, [developer, ...rest])
      .onPost(`developers/${developer._id}/dislike`)
      .reply(200);

    const { getByTestId, queryByTestId } = render(
      <UserContext.Provider value={{ id, setUser: jest.fn() }}>
        <Main />
      </UserContext.Provider>
    );

    await waitFor(async () => getByTestId(`developer_${developer._id}`));

    await act(async () => fireEvent.press(getByTestId('dislike')));
    expect(queryByTestId(`developer_${developer._id}`)).toBeFalsy();
  });

  it('should be able to have a match', async () => {
    const id = faker.number.int().toString();
    const token = faker.string.uuid();
    const matchDeveloper = await factory.attrs<IDeveloper>('Developer');

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('developers').reply(200, []);

    const { getByTestId } = render(
      <UserContext.Provider value={{ id, setUser: jest.fn() }}>
        <Main />
      </UserContext.Provider>
    );

    await waitFor(async () => expect(mockSubscribe).toHaveBeenCalled());

    await act(async () => {
      callbacks['match'](matchDeveloper);
    });

    await waitFor(() => getByTestId('match'));

    expect(getByTestId('match')).toBeTruthy();
  });
});
