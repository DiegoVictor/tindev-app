import React from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import ItsAMatch from '../../assets/itsamatch.png';
import { Container, Image, Avatar, Name, Bio, Close } from './styles';

export interface IDeveloper {
  _id: string;
  avatar: string;
  name: string;
  bio: string;
}

interface IMatchProps extends ViewProps {
  developer: IDeveloper;
  setDeveloper: (developer: IDeveloper | null) => void;
}

export const Match: React.FC<IMatchProps> = ({
  developer,
  setDeveloper,
  ...props
}) => {
  return (
    <Container {...props}>
      <Image source={ItsAMatch} resizeMode="contain" />

      <Avatar testID="avatar" source={{ uri: developer.avatar }} />
      <Name>{developer.name}</Name>
      <Bio>{developer.bio}</Bio>

      <TouchableOpacity
        testID="close"
        onPress={() => {
          setDeveloper(null);
        }}
      >
        <Close>FECHAR</Close>
      </TouchableOpacity>
    </Container>
  );
};
