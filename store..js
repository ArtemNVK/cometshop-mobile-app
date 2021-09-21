import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isPromiseResolved} from 'promise-status-async';
import {cartReducer} from './src/reducers/cartReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from './src/reducers/orderReducers';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDecreaseCISReducer,
  productDeleteReducer,
  productDetailsReducer,
  productFilteredAndSortedListReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './src/reducers/productReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './src/reducers/userReducers';

const getAsyncStorage = async item => {
  try {
    const data = await AsyncStorage.getItem(item);
    if (data !== null) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchUser = () => {
  getAsyncStorage('userInfo').then(data => {
    return JSON.parse(data);
  });
};

const fetchCartItems = () => {
  getAsyncStorage('cartItems').then(data => {
    return JSON.parse(data);
  });
};

const fetchShippingAddress = async () => {
  getAsyncStorage('shippingAddress').then(data => {
    return JSON.parse(data);
  });
};

const userInfo = fetchUser();
const cartItems = fetchCartItems();
const shippingAddress = fetchShippingAddress();

const initialState = {
  userSignin: {
    userInfo: userInfo ? userInfo : null,
  },
  cart: {
    cartItems: cartItems ? cartItems : [],
    shippingAddress: shippingAddress ? shippingAddress : {},
    paymentMethod: 'Stripe',
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productSortedAndFiltered: productFilteredAndSortedListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  productDecreaseCIS: productDecreaseCISReducer,
});
const composeEnhancer = compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
