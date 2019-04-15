import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
  } from 'react-native';

export default class RenderField extends Component {
  render() {
    const { input: { onChange, ...restInput }, color , ref, placeholder, secureTextEntry, returnKeyType,  meta: { touched, error, warning, error_messages } } = this.props;
    return (
      <View>
        <TextInput 
        onChangeText={onChange} 
        {...restInput}
        ref={ref}
        style={[styles.inputField, {color:color ? color : '#000'}]} 
        placeholderTextColor="#ddd"
        returnKeyType={returnKeyType}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        />
        {touched && ((error && <Text style={styles.inputErrorText} >{error}</Text>) || (warning && <Text style={styles.inputErrorText} >{warning}</Text>) || (error_messages && <Text style={styles.inputErrorText} >{error_messages}</Text>))}
      </View>
    )
  }
}


const styles = StyleSheet.create({
    inputField: {
      textDecorationLine: 'none',
      borderColor: '#ced4da',
      borderWidth: 1,
      borderRadius: 3,
      padding:5,
    },
    inputErrorText:{
      color: 'red',
      marginTop: 8,
      fontSize: 12
    }
  });