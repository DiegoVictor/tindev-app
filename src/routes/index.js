import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

import Login from '~/pages/Login';
import Main from '~/pages/Main';
import Matches from '~/pages/Matches';
import { setAuthorization } from '~/services/api';
import { UserContext } from '~/contexts/User';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => (
  <Drawer.Navigator
    drawerType="back"
    drawerContentOptions={{
      activeBackgroundColor: '#df4723',
      activeTintColor: '#FFF',
      labelStyle: {
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

export default () => {
  const [user, setUser] = useState({});

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
          user,
          setUser: (data) => {
            setUser(data);
            setAuthorization(data.token || '');
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
