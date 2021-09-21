import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function MessageBox(props) {
  return (
    <View
      style={[
        styles.alert,
        props.variant === 'success'
          ? styles.alert_success
          : props.variant === 'danger'
          ? styles.alert_danger
          : styles.alert_info,
      ]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    padding: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  alert_info: {
    backgroundColor: '#e0e0ff',
  },
  alert_success: {
    backgroundColor: '#eeffe0',
  },
  alert_danger: {
    backgroundColor: '#ffe0e0',
  },
});
