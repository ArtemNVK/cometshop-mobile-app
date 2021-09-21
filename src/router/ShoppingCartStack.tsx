import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoopingCartScreen from '../screens/ShoopingCartScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderScreen from '../screens/OrderScreen';

const Stack = createStackNavigator();

const ShoppingCartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#cb11ab'},
        headerTitleStyle: {color: '#fff'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        component={ShoopingCartScreen}
        name="cart"
        options={{title: 'Shopping Cart'}}
      />
      <Stack.Screen
        component={ShippingAddressScreen}
        name="ShippingAddress"
        options={{title: 'Shipping Address'}}
      />
      <Stack.Screen
        component={PaymentMethodScreen}
        name="PaymentMethod"
        options={{title: 'Payment Method'}}
      />
      <Stack.Screen
        component={PlaceOrderScreen}
        name="PlaceOrder"
        options={{title: 'Place Order'}}
      />
      {/* <Stack.Screen
        name="OrderDetails"
        component={OrderScreen}
        options={{title: 'Order Details'}}
      /> */}
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;
