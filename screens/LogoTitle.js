import React, { Component } from 'react'
import {
  Button,
  AsyncStorage,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Logo from './../assets/images/sedin.png'

export default class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoWrap}>
        <Image
          source={Logo}
          style={{ width: 100, height: 30 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoWrap: {
    flex: 1,
    backgroundColor: '#0c77bd',
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  }
});