/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {createReview, detailsProduct} from '../../actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../actions/cartActions';
import MessageBox from '../../components/MessageBox';
import Rating from '../../components/Rating';
import LoadingBox from '../../components/LoadingBox';
import {PRODUCT_REVIEW_CREATE_RESET} from '../../constants/productConstants';
import {listOrderMine} from '../../actions/orderActions';
import Spinner from '../../components/Spinner';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route?.params?.id;
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product, reviews} = productDetails;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const orderMineList = useSelector(state => state.orderMineList);
  const {loading: loadingOrders, error: errorOrders, orders} = orderMineList;
  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  useEffect(() => {
    dispatch(listOrderMine({}));
  }, []);

  useEffect(() => {
    const purchasedItems = [];
    if (orders) {
      if (orders.results) {
        orders.results.map(item => {
          item.orderItems.map(x => {
            purchasedItems.push(x.product);
          });
        });
      }
    }
    if (purchasedItems.includes(productId)) {
      setAlreadyPurchased(true);
    }
  }, [orders]);

  useEffect(() => {
    if (!productId) {
      return;
    } else {
      dispatch(detailsProduct(productId));
    }
  }, [productId, dispatch, userInfo, successReviewCreate]);

  useEffect(() => {
    if (successReviewCreate) {
      Alert.alert('Success', 'Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
    }
  }, [dispatch, successReviewCreate]);

  const onAddToCart = async () => {
    dispatch(addToCart(productId, qty));
    navigation.navigate('shoppingCart', {screen: 'cart'});
  };

  const submitHandler = () => {
    if (comment && rating) {
      dispatch(
        createReview(productId, {rating, comment, name: userInfo._W.name}),
      );
    } else {
      Alert.alert('Error', 'Please enter comment and rating');
    }
  };

  const getDlContent = dlArray => {
    let content = [];
    for (let i = 0; i < dlArray.length; i++) {
      content.push(
        <View style={styles.dl}>
          <View style={styles.dt}>
            <Text style={styles.dtSpan}>{dlArray[i++]}</Text>
          </View>
          <View style={styles.dd}>
            <Text>{dlArray[i]}</Text>
          </View>
        </View>,
      );
    }
    return content;
  };
  console.log(loading);
  if (!product) {
    return <ActivityIndicator />;
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ScrollView style={styles.root}>
          <ImageCarousel images={product.previewImgs} />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>
            Price: ${product.price.toFixed(2)}
            {product.oldPrice && (
              <Text style={styles.oldPrice}>
                {' '}
                ${product.oldPrice.toFixed(2)}
              </Text>
            )}
          </Text>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>
            Description:
          </Text>
          <Text style={styles.description}>{product.description}</Text>
          {product?.attributesList?.length > 0 && (
            <View>
              <Text style={styles.reviewsTitle}>Attributes & Features:</Text>
              <View style={styles.attributesContainer}>
                <View style={styles.dlContainer}>
                  {getDlContent(product.attributesList)}
                </View>
              </View>
            </View>
          )}

          <View style={styles.placeOrderContainer}>
            <View style={styles.row}>
              <Text style={{fontSize: 18}}>Price</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                $ {product.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{fontSize: 18}}>Status</Text>
              <Text style={{fontSize: 18}}>
                {product.countInStock > 0 ? (
                  <Text style={{color: 'green'}}>In Stock</Text>
                ) : (
                  <Text style={{color: 'red'}}>Unavailable</Text>
                )}
              </Text>
            </View>
            {product.countInStock > 0 && (
              <View>
                <View style={styles.row}>
                  <Text style={{fontSize: 18}}>Qty</Text>
                  <View>
                    <QuantitySelector
                      qty={qty}
                      setQuantity={setQty}
                      countInStock={product.countInStock}
                    />
                  </View>
                </View>
                <Button text="Add To Cart" onPress={onAddToCart} />
              </View>
            )}
          </View>

          {/* REVIEWS SECTION */}

          <View style={styles.reviewsSectionContainer}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            {product.reviews.length === 0 ? (
              <MessageBox>
                <Text>There is no reviews</Text>
              </MessageBox>
            ) : (
              <FlatList
                data={product.reviews}
                renderItem={({item}) => (
                  <View style={{marginVertical: 20}}>
                    <Text>
                      <Text style={{fontWeight: 'bold', fontSize: 17}}>
                        {item.name}
                      </Text>{' '}
                      | {item.createdAt.substring(0, 10)}
                    </Text>
                    <Rating rating={item.rating} caption=" " />
                    <Text style={{marginTop: 10}}>{item.comment}</Text>
                  </View>
                )}
                keyExtractor={item => `${item.createdAt}${item.name}`}
                showsVerticalScrollIndicator={false}
              />
            )}
            {userInfo && alreadyPurchased ? (
              <View style={{marginVertical: 20}}>
                <Text style={styles.reviewsTitle}>Write a customer review</Text>
                <View>
                  <Text style={styles.reviewsLabel}>Rate this product</Text>
                  <View style={{borderWidth: 0.5, borderStyle: 'solid'}}>
                    <Picker
                      selectedValue={rating}
                      onValueChange={itemValue => setRating(itemValue)}>
                      <Picker.Item label={'1- Poor'} value={1} />
                      <Picker.Item label={'2- Fair'} value={2} />
                      <Picker.Item label={'3- Good'} value={3} />
                      <Picker.Item label={'4- Very good'} value={4} />
                      <Picker.Item label={'5- Excelent'} value={5} />
                    </Picker>
                  </View>
                </View>
                <View>
                  <Text style={styles.reviewsLabel}>Comment</Text>
                  <TextInput
                    style={styles.comment}
                    value={comment}
                    onChangeText={setComment}
                    multiline={true}
                    numberOfLines={3}
                  />
                </View>
                <View>
                  <Button text="Submit" onPress={submitHandler} />
                </View>
                <View>
                  {loadingReviewCreate && <LoadingBox />}
                  {errorReviewCreate && (
                    <MessageBox variant="danger">
                      <Text>{errorReviewCreate}</Text>
                    </MessageBox>
                  )}
                </View>
              </View>
            ) : !userInfo ? (
              <MessageBox>
                <Text>
                  Please{' '}
                  <Text
                    style={styles.callToAction}
                    onPress={() => navigation.navigate('Login')}>
                    Sign In
                  </Text>{' '}
                  to write a review
                </Text>
              </MessageBox>
            ) : !alreadyPurchased ? (
              <MessageBox>
                <Text>You can review only purchased items!</Text>
              </MessageBox>
            ) : !alreadyReviewedByUser ? (
              <MessageBox>
                <Text>You've already submitted review!</Text>
              </MessageBox>
            ) : null}
          </View>

          {/* END OF THE REVIEWS SECTION */}
        </ScrollView>
      )}
    </>
  );
};

export default ProductScreen;
