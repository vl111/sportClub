import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, Button
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

import Button1 from './app/components/ButtonTest/Button1';
import DropdownList from './app/components/DropdownList/DropdownList';

AppRegistry.registerComponent('sportClub', () => sportClub);

export default class sportClub extends Component {
  render() {
    return (
      <View>
        {/*<Button1 />*/}
        <DropdownList />
      </View>
    );
  }
}

