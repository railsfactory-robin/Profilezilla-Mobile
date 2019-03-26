import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
 
export default class RenderDatePicker extends Component {
  constructor(props){
    super(props)
  }
 
  render(){
    const { input: { onChange, value }, showTime, max, min } = this.props
    return (
      <DatePicker
        style={{width: 200}}
        date={value}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate={min}
        maxDate={max}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            // width: 900   
          }
        }}
        onDateChange={onChange}
      />
    )
  }
}