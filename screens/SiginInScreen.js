import React, { Component } from 'react'
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity
} from 'react-native';
import LogoTitle from './LogoTitle'
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import { UserLogin, initializeForm } from './../actions/loginAction';
import renderField from './../common/RenderField';
import { Header } from 'react-navigation';

class SiginInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.formSubmit = this.formSubmit.bind(this);
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  formSubmit(values) {
    this.props.loginAction(values)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current_user && nextProps.current_user.user) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    let { handleSubmit, message, error_status } = this.props;
    return (
      <ImageBackground source={require('./../assets/images/splash.jpg')} style={{ width: '100%', height: '100%' }}>
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView
            keyboardVerticalOffset = {Header.HEIGHT + 20} // adjust the value here if you need more padding
            style = {{ flex: 1 }}
            behavior = "padding" >
            <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Welcome to Profilezilla</Text>
          </View>
          <View style={styles.loginBox}>
          <Text style={styles.signInText}>Sign In</Text>
            <View style={styles.username}>
              <Field 
              name="email"   
              component={renderField} 
              placeholder="Email Address" 
              ref="1" 
              secureTextEntry={false}
              returnKeyType="next"
              />
            </View>
            <View style={styles.username}>
              <Field 
              name="password" 
              component={renderField} 
              placeholder="Password" 
              ref="2" 
              secureTextEntry={true}
              returnKeyType="done"
              />
            </View>
            <TouchableOpacity onPress={handleSubmit(this.formSubmit)}>
              <View style={styles.login}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>Login</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', textDecorationLine: 'underline' }}>Forgot Password? </Text>
            </View>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    )
  }
}

SiginInScreen = reduxForm({
  form: 'SiginInScreenForm',
})(SiginInScreen);

const mapDispatchToProps = (dispatch) => ({
  loginAction: (user) => dispatch(UserLogin(user)),
  initializeAction: () => dispatch(initializeForm())
})

const mapStateToProps = state => ({
  LoginForm: state.form.LoginForm,
  current_user: state.loginReducer.user,
  message: state.loginReducer.message,
  error_status: state.loginReducer.error_status
})

export default connect(mapStateToProps, mapDispatchToProps)(SiginInScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    marginTop: 50,
    marginBottom: 40,
  },
  welcomeText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold'
  },
  loginBox: {
    backgroundColor: '#183e5a',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  signInText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  username: {
    borderWidth: 1,
    borderColor: '#fff',
    margin: 10,
    borderRadius: 10,
    height: 50,
    padding: 10
  },
  login: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#25699c',
    padding: 10
  }
});