import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {saveShippingAddress} from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import Button from '../../components/Button';
import styles from './styles';

export default function ShippingAddressScreen() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
  const navigation = useNavigation();
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = () => {
    if (!fullName || !address || !city || !postalCode || !country) {
      Alert.alert('Oops...', 'Seems like one of your fields is empty!');
      return;
    }
    dispatch(
      saveShippingAddress({fullName, address, city, postalCode, country}),
    );
    navigation.navigate('PaymentMethod');
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <CheckoutSteps step1 step2 />
        <View style={styles.root}>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Postal Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter postal code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter country"
              value={country}
              onChangeText={setCountry}
            />
          </View>
          <Button text="Continue" onPress={submitHandler} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
