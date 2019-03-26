import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity ,Text  } from 'react-native';

class RenderRadioSet extends Component {

  render() {
    const { radios, input:{ value, onChange } } = this.props;
    return (
      <View style={styles.container}>
        { radios.map((radio,key) => <Radio key={radio.label} {...radio} onChange={onChange} checked={radio.value === value} />)}
      </View>
    )
  }
}

class Radio extends Component {
  render() {
      const { checked, label } = this.props;
      return (
      <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.radioGroup}>
              <View style={styles.outer}>
                {checked && <View style={styles.circleFilled}/> }
              </View>
              <View style={styles.label}>
                  <Text>{label}</Text>
              </View>
          </View>
      </TouchableOpacity>
    )
  }

  handlePress = () => this.props.onChange(this.props.value)
}

export default RenderRadioSet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding:10
  },
  outer:{
    width:20,
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 50,
    position:'relative',
    marginRight: 7,
  },
  circleFilled:{
    color: 'red',
    width:10,
    height: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderRadius: 50,
    position: 'absolute',
    top:3,
    left: 3
  },
  radioGroup:{
    flex:1,
    flexDirection: 'row',
  },
  label:{
    marginRight: 5
  }
});