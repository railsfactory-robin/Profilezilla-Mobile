import React, { Component } from 'react'
import { Linking, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

export default class Projects extends Component {
    projects(project) {
      if (project) {
        return project.map((item, index) => {
          return (
            <View key={index} style={styles.proBox}>
              <Text style={styles.projectName}>{item.project_name}</Text>
              <TouchableOpacity style={styles.link} onPress={() => Linking.openURL(item.project_url)}>
                <Text style={{color: 'blue', fontSize: 13, textDecorationLine: 'underline'}}>
                {item.project_url}
                </Text>
              </TouchableOpacity>
              <Text style={styles.content}><Text style={styles.label}>Location:</Text> {item.location}</Text>
              <Text style={styles.content}><Text style={styles.label}>Market Place: </Text>{item.market}</Text>
              <Text style={styles.content}><Text style={styles.label}>Technology:</Text>{item.tech_stack}</Text>
              <Text style={styles.content}><Text style={styles.label}>Duration: </Text>{item.duration}</Text>
              <Text style={styles.info}>{item.additional_information}</Text>
            </View>
          )
        })
      }
  }
render() {
  const {projects} = this.props
  return (
    <View style={styles.projects}>
      <Text style={styles.projectsHead}>Projects</Text>
      {this.projects(projects)}
    </View>
    )
  }
}

const styles = StyleSheet.create({
    projects:{
    backgroundColor: "#fff",
    borderTopWidth:1,
    borderTopColor: '#f4f4f4',
    padding: 15
  },
  projectsHead: {
    fontSize:18,
    marginBottom: 5,
    color: '#0c77bd'
  },
  proBox: {
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
  projectName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  link:{
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 4
  },
  info: {
    marginTop: 5,
    textAlign: 'justify',
    color: '#666'
  },
  content:{
    color: '#666'
  },
  label:{
    fontWeight: 'bold',
    color: '#444'
  }
});