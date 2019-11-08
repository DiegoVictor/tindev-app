import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import ItsAMatch from '~/assets/itsamatch.png';
import { Container, Image, Avatar, Name, Bio, Close } from './styles';

export default function Match({ developer, setDeveloper }) {
  return (
    <Container>
      <Image source={ItsAMatch} resizeMode="contain" />

      <Avatar source={{ uri: developer.avatar }} />
      <Name>{developer.name}</Name>
      <Bio>{developer.bio}</Bio>
      <TouchableOpacity onPress={() => setDeveloper(null)}>
        <Close>FECHAR</Close>
      </TouchableOpacity>
    </Container>
  );
}

Match.propTypes = {
  developer: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
  setDeveloper: PropTypes.func.isRequired,
};