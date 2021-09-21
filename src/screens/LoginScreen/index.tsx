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
import {signin} from '../../actions/userActions';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, loading, error} = userSignin;

  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(signin(email, password));
  };

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
          Sign In
        </Text>
        {error && <Text style={styles.errorLabel}>{error}</Text>}

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

        <Button
          text="Sign In"
          onPress={onLogin}
          containerStyles={{marginVertical: 10}}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={{fontSize: 16}}>
            New customer?{' '}
            <Text style={{fontWeight: 'bold', color: '#cb11ab'}}>
              Create your account
            </Text>{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
