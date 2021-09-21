/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import HeaderComponent from '../components/Header';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#cb11ab'},
        headerTitleStyle: {color: '#fff'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          header: () => <HeaderComponent />,
        }}>
        {() => <HomeScreen />}
      </Stack.Screen>
      <Stack.Screen
        component={ProductScreen}
        name="ProductDetails"
        options={{
          title: 'Product Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
