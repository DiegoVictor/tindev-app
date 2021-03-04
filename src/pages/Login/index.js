import React, { useState, useCallback, useContext } from 'react';
import { Platform, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Logo from '~/assets/logo.png';
import api, { setAuthorization } from '~/services/api';
import { UserContext } from '~/contexts/User';
import { Container, Input, Button, Text } from './styles';

export default () => {
  const [developer, setDeveloper] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = useCallback(async () => {
    const { data } = await api.post('developers', { username: developer });

    await AsyncStorage.setItem(
      'tindev_user',
      JSON.stringify({
        id: data.developer._id,
        token: data.token,
      })
    );

    setUser({
      id: data.developer._id,
      token: data.token,
    });
    setAuthorization(data.token);
  }, [developer, setUser]);

  return (
    <Container behavior="padding" enabled={Platform.OS === 'ios'}>
      <Image source={Logo} />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuáro no Github"
        placeholderTextColor="#999"
        value={developer}
        onChangeText={setDeveloper}
      />
      <Button testID="submit" onPress={handleLogin}>
        <Text>Enviar</Text>
      </Button>
    </Container>
  );
};
