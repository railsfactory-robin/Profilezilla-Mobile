import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Image, Button } from 'react-native';
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import renderField from './../common/RenderField'
import RenderDatePicker from './../common/renderDatePicker'
import renderRadionset from './../common/RenderRadioSet'
import renderSelect from './../common/renderSelect'
import { getStates, getCountries, genderOptions, maritalOptions, addressOptions } from './../common/Util'
import { fileUploader } from './../actions/fileUploadAction'
import { CreateUserProfile } from '../actions/myProfileAction'
import { ImagePicker } from 'expo';

class BasicinfoForm extends Component {
  state = {
    check: true,
    image: null,
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

  renderImage(data){
    let image_path = data.publicUrl;
    return(
      <View style={styles.titleIconContainer}>
        <Image
        source={{ uri: image_path }}
        style={{ width: 85, height: 85, borderColor:'#ddd', borderWidth:1 }}
        resizeMode="cover"
        />
      </View>
    )
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    console.log(result, "asdasdadad");
    if (!result.cancelled) {
      result.name = "1asd "
      this.setState({ image: result.uri });
      this.props.upload(result);
    }
  };

  render() {
    let { image } = this.state;
    let { handleSubmit, PersonalinfoForm, data } = this.props;
    let values = PersonalinfoForm && PersonalinfoForm.values ? PersonalinfoForm.values : {}
    let { image_url } = this.props.BasicInformation ? this.props.BasicInformation : {}
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
          behavior="padding" >
          <View style={styles.updateText}>
            <Text style={styles.heading}>Personal Details</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
            {values && values.marital_status === 'married' && 
            <View>
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
            </View>}
            <View style={styles.field}>
                <Text style={styles.label}>Current Address</Text>
                <Field
                  name="current_address.address_1"
                  component={renderField}
                  placeholder="Street Address 1"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="current_address.address_2"
                  component={renderField}
                  placeholder="Street Address 2"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="current_address.area"
                  component={renderField}
                  placeholder="Area"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="current_address.city"
                  component={renderField}
                  placeholder="City"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="current_address.state"
                  component={renderSelect}
                  options={getStates()}
                />
                <View style={styles.addBottom}/>
                <Field
                  name="current_address.zip"
                  component={renderField}
                  placeholder="Zip"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Permanant Address</Text>
                <Field name="permanant_address" radios={addressOptions} component={renderRadionset} />
              </View>
              {values.permanant_address && values.permanant_address === 'new' && 
              <View>
                <Field
                  name="new_address.address_1"
                  component={renderField}
                  placeholder="Street Address 1"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="new_address.address_2"
                  component={renderField}
                  placeholder="Street Address 2"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="new_address.area"
                  component={renderField}
                  placeholder="Area"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="new_address.city"
                  component={renderField}
                  placeholder="City"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
                <Field
                  name="new_address.state"
                  component={renderSelect}
                  options={getStates()}
                />
                <View style={styles.addBottom}/>
                <Field
                  name="new_address.zip"
                  component={renderField}
                  placeholder="Zip"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom}/>
              </View>}
              <View style={styles.field}>
                <Text style={styles.label}>Phone Number</Text>
                <Field
                  name="contact_number"
                  component={renderField}
                  placeholder="Phone Number"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
              </View>
            <View style={styles.field}>
              <Text style={styles.label}>Alternative Number</Text>
              <Field
                name="alternative_number"
                component={renderField}
                placeholder="Alternative Number"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Personal Email</Text>
                <Field
                  name="personal_email"
                  component={renderField}
                  placeholder="Personal Email"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Nationality</Text>
                <Field
                  name="nationality"
                  component={renderSelect}
                  options={getCountries()}
                />
            </View>
            <View style={styles.field}>
              <Button
                title="Pick an image from camera roll"
                onPress={this._pickImage}
              />
              {data && data.urls && this.renderImage(data.urls[0])}
              {!data.urls && image_url && this.renderImage(image_url)}
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
  upload: (file) => dispatch(fileUploader(file)),
  createUserAction: (user) => dispatch(CreateUserProfile(user))
})

const mapStateToProps = state => ({
  current_user: state.loginReducer.user,
  PersonalinfoForm: state.form.PersonalinfoForm,
  data: state.uploadReducer.data,
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
  },
  addBottom:{
    marginBottom: 5
  }
})