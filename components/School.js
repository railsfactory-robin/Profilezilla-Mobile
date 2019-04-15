import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Field, reduxForm, FieldArray } from "redux-form";
import renderField from './../common/RenderField'
import renderRadionset from './../common/RenderRadioSet'
import { typeOptions, gpaOptions } from './../common/Util'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class School extends Component {
  componentDidMount() {
    if (this.props.fields.length === 0) {
      this.props.fields.push({})
    }
  }
  render() {
    let { fields, title, university, college, degree } = this.props;
    let count = 0;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
        behavior="padding" >
        {fields.map((elem, index) => {
          count = index
          return (
            <View key={index} style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.text}>{title}</Text>
              </View>
              <View style={styles.formWrapper}>
                <View style={styles.field}>
                  <Text style={styles.label}>{college} name</Text>
                  <Field name={`${elem}.college_name`} component={renderField} type="text" placeholder="Example, Kendriya Vidyalaya" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>{university}</Text>
                  <Field name={`${elem}.university`} component={renderField} type="text" placeholder="Example, Bangalore University" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>{degree}</Text>
                  <Field name={`${elem}.degree`} component={renderField} type="text" placeholder="Degree/Standard" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Passed Out Year</Text>
                  <Field name={`${elem}.passed_out`} min="1900" max="2099" step="1" component={renderField} type="number" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Location</Text>
                  <Field name={`${elem}.location`} component={renderField} type="text" placeholder="Example, Chennai" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Education Type</Text>
                  <Field name={`${elem}.study_type`} radios={typeOptions} component={renderRadionset} />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Marks / Percentage</Text>
                  <Field name={`${elem}.gpa`} radios={gpaOptions} component={renderRadionset} />
                </View>
                <View style={styles.field}>
                  <Field name={`${elem}.percentage`} component={renderField} type="text" placeholder="Example, 100%" />
                </View>
              </View>
            </View>
          )
        })}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btn} onPress={() => fields.push({})}>
            <Text style={styles.white}><FontAwesome style={styles.icon}>{Icons.plus} </FontAwesome>Add more</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => fields.remove(count)}>
            <Text style={styles.white}><FontAwesome style={styles.icon}>{Icons.times} </FontAwesome>Remove</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 2
  },
  text: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#0c77bd'
  },
  formWrapper: {
    padding: 5
  },
  field: {
    marginBottom: 3
  },
  label: {
    color: '#666'
  },
  actions: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10
  },
  btn:{
    backgroundColor: '#ff920c',
    padding:10,
    borderRadius:5,
    margin: 10
  },
  white: {
    color:'#fff'
  }
})