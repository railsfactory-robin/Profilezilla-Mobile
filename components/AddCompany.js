import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Field } from "redux-form";
import renderField from './../common/RenderField'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import renderSelect from './../common/renderSelect'
import { getStates } from './../common/Util'
import RenderDatePicker from './../common/renderDatePicker'

export default class AddCompany extends Component {
  componentDidMount() {
    if (this.props.fields.length === 0) {
      this.props.fields.push({})
    }
  }
  render() {
    let { fields } = this.props;
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
                <Text style={styles.text}>#{index + 1}</Text>
              </View>
              <View style={styles.formWrapper}>
                <View style={styles.field}>
                  <Text style={styles.label}>{index === 0 && 'Current '}Company</Text>
                  <Field name={`${elem}.company`} component={renderField} type="text" placeholder="Example, Sedin Technology" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Designation</Text>
                  <Field name={`${elem}.designation`} component={renderField} type="text" placeholder="Example, Software Engineer" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Work Location</Text>
                  <Field name={`${elem}.work_location`} component={renderField} type="text" placeholder="Example, Chennai, India" />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>State</Text>
                  <Field
                    name={`${elem}.state`}
                    component={renderSelect}
                    options={getStates()}
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Duration From</Text>
                  <Field
                    name={`${elem}.from`}
                    component={RenderDatePicker}
                  />
                </View>
                {index !== 0 && <View style={styles.field}>
                  <Text style={styles.label}>Duration To</Text>
                  <Field
                    name={`${elem}.from`}
                    component={RenderDatePicker}
                  />
                </View>}
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 2
  },
  text: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c77bd'
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
  btn: {
    backgroundColor: '#ff920c',
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  white: {
    color: '#fff'
  }
})