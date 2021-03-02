import React from 'react';
import { YellowBox } from 'react-native';

import Navigation from '~/routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default () => {
  return <Navigation />;
};
