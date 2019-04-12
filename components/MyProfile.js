import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import LogoTitle from './../screens/LogoTitle'
import { getUserDetails } from '../actions/getUserActions'
import BasicinfoForm from './BasicinfoForm'
import EducationForm from './EducationForm'
import ExperienceForm from './ExperienceForm'
import SkillsForm from './SkillsForm'
import FamilyForm from './FamilyForm'
import InfoForm from './InfoForm'
import ProjectForm from './ProjectForm'
import EmergencyForm from './EmergencyForm'
import AttachmentForm from './AttachmentForm'

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
    let tab = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.tab;
    return (
      <ScrollView style={styles.container}>
        {tab === 1 && <BasicinfoForm {...this.props} BasicInformation={profile && profile.BasicInformation} addresses={profile && profile.addresses} />}
        {tab === 2 && <EducationForm {...this.props} education={profile && profile.education} />}
        {tab === 3 && <ExperienceForm {...this.props} experience={profile && profile.experience} />}
        {tab === 4 && <SkillsForm  skillSets={profile && profile.skill_sets}  {...this.props} education={profile && profile.education} />}
        {tab === 5 && <ProjectForm projects={profile && profile.projects} {...this.props}  />}
        {tab === 6 && <InfoForm informations={profile && profile.informations} {...this.props} education={profile && profile.education} />}
        {tab === 7 && <AttachmentForm documents={profile && profile.documents} {...this.props}  />}
        {tab === 8 && <FamilyForm  family_histories={profile && profile.family_histories} {...this.props} education={profile && profile.education} />}
        {tab === 9 && <EmergencyForm emergency_contacts={profile && profile.emergency_contacts} {...this.props}  />}
      </ScrollView>
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