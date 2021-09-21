import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CheckoutSteps(props) {
  return (
    <View style={styles.root}>
      <View
        style={props.step1 ? [styles.step, styles.activeStep] : styles.step}>
        <Text
          style={props.step1 ? [styles.text, styles.activeText] : styles.text}>
          Sign-In
        </Text>
      </View>
      <View
        style={props.step2 ? [styles.step, styles.activeStep] : styles.step}>
        <Text
          style={props.step2 ? [styles.text, styles.activeText] : styles.text}>
          Shipping
        </Text>
      </View>
      <View
        style={props.step3 ? [styles.step, styles.activeStep] : styles.step}>
        <Text
          style={props.step3 ? [styles.text, styles.activeText] : styles.text}>
          Payment
        </Text>
      </View>
      <View
        style={props.step4 ? [styles.step, styles.activeStep] : styles.step}>
        <Text
          style={props.step4 ? [styles.text, styles.activeText] : styles.text}>
          Place Order
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  step: {
    borderTopWidth: 5,
    borderTopColor: '#c0c0c0',
    flex: 1,
    padding: 1,
  },
  text: {
    color: '#c0c0c0',
    fontWeight: 'bold',
  },
  activeStep: {
    borderTopColor: '#4ECDC4',
  },
  activeText: {
    color: '#4ECDC4',
  },
});
