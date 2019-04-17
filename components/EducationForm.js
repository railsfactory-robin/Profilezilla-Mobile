import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, FieldArray } from "redux-form";
import School from './School'
import { CreateEducationDetails, initialize } from '../actions/myProfileAction'
import Modal from './../common/Modal'

class EducationForm extends Component {
  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this)
    this.state = {
      check: true,
    }
    this.cancel = this.cancel.bind(this)
    this.ok = this.ok.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.check && nextProps.education) {
      let pg = nextProps.education.pg.length < 1 ? [{}] : []
      let ug = nextProps.education.ug.length < 1 ? [{}] : []
      let school = nextProps.education.school.length < 1 ? [{}] : []

      nextProps.education.pg.forEach(element => {
        let obj = {}
        obj = element
        obj.from = obj.from
        obj.to = obj.to
        pg.push(obj)
      });

      nextProps.education.ug.forEach(element => {
        let obj = {}
        obj = element
        obj.from = obj.from
        obj.to = obj.to
        ug.push(obj)
      });

      nextProps.education.school.forEach(element => {
        let obj = {}
        obj = element
        obj.from = obj.from
        obj.to = obj.to
        school.push(obj)
      });

      this.props.initialize({
        pg: pg,
        ug: ug,
        school: school
      })
      this.setState({ check: false })
    }
  }

  ok() {
    this.props.initializeData()
    this.props.navigation.navigate('MyProfile')
  }

  cancel(){
    this.props.initializeData()
  }

  formSubmit(values) {
    if (values.pg && values.pg.length > 0) {
      for (let index = 0; index < values.pg.length; index++) {
        values.pg[index] = Object.assign({}, values.pg[index], { education_type: 'pg' })
      }
    }
    if (values.ug && values.ug.length > 0) {
      for (let index = 0; index < values.ug.length; index++) {
        values.ug[index] = Object.assign({}, values.ug[index], { education_type: 'ug' })
      }
    }
    if (values.school && values.school.length > 0) {
      for (let index = 0; index < values.school.length; index++) {
        values.school[index] = Object.assign({}, values.school[index], { education_type: 'school' })
      }
    }
    this.props.createUserAction({ educations_attributes: values })
  }

  render() {
    let { handleSubmit, EducationinfoForm} = this.props;
    let values = EducationinfoForm && EducationinfoForm.values ? EducationinfoForm.values : {}
    let loader = Object.keys(values).length == 0
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
          behavior="padding" >
          <View style={styles.updateText}>
            <Text style={styles.heading}>Education Details</Text>
          </View>
          {loader && <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>}
          <FieldArray name="pg" component={School} college="College" university="University" degree="Degree" title="Post Graduation" />
          <FieldArray name="ug" component={School} college="College" university="University" degree="Degree" title="Under Graduation" />
          <FieldArray name="school" component={School} college="School" degree="Standard (10th / 12th)" university="Syllabus board" title="School" />
          <TouchableOpacity onPress={handleSubmit(this.formSubmit)}>
            <View style={styles.login}>
              <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>Submit</Text>
            </View>
          </TouchableOpacity>
          <Modal message={this.props.message} ok={this.ok} cancel={this.cancel}/>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

EducationForm = reduxForm({
  form: 'EducationinfoForm',
})(EducationForm);

const mapDispatchToProps = (dispatch) => ({
  createUserAction: (user) => dispatch(CreateEducationDetails(user)),
  initializeData: () => dispatch(initialize())
})

const mapStateToProps = state => ({
  EducationinfoForm: state.form.EducationinfoForm,
  current_user: state.loginReducer.user,
  error_status: state.UserInfoReducer.error_status,
  success_status: state.UserInfoReducer.success_status,
  warning_message: state.UserInfoReducer.warning_message,
  message: state.UserInfoReducer.message,
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationForm)

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