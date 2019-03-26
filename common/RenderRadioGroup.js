import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';

export default class RenderRadioGrop extends Component {

  render() {
    const { input: { onChange, value }, data} = this.props
    console.log(this.props,"asdadad")
    return (
      <View style={styles.container}>
        <RadioGroup radioButtons={data} value={value}  onPress={onChange} flexDirection='row'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'flex-start'
  },
});
