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
    const { input: { onChange, ...restInput }, ref, placeholder, secureTextEntry, returnKeyType,  meta: { touched, error, warning, error_messages } } = this.props;
    return (
      <View>
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
        {touched && ((error && <Text style={styles.inputErrorText} >{error}</Text>) || (warning && <Text style={styles.inputErrorText} >{warning}</Text>) || (error_messages && <Text style={styles.inputErrorText} >{error_messages}</Text>))}
      </View>
    )
  }
}


const styles = StyleSheet.create({
    inputField: {
      textDecorationLine: 'none',
      textDecorationColor: '#fff',
      color: '#ffffff'
    },
    inputErrorText:{
      color: 'red',
      marginTop: 12,
      fontSize: 12
    }
  });