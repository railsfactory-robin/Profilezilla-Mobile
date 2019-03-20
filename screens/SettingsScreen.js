import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, AsyncStorage, Dimensions, RefreshControl } from 'react-native';
import LogoTitle from './LogoTitle'
import { userLogout } from './../actions/loginAction';
import { getUserDetails } from './../actions/getUserActions'
import { connect } from 'react-redux'
import Logout from './logout'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Experience from './../components/Experience'
import Projects from './../components/Projects'
import Education from './../components/Education'

import {convertDate} from './../common/Util'

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  componentDidMount(){
    this.props.getUserAction();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getUserAction();
      this.setState({refreshing: false});
  }

  getColorCode(rating) {
    let percent = rating * 20;
    console.log(percent)
    const a = {
      good: '#4CAF50',
      medium: '#76D7C4',
      low: '#F39C12',
      poor: '#FFC300',
      very_poor: '#EA3E19'
    }
    if (percent <= 20) {
      return a.very_poor;
    }
    if (20 < percent && percent <= 40) {
      return a.poor;
    }
    if (40 < percent && percent <= 60) {
      return a.low;
    }
    if (60 < percent && percent <= 80) {
      return a.medium;
    }
    if (80 < percent && percent <= 100) {
      return a.good;
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    this.props.logoutAction()
  };

  renderBasicInfo(basic){
    console.log(basic, "basic info")
    return(
      <View>
        <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          <Image
          source={{ uri: basic.image_url.publicUrl }}
          style={{ width: 85, height: 85, borderColor:'#ddd', borderWidth:1 }}
          resizeMode="cover"
          />
        </View>

        <View style={styles.titleTextContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {basic.first_name} {basic.last_name}
          </Text>

          <Text style={styles.slugText} numberOfLines={1}>
          {basic.designation}
          </Text>

          <Text style={styles.descriptionText}>
          {basic.gender === 'male' && <FontAwesome style={styles.icon}>{Icons.male} </FontAwesome>}
          {basic.gender === 'female' && <FontAwesome style={styles.icon}>{Icons.male} </FontAwesome>}
            {convertDate(basic.dob)}
          </Text>
          <Text style={styles.descriptionText}>
            <FontAwesome style={[styles.icon, styles.tint]}>{Icons.tint} </FontAwesome>
            {basic.blood_group}
          </Text>
        </View>
      </View>
        <View  style={styles.contactWrapper}>
          <View>
            <Text style={styles.contacts}><FontAwesome style={styles.icon}>{Icons.envelope} </FontAwesome> {basic.email}</Text>
            <Text style={styles.contacts}><FontAwesome style={styles.icon}>{Icons.envelope} </FontAwesome> {basic.personal_email}</Text>
          </View>
          <View>
            <Text style={styles.contacts}><FontAwesome style={styles.icon}>{Icons.phone} </FontAwesome> {basic.contact_number}</Text>
            <Text style={styles.contacts}><FontAwesome style={styles.icon}>{Icons.phone} </FontAwesome> {basic.alternative_number}</Text>
          </View>
        </View>
    </View>
    )
  }

  getSkills(skills) {
    const barWidth = Dimensions.get('screen').width - 60;
    if (skills) {
      return skills.map((item, index) => {
        const progressCustomStyles = {
          backgroundColor: this.getColorCode(item.rating), 
          borderRadius: 10,
          borderColor: '#ddd',
        };
        return (
          <View style={styles.skillSetItem} key={index}>
            <View style={styles.skillDetails}>
                <Text style={styles.skillName}>{item.technology} <Text style={styles.badge}>(Version: {item.version})</Text></Text>
              <Text style={styles.rating}>
                <Text>{item.rating}/5</Text>
              </Text>
            </View>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              value={item.rating * 20}
              style={styles.progress}
            />
          </View>
        )
      })
    }
  }

  renderinformations(info) {
    if (info) {
      return info.map((item, index) => {
        return (
          <View style={styles.achievementBox} key={index}>
            <Text style={styles.achievement}>{item.achievement}</Text>
            <Text>{item.description}</Text>
          </View>
        )
      })
    }
  }

  render() {
    console.log(this.props.profile, "profile")
    let { profile } = this.props
    return (
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        {profile.BasicInformation && this.renderBasicInfo(profile.BasicInformation)}
        {profile.skill_sets && <View style={styles.skillSet}>
          <Text style={styles.skillSetHead}>Skill Sets</Text>
          {profile.skill_sets.length > 0 && this.getSkills(profile.skill_sets)}
        </View> }
        {profile.addresses && profile.addresses.current_address && <View style={styles.skillSet}>
        <Text style={styles.skillSetHead}>Current Address</Text>
        <View>
          <Text>{profile.addresses.current_address.address_1},
            {profile.addresses.current_address.address_2},
            {profile.addresses.current_address.area},
            {profile.addresses.current_address.city}</Text>
        </View>
      </View>}
      {profile.addresses && profile.addresses.permanant_address && <View style={styles.skillSet}>
        <Text style={styles.skillSetHead}>Permanant Address</Text>
        <View>
          <Text>{profile.addresses.permanant_address.address_1},
            {profile.addresses.permanant_address.address_2},
            {profile.addresses.permanant_address.area},
            {profile.addresses.permanant_address.city}</Text>
        </View>
      </View>}
        {profile.education && <Education {...this.props} education={profile.education}/>}
        {profile.experience && profile.experience.length > 0 && <Experience {...this.props} experience={profile.experience}/>}
        {profile.projects && profile.projects.length > 0 && <Projects {...this.props} projects={profile.projects}/>}
        {profile.informations && <View style={styles.skillSet}>
          <Text style={styles.skillSetHead}>Additional Information</Text>
          {profile.informations.length > 0 && this.renderinformations(profile.informations)}
        </View> }
      </ScrollView> 
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(userLogout()),
  getUserAction: (val) => dispatch(getUserDetails(val))
})

const mapStateToProps = state => ({
  current_user: state.loginReducer.user,
  profile: state.getUserReducer.profile,
})


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: "#fff",
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    marginRight: 6,
    color: '#4d4d4d',
  },
  contactWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
    color: '#4d4d4d',
  },
  contacts: {
    color: '#4d4d4d',
  },
  icon:{
    color: '#bbb'
  },
  tint: {
    color:'red'
  },
  skillSet:{
    backgroundColor: "#fff",
    borderTopWidth:1,
    borderTopColor: '#f4f4f4',
    padding: 15,
  },
  skillSetHead: {
    fontSize:18,
    marginBottom: 5,
    color: '#0c77bd'
  },
  badge: {
    color: '#d25661',
    fontSize:12,
    marginLeft: 5
  },
  skillDetails:{
    flexDirection: 'row',
    justifyContent:'space-between',
    position:'relative'
  },
  rating: {
    position: 'absolute',
    right: 0,
    top: 20
  },
  skillName: {
    color: '#4d4d4d',
    marginBottom: 5,
  },
  skillSetItem: {
    marginBottom: 10,
  },
  achievementBox:{
    backgroundColor: '#f4f4f4',
    padding: 5,
    marginBottom: 5
  },
  achievement: {
    fontSize:16,
    marginBottom: 5
  }
});
