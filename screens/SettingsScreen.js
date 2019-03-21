import React from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, RefreshControl } from 'react-native';
import LogoTitle from './LogoTitle'
import { userLogout } from './../actions/loginAction';
import { getUserDetails } from './../actions/getUserActions'
import { connect } from 'react-redux'
import Experience from './../components/Experience'
import Projects from './../components/Projects'
import Education from './../components/Education'
import BasicInfo from './../components/Basicinfo'
import SkillSet from './../components/SkillSet'
import Logout from './logout'

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
    let val = this.props.navigation.getParam('itemId') 

    this.props.navigation.addListener('willFocus', (route) => {
      if (val) {
        this.props.getUserAction(val);
      } else {
        this.props.getUserAction();
      }
     });
  }
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getUserAction();
      this.setState({refreshing: false});
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    this.props.logoutAction()
  };

 
  renderinformations(info) {
    if (info) {
      return info.map((item, index) => {
        return (
          <View style={styles.achievementBox} key={index}>
            <Text style={styles.achievement}>{item.achievement}</Text>
            <Text style={styles.achievementDesc}>{item.description}</Text>
          </View>
        )
      })
    }
  }

  render() {
    let { profile } = this.props
    return (
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        {profile.BasicInformation && <BasicInfo {...this.props} basic={profile.BasicInformation}/>}
        {profile.skill_sets &&  <SkillSet {...this.props} skill_sets={profile.skill_sets}/>}
        {profile.addresses && profile.addresses.current_address && 
          <View style={styles.address}>
            <Text style={styles.addressHead}>Current Address</Text>
            <View>
              <Text>
                {profile.addresses.current_address.address_1},
                {profile.addresses.current_address.address_2},
                {profile.addresses.current_address.area},
                {profile.addresses.current_address.city}
              </Text>
            </View>
          </View>}
      {profile.addresses && profile.addresses.permanant_address && <View style={styles.address}>
        <Text style={styles.addressHead}>Permanant Address</Text>
        <View>
          <Text>
            {profile.addresses.permanant_address.address_1},
            {profile.addresses.permanant_address.address_2},
            {profile.addresses.permanant_address.area},
            {profile.addresses.permanant_address.city}
          </Text>
        </View>
      </View>}
        {profile.education && <Education {...this.props} education={profile.education}/>}
        {profile.experience && profile.experience.length > 0 && <Experience {...this.props} experience={profile.experience}/>}
        {profile.projects && profile.projects.length > 0 && <Projects {...this.props} projects={profile.projects}/>}
        {profile.informations && <View style={styles.address}>
          <Text style={styles.addressHead}>Additional Information</Text>
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
  achievementBox:{
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    borderRadius: 3
  },
  achievement: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  achievementDesc: {
    color: '#666'
  },
  address:{
    backgroundColor: "#fff",
    borderTopWidth:1,
    borderTopColor: '#f4f4f4',
    padding: 15,
  },
  addressHead:{
    fontSize:18,
    marginBottom: 5,
    color: '#0c77bd'
  }
});
