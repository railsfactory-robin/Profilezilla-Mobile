import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Image, Button } from 'react-native';
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import renderField from './../common/RenderField'
import RenderDatePicker from './../common/renderDatePicker'
import renderRadionset from './../common/RenderRadioSet'
import renderSelect from './../common/renderSelect'
import { getStates, getCountries, genderOptions, maritalOptions, addressOptions } from './../common/Util'
import { fileUploader } from './../actions/fileUploadAction'
import { CreateUserProfile, initialize } from '../actions/myProfileAction'
import { ImagePicker } from 'expo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Modal from './../common/Modal'

class BasicinfoForm extends Component {
  constructor(props) {
    super(props)
    this.state = { check: true }
    this.formSubmit = this.formSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.ok = this.ok.bind(this)
  }

  formSubmit(values) {
    if (this.props.data && this.props.data.urls || this.props.BasicInformation && this.props.BasicInformation.image_url) {
      if (this.props.BasicInformation && this.props.BasicInformation.image_url && this.props.data.length == 0) {
        values = Object.assign({}, values, { image_url: this.props.BasicInformation.image_url })
      } else {
        values = Object.assign({}, values, { image_url: this.props.data.urls[0] })
      }
      let addresses_attributes = {}
      if (values.current_address) {
        values.current_address = Object.assign({}, values.current_address, { address_type: 'current_address' })
      }
      if (values.new_address) {
        values.new_address = Object.assign({}, values.new_address, { address_type: 'new_address' })
      }
      let permanant_address = {}
      let current_address = values.current_address
      let new_address = values.new_address
      if (values.permanant_address === 'new') {
        permanant_address = values.new_address
      } else {
        permanant_address = values.current_address
      }
      permanant_address = Object.assign({}, permanant_address, { address_type: 'permanant_address' })

      addresses_attributes = Object.assign({}, addresses_attributes, { permanant_address: permanant_address })
      addresses_attributes = Object.assign({}, addresses_attributes, { current_address: current_address })
      if (values.new_address) {
        addresses_attributes = Object.assign({}, addresses_attributes, { new_address: new_address })
      }
      values = Object.assign({}, values, { addresses_attributes: addresses_attributes })

      delete values.current_address
      delete values.new_address
      delete values.permanant_address
      this.props.createUserAction({ profiles: values })
    } else {
      alert("Please Upload the Image")
    }

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

  // componentDidUpdate() {
  //   let { message } = this.props;
  //   if (message) {
  //     this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
  //     this.refs.toast.show(message, DURATION.LENGTH_LONG, () => {
  //       this.props.navigation.navigate('MyProfile')
  //       this.props.initializeData()
  //     });
  //   }
  // }

  ok() {
    this.props.initializeData()
    this.props.navigation.navigate('MyProfile')
  }

  cancel(){
    this.props.initializeData()
  }


  renderImage(data) {
    let image_path = data.publicUrl;
    return (
      <View style={styles.titleContainer}>
        <FontAwesome style={styles.icon}>{Icons.camera} </FontAwesome>
        <Image
          source={{ uri: image_path }}
          style={{ width: 125, height: 125, borderColor: '#ddd', borderWidth: 1, marginBottom: 5 }}
          resizeMode="cover"
        />
      </View>
    )
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    });
    if (!result.cancelled) {
      let name = result.uri.split("/")
      let len = name.length
      result.name = name[len - 1]
      const data = new FormData();
      data.append("photo", {
        name: result.name,
        type: 'image/jpg',
        uri: result.uri
      });
      this.props.upload(data, result);
    }
  };

  render() {
    let { handleSubmit, PersonalinfoForm, data, error_status } = this.props;
    let values = PersonalinfoForm && PersonalinfoForm.values ? PersonalinfoForm.values : {}
    let { image_url } = this.props.BasicInformation ? this.props.BasicInformation : {}
    let loader = Object.keys(values).length == 0
    return (
      <ScrollView style={styles.container} ref='_scrollView'>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
          behavior="padding" >
          <View style={styles.updateText}>
            <Text style={styles.heading}>Personal Details</Text>
          </View>
          {loader && <View style={styles.loading}>
           <ActivityIndicator size='large' />
          </View>}
          <View style={styles.formWrapper}>
            <View style={styles.imgWrap}>
              {data && data.urls && this.renderImage(data.urls[0])}
              {!data.urls && image_url && this.renderImage(image_url)}
              <View style={styles.imgRightPart}>
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
              </View>
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
              <View style={styles.addBottom} />
              <Field
                name="current_address.address_2"
                component={renderField}
                placeholder="Street Address 2"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
              <View style={styles.addBottom} />
              <Field
                name="current_address.area"
                component={renderField}
                placeholder="Area"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
              <View style={styles.addBottom} />
              <Field
                name="current_address.city"
                component={renderField}
                placeholder="City"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
              <View style={styles.addBottom} />
              <Field
                name="current_address.state"
                component={renderSelect}
                options={getStates()}
              />
              <View style={styles.addBottom} />
              <Field
                name="current_address.zip"
                component={renderField}
                placeholder="Zip"
                ref="2"
                secureTextEntry={false}
                returnKeyType="next"
              />
              <View style={styles.addBottom} />
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
                <View style={styles.addBottom} />
                <Field
                  name="new_address.address_2"
                  component={renderField}
                  placeholder="Street Address 2"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom} />
                <Field
                  name="new_address.area"
                  component={renderField}
                  placeholder="Area"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom} />
                <Field
                  name="new_address.city"
                  component={renderField}
                  placeholder="City"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom} />
                <Field
                  name="new_address.state"
                  component={renderSelect}
                  options={getStates()}
                />
                <View style={styles.addBottom} />
                <Field
                  name="new_address.zip"
                  component={renderField}
                  placeholder="Zip"
                  ref="2"
                  secureTextEntry={false}
                  returnKeyType="next"
                />
                <View style={styles.addBottom} />
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

            {/*<Button
              title="Pick an image from camera roll"
              onPress={this._pickImage}
            />*/}
            <TouchableOpacity onPress={handleSubmit(this.formSubmit)}>
              <View style={styles.login}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal message={this.props.message} ok={this.ok} cancel={this.cancel}/>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

BasicinfoForm = reduxForm({
  form: 'PersonalinfoForm',
})(BasicinfoForm);

const mapDispatchToProps = (dispatch) => ({
  upload: (file, result) => dispatch(fileUploader(file, result)),
  createUserAction: (user) => dispatch(CreateUserProfile(user)),
  initializeData: () => dispatch(initialize())
})

const mapStateToProps = state => ({
  current_user: state.loginReducer.user,
  PersonalinfoForm: state.form.PersonalinfoForm,
  data: state.uploadReducer.data,
  error_status: state.UserInfoReducer.error_status,
  success_status: state.UserInfoReducer.success_status,
  warning_message: state.UserInfoReducer.warning_message,
  message: state.UserInfoReducer.message,
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
  addBottom: {
    marginBottom: 5
  },
  imgWrap: {
    flex: 1,
    flexDirection: 'row'
  },
  imgRightPart: {
    marginLeft: 10,
    flex: 1
  },
  titleContainer: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 999
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
})