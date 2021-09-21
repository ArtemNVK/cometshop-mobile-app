/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Rating(props) {
  const {rating, numReviews, caption, isSelected} = props;
  return (
    <View style={styles.rating}>
      <FontAwesome
        key={Math.random()}
        name={rating >= 1 ? 'star' : rating >= 0.5 ? 'star-half-o' : 'star-o'}
        size={18}
        color={'#cb11ab'}
      />
      <FontAwesome
        key={Math.random()}
        name={rating >= 2 ? 'star' : rating >= 1.5 ? 'star-half-o' : 'star-o'}
        size={18}
        color={'#cb11ab'}
      />
      <FontAwesome
        key={Math.random()}
        name={rating >= 3 ? 'star' : rating >= 2.5 ? 'star-half-o' : 'star-o'}
        size={18}
        color={'#cb11ab'}
      />
      <FontAwesome
        key={Math.random()}
        name={rating >= 4 ? 'star' : rating >= 3.5 ? 'star-half-o' : 'star-o'}
        size={18}
        color={'#cb11ab'}
      />
      <FontAwesome
        key={Math.random()}
        name={rating >= 5 ? 'star' : rating >= 4.5 ? 'star-half-o' : 'star-o'}
        size={18}
        color={'#cb11ab'}
      />
      {caption ? (
        <Text style={isSelected ? {color: '#cb11ab'} : {color: 'black'}}>
          {caption}
        </Text>
      ) : (
        <Text style={styles.productScreenNumReviews}>
          {numReviews + ' reviews'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    margin: 1,
    flexDirection: 'row',
  },
  productScreenNumReviews: {
    marginLeft: 10,
    color: '#292F36',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
  },
});
