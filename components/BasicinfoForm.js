import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import renderField from './../common/RenderField'
import RenderRadioGrop from './../common/RenderRadioGroup'
import RenderDatePicker from './../common/renderDatePicker'
import LogoTitle from './../screens/LogoTitle'
import { Header } from 'react-navigation';

class BasicinfoForm extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  state = {
    genderOptions: [
      {
        label: 'Male',
        value: "male",
        size: 18,
      },
      {
        label: 'Female',
        value: "female",
        size: 18,
      }
    ],
    maritalOptions:[
      {
        label: 'Unmarried',
        value: "unmarried",
        size: 18,
      },
      {
        label: 'Married',
        value: "married",
        size: 18,
      }
    ]
  }

  formSubmit = values => {
    console.log(values, "values")
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
              <Field
                name="gender"
                component={RenderRadioGrop}
                data ={genderOptions}
              />
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
              <Field
                name="marital_status"
                component={RenderRadioGrop}
                data ={maritalOptions}
              />
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