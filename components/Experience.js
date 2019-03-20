import React, { Component } from 'react'
import { ScrollView, Image, StyleSheet, Text, View, AsyncStorage, Dimensions, RefreshControl } from 'react-native';
import {convertDate} from './../common/Util'

export default class Experience extends Component {
  workExperience(exp) {
    if (exp) {
      return exp.map((item, index) => {
        return (
          <View key={index} style={styles.expBox}>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.date}>({convertDate(item.from)} - {convertDate(item.to) || "Today"})</Text>
            <Text>{item.designation} - {item.work_location}, {item.state}</Text>
          </View>
        )
      })
    }
  }
render() {
  const {experience} = this.props
  return (
    <View style={styles.experience}>
      <Text style={styles.experienceHead}>Experience</Text>
      {this.workExperience(experience)}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  experience:{
    backgroundColor: "#fff",
    borderTopWidth:1,
    borderTopColor: '#f4f4f4',
    padding: 15
  },
  experienceHead: {
    fontSize:18,
    marginBottom: 5,
    color: '#0c77bd'
  },
  expBox: {
    backgroundColor: '#f4f4f4',
    padding: 5,
    marginBottom: 5
  },
  company: {
    fontSize: 16,
  },
  date:{
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 4
  }
});