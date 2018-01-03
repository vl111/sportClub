import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

import Button1 from './app/components/ButtonTest/Button1';
import DropdownList from './app/components/DropdownList/DropdownList';

export default class App extends Component {
  render() {
    return (
      <View>
        {/*<Text style={{color:'red' }}> HELLO </Text>
        <Button1 />
        <ModalDropdown options={['option 1', 'option 2']}/>*/}
        <DropdownList/>
      </View>
    );
  }
}

AppRegistry.registerComponent('myapp1', () => myapp1);
