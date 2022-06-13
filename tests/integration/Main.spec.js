import React from 'react';
import { act, render, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter';

import { emit } from '../../mocks/socket.io-client';
import api from '~/services/api';
import factory from '../utils/factory';
import Main from '~/pages/Main';
import { UserContext } from '~/contexts/User';
import wait from '../utils/wait';

describe('Main page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to logout', async () => {
    const developers = await factory.attrsMany('Developer', 3);
    const setUser = jest.fn();
    const id = faker.datatype.number();
    const token = faker.datatype.uuid();

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('developers').reply(200, developers);

    const { getByTestId } = render(
      <UserContext.Provider value={{ user: { id }, setUser }}>
        <Main />
      </UserContext.Provider>
    );

    await act(async () => fireEvent.press(getByTestId('logout')));

    expect(setUser).toHaveBeenCalledWith({});
  });

  it('should be able to like a developer', async () => {
    const id = faker.datatype.number();
    const token = faker.datatype.uuid();
    const [developer, ...rest] = await factory.attrsMany('Developer', 3);

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock
      .onGet('developers')
      .reply(200, [developer, ...rest])
      .onPost(`developers/${developer._id}/like`)
      .reply(200);

    const { getByTestId, queryByTestId } = render(
      <UserContext.Provider value={{ user: { id }, setUser: jest.fn() }}>
        <Main />
      </UserContext.Provider>
    );

    await wait(async () =>
      expect(getByTestId(`developer_${developer._id}`)).toBeTruthy()
    );

    await act(async () => fireEvent.press(getByTestId('like')));

    expect(queryByTestId(`developer_${developer._id}`)).toBeFalsy();
  });

  it('should be able to dislike a developer', async () => {
    const id = faker.datatype.number();
    const token = faker.datatype.uuid();
    const [developer, ...rest] = await factory.attrsMany('Developer', 3);

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock
      .onGet('developers')
      .reply(200, [developer, ...rest])
      .onPost(`developers/${developer._id}/dislike`)
      .reply(200);

    const { getByTestId, queryByTestId } = render(
      <UserContext.Provider value={{ user: { id }, setUser: jest.fn() }}>
        <Main />
      </UserContext.Provider>
    );

    await wait(async () =>
      expect(getByTestId(`developer_${developer._id}`)).toBeTruthy()
    );

    await act(async () => fireEvent.press(getByTestId('dislike')));
    expect(queryByTestId(`developer_${developer._id}`)).toBeFalsy();
  });

  it('should be able to have a match', async () => {
    const id = faker.datatype.number();
    const token = faker.datatype.uuid();
    const matchDeveloper = await factory.attrs('Developer');

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('developers').reply(200, []);

    const { getByTestId } = render(
      <UserContext.Provider value={{ user: { id }, setUser: jest.fn() }}>
        <Main />
      </UserContext.Provider>
    );

    await act(async () => emit(matchDeveloper));

    expect(getByTestId('match')).toBeTruthy();
  });
});
