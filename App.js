/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';

import {Body, Container, Content, Header, Text} from 'native-base';
import SwitchSelector from 'react-native-switch-selector';

import Main from './Main';

const options = [
  {label: 'French', value: 'fr'},
  {label: 'English', value: 'en'},
];

const App = () => {

  return (
    <>
      <Main />
    </>
  );
}

export default App;
