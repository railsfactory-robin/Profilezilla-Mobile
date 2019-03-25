import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { userLogout } from './../actions/loginAction';
import { connect } from 'react-redux'

class Logout extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity  title="Sign out!" onPress={this._signOutAsync}>
            <Text style={styles.logout}>Sign out!</Text>
          </TouchableOpacity>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    this.props.logoutAction()
    this.props.navigation.navigate('Auth');
  };
}

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(userLogout())
})

export default connect(null, mapDispatchToProps)(Logout)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logout: {
    textAlign: 'center',
    padding: 12,
    textDecorationLine: 'underline',
    color: 'blue'
  }
});
