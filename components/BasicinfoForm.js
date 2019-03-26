import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import renderField from './../common/RenderField'
import RenderDatePicker from './../common/renderDatePicker'
import renderRadionset from './../common/RenderRadioSet'

class BasicinfoForm extends Component {
  state = {
    check: true,
    genderOptions: [
      {
        label: 'Male',
        value: "male",
      },
      {
        label: 'Female',
        value: "female",
      }
    ],
    maritalOptions:[
      {
        label: 'Unmarried',
        value: "unmarried"
      },
      {
        label: 'Married',
        value: "married"
      }
    ]
  }
  formSubmit(values){
    console.log(values, "values")
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.check && nextProps.BasicInformation && nextProps.addresses) {
      let obj = {}
      obj.first_name = nextProps.BasicInformation.first_name
      obj.contact_number = nextProps.BasicInformation.contact_number
      obj.dob = nextProps.BasicInformation.dob
      obj.gender = nextProps.BasicInformation.gender
      obj.place_of_birth = nextProps.BasicInformation.place_of_birth
      obj.blood_group = nextProps.BasicInformation.blood_group
      obj.spouse_name = nextProps.BasicInformation.spouse_name
      obj.spouse_dob = nextProps.BasicInformation.spouse_dob
      obj.children_name = nextProps.BasicInformation.children_name
      obj.children_dob = nextProps.BasicInformation.children_dob
      obj.alternative_number = nextProps.BasicInformation.alternative_number
      obj.anniversary_date = nextProps.BasicInformation.anniversary_date
      obj.personal_email = nextProps.BasicInformation.personal_email
      obj.known_languages = nextProps.BasicInformation.known_languages
      obj.last_name = nextProps.BasicInformation.last_name
      obj.marital_status = nextProps.BasicInformation.marital_status
      obj.nationality = nextProps.BasicInformation.nationality
      obj.current_address = nextProps.addresses.current_address
      if (nextProps.addresses.new_address) {
        obj.permanant_address = 'new'
      }
      if (nextProps.addresses.current_address) {
        obj.permanant_address = 'same'
      }
      obj.new_address = nextProps.addresses.new_address || nextProps.addresses.permanant_address
      this.props.initialize(obj)
      this.setState({ check: false })
    }
  }

  render() {
    let { handleSubmit } = this.props;
    let { genderOptions, maritalOptions } = this.state

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
          behavior="padding" >
          <View style={styles.updateText}>
            <Text style={styles.heading}>Personal Details</Text>
          </View>
          <View style={styles.formWrapper}>
            <View style={styles.field}>
              <Text style={styles.label}>First Name</Text>
              <Field
                name="first_name"
                component={renderField}
                placeholder="First Name"
                ref="1"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Last Name</Text>
              <Field
                name="last_name"
                component={renderField}
                placeholder="Last Name"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>
              <Field name="gender" radios={genderOptions} component={renderRadionset} />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Date Of Birth</Text>
              <Field
                name="dob"
                component={RenderDatePicker}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Place Of Birth</Text>
              <Field
                name="place_of_birth"
                component={renderField}
                placeholder="Place Of Birth"
                ref="4"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Blood Group</Text>
              <Field
                name="blood_group"
                component={renderField}
                placeholder="Blood Group"
                ref="5"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Known Languages (coma seperated)</Text>
              <Field
                name="known_languages"
                component={renderField}
                placeholder="Languages"
                ref="6"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Marital Status</Text>
              <Field name="marital_status" radios={maritalOptions} component={renderRadionset} />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Spouse Name</Text>
              <Field
                name="spouse_name"
                component={renderField}
                placeholder="Spouse Name"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Date Of Birth</Text>
              <Field
                name="spouse_dob"
                component={RenderDatePicker}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Children</Text>
              <Field
                name="children_name"
                component={renderField}
                placeholder="Children Name"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Date Of Birth</Text>
              <Field
                name="children_dob"
                component={RenderDatePicker}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Anniversary Date</Text>
              <Field
                name="anniversary_date"
                component={RenderDatePicker}
              />
            </View>
            <TouchableOpacity onPress={handleSubmit(this.formSubmit)}>
              <View style={styles.login}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

BasicinfoForm = reduxForm({
  form: 'PersonalinfoForm',
})(BasicinfoForm);

const mapDispatchToProps = (dispatch) => ({
  
})

const mapStateToProps = state => ({
  current_user: state.loginReducer.user
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicinfoForm)

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
  formWrapper: {
    padding: 10
  },
  field: {
    marginBottom: 5
  },
  label: {
    color: '#666'
  },
  login: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#25699c',
    padding: 10
  }
})