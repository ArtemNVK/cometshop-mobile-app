/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View, Text, Pressable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

interface OrderItemProps {
  orderItem: {
    countInStock: number;
    image: string;
    name: string;
    price: number;
    product: string;
    qty: number;
  };
}

const OrderItem = ({orderItem}: OrderItemProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: orderItem.image}} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {orderItem.qty} x ${orderItem.price} = $
          {orderItem.qty * orderItem.price}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{marginVertical: 10}}
        onPress={() =>
          navigation.navigate('ProductDetails', {id: orderItem.product})
        }>
        <Text>{orderItem.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderItem;
