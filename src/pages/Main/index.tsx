import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services/api';
import Logo from '../../assets/logo.png';
import Dislike from '../../assets/dislike.png';
import Like from '../../assets/like.png';
import { IDeveloper, Match } from '../../components/Match';
import {
  Container,
  Brand,
  Title,
  Cards,
  Developer,
  Avatar,
  Bio,
  Name,
  Description,
  Empty,
  Actions,
  Button,
} from './styles';
import { disconnect, connect, subscribe } from '../../services/socket';
import { UserContext } from '../../contexts/User';

export const Main = () => {
  const [developers, setDevelopers] = useState<IDeveloper[]>([]);
  const [developer, setDeveloper] = useState<IDeveloper | null>(null);
  const { id: developerId, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('developers');

      setDevelopers(data);
    })();
  }, []);

  useEffect(() => {
    disconnect();
    if (developerId) {
      connect({ developer_id: developerId });
    }

    subscribe('match', (dev: IDeveloper) => {
      setDeveloper(dev);
    });
  }, [developerId]);

  const handleLike = useCallback(async () => {
    const [dev, ...rest] = developers;
    await api.post(`developers/${dev._id}/like`);
    setDevelopers(rest);
  }, [developers]);

  const handleDislike = useCallback(async () => {
    const [dev, ...rest] = developers;
    await api.post(`developers/${dev._id}/dislike`);
    setDevelopers(rest);
  }, [developers]);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear();
    setUser({});
  }, [setUser]);

  return (
    <Container>
      <TouchableOpacity testID="logout" onPress={handleLogout}>
        <Brand source={Logo} />
      </TouchableOpacity>
      <Title>Developers</Title>

      <Cards>
        {developers.length > 0 ? (
          developers.map((dev, index) => (
            <Developer
              testID={`developer_${dev._id}`}
              key={dev._id}
              index={developers.length - index}
            >
              <Avatar source={{ uri: dev.avatar }} />
              <Bio>
                <Name>{dev.name}</Name>
                <Description numberOfLines={3}>{dev.bio}</Description>
              </Bio>
            </Developer>
          ))
        ) : (
          <Empty>Sem sugestões no momento</Empty>
        )}
      </Cards>

      {developers.length > 0 && (
        <Actions>
          <Button testID="dislike" onPress={handleDislike}>
            <Image source={Dislike} />
          </Button>
          <Button testID="like" onPress={handleLike}>
            <Image source={Like} />
          </Button>
        </Actions>
      )}

      {developer && (
        <Match
          testID="match"
          developer={developer}
          setDeveloper={setDeveloper}
        />
      )}
    </Container>
  );
};
