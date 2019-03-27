import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Picker,
  } from 'react-native';
export default class renderSelect extends Component {
  render() {
		const { input: { onChange, value }, options,  meta: { touched, error, warning, error_messages } } = this.props;

    return (
			<View style={styles.container}>
				<Picker
				selectedValue={value}
				style={styles.picker}
				onValueChange={onChange}>
				{ options.map((option, index) => <Picker.Item label={option.label} value={option.value} key={index}/>)}
				</Picker>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		borderWidth:1,
		borderColor:'#ddd'
	}
})