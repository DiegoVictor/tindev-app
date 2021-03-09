import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { fireEvent, act, render } from '@testing-library/react-native';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';

import { emit } from '../../mocks/socket.io-client';
import api from '~/services/api';
import factory from '../utils/factory';
import Matches from '~/pages/Matches';
import { UserContext } from '~/contexts/User';

describe('Matches page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to logout', async () => {
    const developers = await factory.attrsMany('Developer', 3);
    const setUser = jest.fn();
    const id = faker.random.number();
    const token = faker.random.uuid();

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('matches').reply(200, developers);

    const { getByTestId } = render(
      <UserContext.Provider value={{ setUser }}>
        <Matches />
      </UserContext.Provider>
    );

    await act(async () => fireEvent.press(getByTestId('logout')));

    expect(setUser).toHaveBeenCalledWith({});
  });

  it('should be able to have a match', async () => {
    const matchDeveloper = await factory.attrs('Developer');
    const id = faker.random.number();
    const token = faker.random.uuid();

    AsyncStorage.setItem('tindev_user', JSON.stringify({ id, token }));
    apiMock.onGet('developers').reply(200, []);

    const { getByTestId } = render(<Matches />);

    await act(async () => emit(matchDeveloper));

    expect(getByTestId('match')).toBeTruthy();
  });
});
