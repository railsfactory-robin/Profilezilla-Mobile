import React, { Component } from 'react'
import {StyleSheet, Text, View, Image } from 'react-native';
import {convertDate} from './../common/Util'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Basicinfo extends Component {
  render() {
    const {basic} = this.props
      return(
        <View>
          <View style={styles.titleContainer}>
          <View style={styles.titleIconContainer}>
            <Image
            source={{ uri: basic.image_url && basic.image_url.publicUrl }}
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
}

const styles = StyleSheet.create({
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
});