/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../actions/cartActions';
import QuantitySelector from '../QuantitySelector';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';

interface CartProductItemProps {
  cartItem: {
    countInStock: number;
    image: string;
    name: string;
    price: number;
    product: string;
    qty: number;
  };
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  const [quantity, setQuantity] = useState(cartItem.qty);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addToCart(cartItem.product, quantity));
  }, [quantity]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: cartItem.image}} />
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>${cartItem.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{marginVertical: 10}}
        onPress={() =>
          navigation.navigate('ProductDetails', {id: cartItem.product})
        }>
        <Text>{cartItem.name}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <QuantitySelector
          qty={quantity}
          countInStock={cartItem.countInStock}
          setQuantity={setQuantity}
          product={cartItem.product}
        />
        <Button
          text="Delete"
          onPress={() => removeFromCartHandler(cartItem.product)}
        />
      </View>
    </View>
  );
};

export default CartProductItem;
