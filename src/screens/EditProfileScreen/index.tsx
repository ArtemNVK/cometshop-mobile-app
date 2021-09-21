/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import Button from '../../components/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserProfile} from '../../actions/userActions';
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants';
import MessageBox from '../../components/MessageBox';

export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || userInfo._W.name);
      setEmail(userInfo.email || userInfo._W.email);
    }
    return;
  }, [dispatch, successUpdate, userInfo]);
  const submitHandler = () => {
    if (errorUpdate) {
      Alert.alert('Error', `${errorUpdate}`);
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({userId: userInfo._id, name, email, password}),
      );
      Alert.alert('Success', 'Profile Updated Successfully!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ScrollView style={styles.root}>
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
          <Text style={styles.label}>Email</Text>
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

        <Button text="Update" onPress={submitHandler} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
