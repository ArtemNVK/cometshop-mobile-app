import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LoadingBox() {
  return (
    <View style={styles.loading}>
      <FontAwesome name="spinner" size={24} color={'#cb11ab'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {},
});
