import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LogoTitle from './LogoTitle'
import FontAwesome, { Icons } from 'react-native-fontawesome';

const user_img = 'http://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/256/user-icon.png'
const education_img = 'https://cdn1.iconfinder.com/data/icons/resume-pictograms/100/Resume_Graduate-512.png'
const experience_img = 'https://cdn4.iconfinder.com/data/icons/lined-business-people/48/a-16-512.png'
const skill_img = 'https://static.thenounproject.com/png/369287-200.png'
const project_img = 'https://static.thenounproject.com/png/72583-200.png'
const info_img = 'http://icons.iconarchive.com/icons/icons8/ios7/512/Very-Basic-Info-icon.png'
const attachment_img = 'https://image.flaticon.com/icons/png/512/54/54848.png'
const family_img = 'https://image.flaticon.com/icons/png/512/646/646395.png'
const emergency_img = 'https://cdn4.iconfinder.com/data/icons/office-line/512/phone-512.png'

export default class MyProfile extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.update}>
        <View style={styles.updateText}>
          <Text style={styles.heading}>Update your profile details</Text>
        </View>
        <View style={styles.updateWrap}>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.navigate('BasicinfoForm', {tab: 1})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: user_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Personal Informations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 2})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: education_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Education</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 3})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: experience_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Experience</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 4})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: skill_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Skill Set</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 5})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: project_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 6})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: info_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Additional Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 7})}>
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: attachment_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Attachments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 8})} >
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: family_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Family History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBox} onPress={() =>
            this.props.navigation.push('BasicinfoForm', {tab: 9})}
          >
          <FontAwesome style={styles.edit}>{Icons.pencilAlt}</FontAwesome>
            <Image
              source={{ uri: emergency_img }}
              style={{ width: 35, height: 35, marginBottom: 5 }}
            />
            <Text style={styles.title}>Emergency Contacts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  update: {
    backgroundColor: '#f4f4f4'
  },
  updateText:{
    backgroundColor: '#183e5a'
  },
  heading: {
    color: '#fff',
    padding: 10
  },
  updateWrap:{
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  updateBox:{
    height: 120, 
    width: 180, 
    backgroundColor: '#fff', 
    borderRadius:4,
    marginBottom: 10,
    shadowColor: 'red',
    shadowOffset: { width: 5, height: 12 },
    shadowOpacity: 1.8,
    shadowRadius: 2,
    elevation:5,
    justifyContent:'center',
    alignItems:'center',
    position: 'relative'
  },
  title: {
    color: '#000',
  },
  edit: {
    position: 'absolute',
    right: 7,
    top: 7,
    color: '#8c8686',
    fontSize: 11
  }
});
