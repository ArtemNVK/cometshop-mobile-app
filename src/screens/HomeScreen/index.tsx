/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import ProductItem from '../../components/ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../../actions/productActions';
import {PRODUCT_REVIEW_CREATE_FAIL_RESET} from '../../constants/productConstants';
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/LoadingBox';
import Spinner from '../../components/Spinner';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  const [page, setPage] = useState(1);
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  useEffect(() => {
    dispatch(listProducts({page}));
    dispatch({type: PRODUCT_REVIEW_CREATE_FAIL_RESET});
  }, [dispatch, page]);

  return (
    <View style={styles.page}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <MessageBox variant="danger">
          <Text>{error}</Text>
        </MessageBox>
      ) : (
        <FlatList
          data={products?.results}
          renderItem={({item}) => <ProductItem item={item} />}
          keyExtractor={item => item.name}
          onRefresh={() => dispatch(listProducts({page}))}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default HomeScreen;
