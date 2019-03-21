import React, { Component } from 'react'
import {StyleSheet, Text, View } from 'react-native';

export default class Education extends Component {
  renderEducation(edu) {
    if (edu) {
      return edu.map((item, index) => {
        return (
          <View key={index} style={styles.eduBlock}>
            <Text style={styles.eduName}>{item.education_type === 'pg' ? 'Post Graduation' : item.education_type === 'ug' ? 'Under Graduation' : 'School'}</Text>
              <Text style={styles.content}><Text style={styles.label}>College/School </Text>:  {item.college_name}</Text>
              <Text style={styles.content}><Text style={styles.label}>University/Syllabus board </Text>:  {item.university}</Text>
              <Text style={styles.content}><Text style={styles.label}>Degree/Standard </Text>:  {item.degree}</Text>
              <Text style={styles.content}><Text style={styles.label}>Year of passing </Text>:  {item.passed_out}</Text>
              <Text style={styles.content}><Text style={styles.label}>Location </Text>:  {item.location}</Text>
              <Text style={styles.content}><Text style={styles.label}>Education type </Text>:  {item.study_type}</Text>
              <Text style={styles.content}><Text style={styles.label}>GPA/Percentage </Text>: {item.percentage}</Text>
          </View>
        )
      })
    }
  }
render() {
  const {education} = this.props
  return (
    <View style={styles.education}>
      <Text style={styles.educationHead}>Education</Text>
      {education.pg && this.renderEducation(education.pg)}
      {education.ug && this.renderEducation(education.ug)}
      {education.school && this.renderEducation(education.school)}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  education:{
    backgroundColor: "#fff",
    borderTopWidth:1,
    borderTopColor: '#f4f4f4',
    padding: 15
  },
  educationHead: {
    fontSize:18,
    marginBottom: 5,
    color: '#0c77bd'
  },
  eduBlock: {
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
  eduName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  content:{
    color: '#666'
  },
  label:{
    fontWeight: 'bold',
    color: '#444'
  }
});