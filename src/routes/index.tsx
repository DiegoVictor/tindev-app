import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUser, UserContext } from '../contexts/User';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';
import { Matches } from '../pages/Matches';
import { setAuthorization } from '../services/api';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerType: 'back',
      drawerActiveTintColor: '#FFF',
      drawerActiveBackgroundColor: '#df4723',
      drawerLabelStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    }}
  >
    <Drawer.Screen name="Developers" component={Main} />
    <Drawer.Screen name="Matches" component={Matches} />
  </Drawer.Navigator>
);

export const Routes = () => {
  const [user, setUser] = useState<IUser>({});

  useEffect(() => {
    AsyncStorage.getItem('tindev_user').then((data) => {
      if (typeof data === 'string') {
        const { id, token } = JSON.parse(data);
        if (id && token) {
          setAuthorization(token);
          setUser({ id, token });
        }
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider
        value={{
          ...user,
          setUser: (data: IUser) => {
            setUser(data);
            if (data.token) {
              setAuthorization(data.token);
            }
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user.token ? (
            <Stack.Screen name="App" component={App} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};
