/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  View,
  Pressable,
  Alert,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {detailsOrder} from '../../actions/orderActions';
import {useStripe} from '@stripe/stripe-react-native';
import {payOrderStripe} from '../../actions/orderActions';
import Button from '../../components/Button';
import {ORDER_PAY_RESET} from '../../constants/orderConstants';
import {decreaseInStock} from '../../actions/productActions';
import MessageBox from '../../components/MessageBox';
import OrderItem from '../../components/OrderItem';

interface orderScreenProps {
  id: string;
}

const OrderScreen = ({}: orderScreenProps) => {
  const route = useRoute();
  const orderId = route?.params?.id;
  const navigation = useNavigation();
  const orderDetails = useSelector(state => state.orderDetails);
  const {order, loading, error} = orderDetails;
  const dispatch = useDispatch();
  const [secret, setSecret] = useState<string | null>(null);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const userSignin = useSelector(state => state.userSignin);
  const productDecreaseCIS = useSelector(state => state.productDecreaseCIS);
  const [successPay, setSuccessPay] = useState<boolean | null>(null);
  const {
    loading: loadingDecrease,
    error: errorDecrease,
    success: successDecrease,
  } = productDecreaseCIS;
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [orderId]);

  useEffect(() => {
    if (order && !order.isPaid) {
      fetchPaymentSheetParams();
    }
  }, [order, order?.isPaid]);

  useEffect(() => {
    if (successPay) {
      const items: {id: string; qty: number}[] = [];
      order?.orderItems.map(item => {
        items.push({
          id: item.product,
          qty: item.qty,
        });
      });
      items.map(item => {
        dispatch(decreaseInStock(item));
      });
      dispatch({type: ORDER_PAY_RESET});
    }
  }, [order?.isPaid, successPay]);

  const fetchPaymentSheetParams = async () => {
    const amount = (order?.totalPrice * 100).toFixed(2);
    const {userInfo} = userSignin;
    const response = await Axios.post(
      'https://cometshop.herokuapp.com/api/orders/payment-sheet',
      {amount},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );
    const {clientSecret} = await response.data;
    setSecret(clientSecret);
  };

  const initializePaymentSheet = async () => {
    if (!secret) {
      return;
    }
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: secret,
    });
    if (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    if (secret) {
      initializePaymentSheet();
    }
  }, [secret]);

  const openPaymentSheet = async () => {
    if (!secret) {
      return;
    }
    const {error} = await presentPaymentSheet({secret});
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccessPay(true);
      dispatch(payOrderStripe(order));
      Alert.alert('Success', 'Your payment is confirmed!');
    }
  };

  return (
    <ScrollView
      style={styles.root}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => dispatch(detailsOrder(orderId))}
        />
      }>
      {order && (
        <View style={styles.orderScreenContainer}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 25,
              marginBottom: 20,
            }}>
            Order {order._id}
          </Text>
          <View>
            <View>
              <View>
                <Text style={{marginBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Name:</Text>{' '}
                  {order.shippingAddress.fullName} {'\n'}
                  <Text style={{fontWeight: 'bold'}}>Address: </Text>{' '}
                  {order.shippingAddress.address},{order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </Text>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    <Text>Delivered at {order.deliveredAt}</Text>
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">
                    <Text>Not Delivered</Text>
                  </MessageBox>
                )}
              </View>
              <View>
                <Text style={{marginVertical: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Payment method:</Text>{' '}
                  {order.paymentMethod}
                </Text>
                {order.isPaid && successPay ? (
                  <MessageBox variant="success">
                    <Text>Paid at {order.paidAt}</Text>
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">
                    <Text>Not Paid</Text>
                  </MessageBox>
                )}
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginVertical: 10,
                    textAlign: 'center',
                  }}>
                  Order Items
                </Text>
                {order?.orderItems && (
                  <FlatList
                    data={order.orderItems}
                    renderItem={({item}) => <OrderItem orderItem={item} />}
                    keyExtractor={item => item._id}
                  />
                )}
              </View>
            </View>
            <View style={styles.orderSummary}>
              <View style={styles.cartscreenProceedBtnContainer}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                  Order Summary
                </Text>
                <View style={styles.row}>
                  <Text>Items</Text>
                  <Text>${order.itemsPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text>Shipping</Text>
                  <Text>${order.shippingPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text>Tax</Text>
                  <Text>${order.taxPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={{fontWeight: 'bold'}}>Order Total</Text>
                  <Text style={{fontWeight: 'bold'}}>
                    ${order.totalPrice.toFixed(2)}
                  </Text>
                </View>
                {!order?.isPaid && successPay !== true ? (
                  <Button text="Pay" onPress={() => openPaymentSheet()} />
                ) : null}
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default OrderScreen;
