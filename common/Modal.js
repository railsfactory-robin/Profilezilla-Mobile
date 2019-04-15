import React, { Component } from 'react'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { StyleSheet, View, Text } from 'react-native';

export default class Modal extends Component {
  render() {
    let { message, cancel, ok } = this.props
    return (
      <View style={styles.container}>
        <Dialog
          visible={message ? true : false}
          dialogTitle={<DialogTitle title="Notification" />}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          footer={
            <DialogFooter>
              <DialogButton
                text="Cancel"
                onPress={() => { cancel() }}
              />
              <DialogButton
                text="OK"
                onPress={() => { ok() }}
              />

            </DialogFooter>
          }
        >
          <DialogContent style={styles.dialContent}>
            <Text>{message}</Text>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialContent: {
    marginTop: 15
  }
})