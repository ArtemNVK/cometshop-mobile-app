/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';

// import products from '../../data/cart';

const ShopingCartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const checkoutHandler = () => {
    if (!userInfo) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('ShippingAddress');
    }
  };

  return (
    <ScrollView style={{padding: 15, marginBottom: 20}}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({item}) => <CartProductItem cartItem={item} />}
            keyExtractor={item => item.product}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.proceedContainer}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
              {(
                Math.floor(
                  cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 100,
                ) / 100
              ).toFixed(2)}
            </Text>
            <Button text="Proceed to checkout" onPress={checkoutHandler} />
          </View>
        </>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 250,
          }}>
          <TouchableOpacity
            style={{alignItems: 'flex-start', justifyContent: 'center'}}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={{fontSize: 20, fontWeight: '400'}}>
              Cart is empty.{' '}
              <Text style={{fontWeight: 'bold', color: '#cb11ab'}}>
                Go shopping
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  proceedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    marginVertical: 15,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
  },
});

export default ShopingCartScreen;
