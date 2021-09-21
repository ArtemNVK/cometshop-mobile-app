/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../actions/userActions';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const userRegister = useSelector(state => state.userRegister);
  const {userInfo, loading, error} = userRegister;

  const dispatch = useDispatch();

  const onSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Password and confirm password do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      navigation.navigate('HomeTabs');
    }
  }, [navigation, userInfo]);
  return (
    <KeyboardAvoidingView
      style={{backgroundColor: '#fff', flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ScrollView style={styles.root}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('HomeTabs')}
          style={{alignItems: 'flex-end', marginBottom: 100}}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{textAlign: 'center', fontSize: 21, fontWeight: 'bold'}}>
          Create Account
        </Text>
        {error && <Text style={styles.errorLabel}>{error}</Text>}
        {/* Name */}
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View style={styles.row}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
          />
        </View>

        {/* Password */}
        <View style={styles.row}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.row}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Button
          text="Sign Up"
          onPress={onSignUp}
          containerStyles={{marginVertical: 10}}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 16}}>
            Already have an account?{' '}
            <Text style={{fontWeight: 'bold', color: '#cb11ab'}}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
