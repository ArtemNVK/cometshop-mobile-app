/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';

export default function Spinner() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 220,
      }}>
      <Image
        style={{width: 80, height: 80}}
        source={require('../../assets/spinner.gif')}
      />
    </View>
  );
}
