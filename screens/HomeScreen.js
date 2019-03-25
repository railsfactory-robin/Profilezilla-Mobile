import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import LogoTitle from './LogoTitle'
import HandShake from './../assets/images/handshake.png'
import Logout from './logout'

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  render() {
    let { current_user } = this.props
    console.log("current user", current_user)
    let first_name;
    let last_name;
    if(current_user && current_user.user){
      first_name = current_user.user.first_name;
      last_name = current_user.user.last_name;
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.welcomeTextUser}>Hi, {first_name + " " + last_name}</Text>
        <View style={styles.handShake}>
          <Image
          source={HandShake}
          style={{ width: 100, height: 100 }}
          />
        </View>
        <Text style={styles.welcomeText}>Welcome to <Text style={styles.logoText}>Profilezilla</Text></Text>
        <Text style={styles.description}>Profilezilla is one of the leading HR management tools for Industries. It helps the organization to organize the employee's profiles, and create a resume in seconds.</Text>
          <Logout {...this.props}/>
      </View>
    );
  }

}


const mapStateToProps = state => ({
  current_user: state.loginReducer.user
})


export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  logoText:{
    color:'#0c77bd'
  },
  welcomeTextUser: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 70
  },
  welcomeText:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description:{
    fontSize: 12,
    fontWeight: 'normal',
    padding: 35,
    textAlign:'center',
    paddingTop: 5,
    paddingBottom: 0,
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0c77bd',
    backgroundColor: "linear-gradient(90deg, rgba(12,119,189,1) 0%, rgba(0,212,255,1) 51%, rgba(10,136,201,1) 99%)",
    borderRadius: 4
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textTransform: 'uppercase'
  },
  handShake:{
    justifyContent: 'center', 
    alignItems: 'center',
  }
});
