import React, {Component} from 'react';
import {AppRegistry, Text, View, Button} from 'react-native';

export default class Button1 extends Component{
  constructor(){
  	super();
  	this.state = {
  	  onPressButton1: function() {
  	  	fetch("https://instasport.co/club/bright/api/schedule/dates/2017-12-24/2017-12-31/hall/95/?format=json", {"method": "GET"})
  	  	.then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          console.log(responseData[0].id);
        });
        console.log('FUNCTION');
      }
    }
  }

  render(){
    return(
      <View>
        <Button
          //onPress={() => console.log('Pressed!')}
          onPress={()=>this.state.onPressButton1}
          title="BT1"
          color="#841584"
          accessibilityLabel="--------"
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Button1', () => Button1);
