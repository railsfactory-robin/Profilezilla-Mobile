import React from 'react';
import {  SectionList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import LogoTitle from './LogoTitle'
import { getAllUserDetails } from './../actions/getAllUserAction'
import { connect } from 'react-redux';

class ViewAllProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      maxButtons: 5,
      offset: 0,
      limit: 5
    };
    this.itemForPagination = this.itemForPagination.bind(this);
  }
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: 'Please sign in',
    headerStyle: {
      backgroundColor: '#0c77bd',
    }
  };

  componentDidMount() {
    this.props.getAllUserAction({ offset: this.state.offset, limit: this.state.limit })
  }

  itemForPagination() {
    return Math.ceil(this.props.total_count / this.state.limit);
  }

  render() {
    let { user_list } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.updateText}>
          <Text style={styles.heading}>Profiles</Text>
        </View>
        <SectionList
          sections={[
            {data: user_list},
          ]}
          renderItem={this._renderItem }
          keyExtractor={(item, index) => index}
          style={styles.sectionList}
        />
    </View>
    );
  }

  _renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={styles.listItem} onPress={() =>
          this.props.navigation.push('Settings', {
            itemId: item.employee_id,
          })}>
          <Text style={styles.item}>{item.first_name} {item.last_name}</Text>
          <Text style={styles.item}>{item.designation}</Text>
          <Text style={styles.item}>{item.email}</Text> 
        </TouchableOpacity>
      );
  };
}

const mapDispatchToProps = (dispatch) => ({
  getAllUserAction: (val) => dispatch(getAllUserDetails(val)),
})

const mapStateToProps = state => ({
  user_list: state.AllUserReducer.user_list,
  total_count: state.AllUserReducer.total_count
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllProfile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
   sectionList:{
    padding: 10
   },
   listItem: {
    padding: 15,
    marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 2,
    borderRadius: 3
   },
   updateText:{
    backgroundColor: '#183e5a',
    marginBottom: 5
  },
  heading: {
    color: '#fff',
    padding: 10
  },
})