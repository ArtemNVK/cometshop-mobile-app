/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CheckoutSteps from '../../components/CheckoutSteps';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {savePaymentMethod} from '../../actions/cartActions';
import Button from '../../components/Button';

export default function PaymentMethodScreen() {
  const paymentMethods = ['Stripe'];
  const [selectedValue, setSelectedValue] = useState(paymentMethods[0]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const submitHandler = async () => {
    dispatch(savePaymentMethod(selectedValue));
    navigation.navigate('PlaceOrder');
  };

  return (
    <View>
      <CheckoutSteps step1 step2 step3 />
      <View style={{padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15}}>Choose your payment method:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={itemValue => setSelectedValue(itemValue)}>
          {paymentMethods.map(option => (
            <Picker.Item label={option} value={option} />
          ))}
        </Picker>
        <Button text="Continue" onPress={submitHandler} />
      </View>
    </View>
  );
}
