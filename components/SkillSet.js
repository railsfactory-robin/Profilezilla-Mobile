import React, { Component } from 'react'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {StyleSheet, Text, View, Dimensions } from 'react-native';

export default class SkillSet extends Component {

  getColorCode(rating) {
    let percent = rating * 20;
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


  render() {
    const { skill_sets } = this.props
    return (
      <View style={styles.skillSet}>
      <Text style={styles.skillSetHead}>Skill Sets</Text>
      {skill_sets.length > 0 && this.getSkills(skill_sets)}
    </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});
