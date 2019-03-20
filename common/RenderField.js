import React, { Component } from 'react'
import {
    AsyncStorage,
    ImageBackground,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    View,
    TextInput,
    TouchableOpacity
  } from 'react-native';

export default class RenderField extends Component {
  render() {
    const { input: { onChange, ...restInput }, ref, placeholder, secureTextEntry, returnKeyType } = this.props;
    return (
        <TextInput 
        onChangeText={onChange} 
        {...restInput}
        ref={ref}
        style={styles.inputField} 
        placeholderTextColor="#fff"
        returnKeyType={returnKeyType}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    )
  }
}


const styles = StyleSheet.create({
    inputField: {
      textDecorationLine: 'none',
      textDecorationColor: '#fff',
      color: '#ffffff'
    }
  });