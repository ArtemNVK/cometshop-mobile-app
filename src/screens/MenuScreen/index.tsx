/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {signout} from '../../actions/userActions';
import Button from '../../components/Button';

const MenuScreen = () => {
  const navigation = useNavigation();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(signout());
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };
  console.log(userInfo);
  return (
    <SafeAreaView style={{padding: 10, backgroundColor: '#fff', flex: 1}}>
      {!userInfo && (
        <View style={styles.signUpContainer}>
          <Text style={{fontSize: 25, fontWeight: '700', marginBottom: 10}}>
            Sign in to your account
          </Text>
          <Text style={{fontSize: 17}}>Start shopping right now</Text>
          <Button
            text="Sign Up / Sign In"
            onPress={onSignUp}
            containerStyles={{marginVertical: 15}}
          />
        </View>
      )}
      {userInfo && (
        <View>
          <View style={styles.userSection}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 25, fontWeight: '700'}}>
                {userInfo.name}
              </Text>
              <Text style={{fontSize: 17}}>{userInfo.email}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={40}
                color={'#cb11ab'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.row}
              onPress={() => onLogout()}>
              <Octicons name="sign-out" size={24} color={'#cb11ab'} />
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.row}
              onPress={() => navigation.navigate('OrderHistory')}>
              <SimpleLineIcons name="bag" size={24} color={'#cb11ab'} />
              <Text style={styles.text}>Order History</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 25,
  },
  optionsContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderWidth: 0.2,
    borderRadius: 3,
  },
  text: {
    width: '90%',
    marginLeft: 10,
    fontSize: 17,
  },
  signUpContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen;
