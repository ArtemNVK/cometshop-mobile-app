/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import ShoppingCartStack from './ShoppingCartStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#fff',
        activeTintColor: '#adadad',
        tabStyle: {backgroundColor: '#cb11ab'},
      }}>
      <Tab.Screen
        component={HomeStack}
        name="home"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={SearchStack}
        name="search"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="text-search"
              size={26}
              color={color}
            />
            ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="shoppingCart"
        options={{
          tabBarIcon: ({color}) => (
            <View>
              {cartItems.length > 0 && (
                <Text
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    position: 'absolute',
                    height:
                      cartItems.length > 100
                        ? 22
                        : cartItems.length > 10
                        ? 20
                        : 18,
                    width:
                      cartItems.length > 100
                        ? 22
                        : cartItems.length > 10
                        ? 20
                        : 18,
                    fontSize: 10,
                    top: -5,
                    right: -10,
                    textAlign: 'center',
                    zIndex: 100,
                    padding: 1.5,
                    borderRadius: 100,
                  }}>
                  {cartItems.length}
                </Text>
              )}
              <Entypo name="shopping-cart" color={color} size={25} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        component={ProfileStack}
        name="Profile"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
