import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import HeaderComponent from '../components/Header';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#cb11ab'},
        headerTitleStyle: {color: '#fff'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          header: () => <HeaderComponent />,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductScreen}
        options={{
          title: 'Product Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
