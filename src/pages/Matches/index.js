import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '~/assets/logo.png';
import Match from '~/components/Match';
import api from '~/services/api';
import { disconnect, connect, subscribe } from '~/services/socket';
import { UserContext } from '~/contexts/User';
import {
  Container,
  Brand,
  Title,
  Developers,
  Developer,
  Avatar,
  Description,
  Bio,
  Text,
  Empty,
} from './styles';

export default () => {
  const [matches, setMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [developer, setDeveloper] = useState(null);
  const { id: developerId, setUser } = useContext(UserContext);

  const handleRefresh = useCallback(async () => {
    const { data } = await api.get('matches');

    setMatches(data);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    disconnect();
    connect({ developer_id: developerId });
    subscribe('match', dev => {
      setDeveloper(dev);
    });
  }, [developerId]);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear();
    setUser({});
  }, [setUser]);

  return (
    <Container>
      <TouchableOpacity testID="logout" onPress={handleLogout}>
        <Brand source={Logo} />
      </TouchableOpacity>
      <Title>Matches</Title>

      {matches.length > 0 ? (
        <Developers
          data={matches}
          keyExtractor={match => match._id}
          showsHorizontalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={({ item: match }) => (
            <Developer key={match._id}>
              <View>
                <Avatar source={{ uri: match.avatar }} />
              </View>
              <Description>
                <Text>{match.name}</Text>
                <Bio>{match.bio}</Bio>
              </Description>
            </Developer>
          )}
        />
      ) : (
        <View>
          <Empty>Nenhum match até o momento</Empty>
        </View>
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
