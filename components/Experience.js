import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {convertDate} from './../common/Util'

export default class Experience extends Component {
  workExperience(exp) {
    if (exp) {
      return exp.map((item, index) => {
        return (
          <View key={index} style={styles.expBox}>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.date}>({convertDate(item.from)} - {convertDate(item.to) || "Today"})</Text>
            <Text style={styles.designation}>{item.designation} - {item.work_location}, {item.state}</Text>
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
  company: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  date:{
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 4
  },
  designation:{
    color: '#666'
  }
});