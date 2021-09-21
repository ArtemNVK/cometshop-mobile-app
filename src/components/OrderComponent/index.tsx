/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Order} from '../../models';

interface OrderItemProps {
  orderItem: Order;
  length: number;
  i: number;
}

export default function OrderComponent({orderItem, length, i}: OrderItemProps) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('OrderDetails', {id: orderItem.id});
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{borderBottomWidth: i === length - 1 ? 0 : 0.5, padding: 5}}>
      <Text>Order № {orderItem.id}</Text>
    </TouchableOpacity>
  );
}
