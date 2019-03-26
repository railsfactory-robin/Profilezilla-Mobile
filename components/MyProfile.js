import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import LogoTitle from './../screens/LogoTitle'
import { getUserDetails } from '../actions/getUserActions'
import BasicinfoForm from './BasicinfoForm'

class MyProfile extends Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  componentDidMount(){
    this.props.userDetailsAction();
  }

  render() {
    let { profile, current_user } = this.props

    return (
      <View style={styles.container}>
        <BasicinfoForm {...this.props} BasicInformation={profile && profile.BasicInformation} addresses={profile && profile.addresses} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDetailsAction: () => dispatch(getUserDetails()),
})

const mapStateToProps = state => ({
  profile: state.getUserReducer.profile,
  current_user: state.loginReducer.user
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})