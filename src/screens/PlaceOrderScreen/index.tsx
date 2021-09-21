/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, StackActions} from '@react-navigation/native';
import {createOrder} from '../../actions/orderActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import {ORDER_CREATE_RESET} from '../../constants/orderConstants';
import Button from '../../components/Button';
import OrderItem from '../../components/OrderItem';
import styles from './styles';

export default function PlaceOrderScreen() {
  const cart = useSelector(state => state.cart);
  const navigation = useNavigation();
  const orderCreate = useSelector(state => state.orderCreate);
  const {loading, success, error, order} = orderCreate;
  const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0),
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}));
  };
  useEffect(() => {
    if (success) {
      dispatch({type: ORDER_CREATE_RESET});
      navigation.navigate('OrderDetails', {id: order._id});
      navigation.dispatch(StackActions.popToTop());
    }
  }, [dispatch, order, success]);

  return (
    <View>
      <CheckoutSteps step1 step2 step3 step4 />
      <ScrollView style={styles.root}>
        <View>
          <View>
            <View>
              <View style={{flexDirection: 'column'}}>
                <Text>
                  <Text style={styles.label}>Name:</Text>{' '}
                  {cart.shippingAddress.fullName}
                </Text>
                <Text>
                  <Text style={styles.label}>Address: </Text>{' '}
                  {cart.shippingAddress.address},{cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Payment</Text>
              <Text>
                <Text style={styles.label}>Method:</Text> {cart.paymentMethod}
              </Text>
            </View>
            <View>
              <Text style={[styles.label, {textAlign: 'center'}]}>Order Items</Text>
              <FlatList
                data={cart.cartItems}
                renderItem={({item}) => <OrderItem orderItem={item} />}
                keyExtractor={item => item.product}
              />
            </View>
          </View>
          <View style={styles.summaryContainer}>

            <Text style={[styles.label, {textAlign: 'center'}]}>
              Order Summary
            </Text>

            <View style={styles.row}>
              <Text>Items</Text>
              <Text>${cart.itemsPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <Text>Shipping</Text>
              <Text>${cart.shippingPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <Text>Tax</Text>
              <Text>${cart.taxPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Order Total</Text>
              <Text>${cart.totalPrice.toFixed(2)}</Text>
            </View>

            <Button text="Place Order" onPress={placeOrderHandler} />

            {error && <Text style={{color: 'red'}}>{error}</Text>}

          </View>
        </View>
      </ScrollView>
    </View>
  );
}
