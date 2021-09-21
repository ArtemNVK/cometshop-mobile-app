/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../actions/cartActions';

interface QuantitySelectorProps {
  qty: number;
  countInStock: number;
  setQuantity: () => void;
  product?: string;
}

const QuantitySelector = ({
  qty,
  countInStock,
  setQuantity,
  product,
}: QuantitySelectorProps) => {
  const dispatch = useDispatch();

  const onMinus = () => {
    setQuantity(Math.max(1, qty - 1));
  };

  const onPlus = () => {
    if (qty === countInStock) {
      setQuantity(countInStock);
    }
    if (qty < countInStock) {
      setQuantity(qty + 1);
    }
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={onMinus} style={styles.button}>
        <Text style={styles.butonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>{qty}</Text>

      <TouchableOpacity activeOpacity={0.7} onPress={onPlus} style={styles.button}>
        <Text
          style={[
            styles.butonText,
            {color: qty === countInStock ? '#b6b2b1' : 'black'},
          ]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    width: 130,
  },
  button: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d1d1',
  },
  butonText: {
    fontSize: 18,
  },
  quantity: {
    color: '#007eb9',
  },
});

export default QuantitySelector;
