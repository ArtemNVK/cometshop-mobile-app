import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderScreen from '../screens/OrderScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#cb11ab'},
        headerTitleStyle: {color: '#fff'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{title: 'Order History'}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderScreen}
        options={{title: 'Order Details'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
