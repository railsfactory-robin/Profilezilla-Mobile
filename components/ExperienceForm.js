import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, FieldArray } from "redux-form";
import AddCompany from './AddCompany'
import { CreateExperienceDetails, initialize } from '../actions/myProfileAction'
import Modal from './../common/Modal'

class ExperienceForm extends Component {
  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.state = {
      check: true,
    }
    this.cancel = this.cancel.bind(this)
    this.ok = this.ok.bind(this)
  }

  ok() {
    this.props.initializeData()
    this.props.navigation.navigate('MyProfile')
  }

  cancel() {
    this.props.initializeData()
  }

  formSubmit(values) {
    this.props.createExperianceAction(values)
  }

  componentWillReceiveProps(nextProps){
    if (this.state.check && nextProps.experience) {
      let exp = nextProps.experience.length == 0 ? [{}] : nextProps.experience
      this.props.initialize({
        experiences_attributes: exp
      })
      this.setState({ check: false })
    }
  }

  render() {
    let { handleSubmit, ExperienceinfoForm } = this.props;
    let values = ExperienceinfoForm && ExperienceinfoForm.values ? ExperienceinfoForm.values : {}
    let loader = Object.keys(values).length == 0
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
          behavior="padding" >
          <View style={styles.updateText}>
            <Text style={styles.heading}>Experience Details</Text>
          </View>
          {loader && <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>}
          <FieldArray name="experiences_attributes" component={AddCompany} />
          <TouchableOpacity onPress={handleSubmit(this.formSubmit)}>
            <View style={styles.login}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>Submit</Text>
            </View>
          </TouchableOpacity>
          <Modal message={this.props.message} ok={this.ok} cancel={this.cancel} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

ExperienceForm = reduxForm({
  form: 'ExperienceinfoForm',
})(ExperienceForm);

const mapDispatchToProps = (dispatch) => ({
  createExperianceAction: (user) => dispatch(CreateExperienceDetails(user)),
  initializeData: () => dispatch(initialize())
})

const mapStateToProps = state => ({
  ExperienceinfoForm: state.form.ExperienceinfoForm,
  current_user: state.loginReducer.user,
  error_status: state.UserInfoReducer.error_status,
  success_status: state.UserInfoReducer.success_status,
  warning_message: state.UserInfoReducer.warning_message,
  message: state.UserInfoReducer.message,
})

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  updateText: {
    backgroundColor: '#183e5a',
  },
  heading: {
    color: '#fff',
    padding: 10
  },
  login: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#25699c',
    padding: 10
  }
})