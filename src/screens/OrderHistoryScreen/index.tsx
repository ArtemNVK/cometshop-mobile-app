/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {listOrderMine} from '../../actions/orderActions';
import MessageBox from '../../components/MessageBox';
import Spinner from '../../components/Spinner';

export default function OrderHistoryScreen() {
  const [page, setState] = useState(1);
  const orderMineList = useSelector(state => state.orderMineList);
  const {loading, error, orders} = orderMineList;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(listOrderMine(page, 1000));
  }, [dispatch, page]);

  return (
    <View style={styles.root}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <MessageBox variant="danger">
          <Text>{error}</Text>
        </MessageBox>
      ) : 
      orders && orders.results ? (
        <FlatList
          data={orders?.results}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.orderContainer,
                {
                  backgroundColor:
                    (index + 1) % 2 === 0 ? 'transparent' : 'white',
                },
              ]}>
              <View style={styles.row}>
                <Text>ID</Text>
                <Text>{item._id}</Text>
              </View>
              <View style={styles.row}>
                <Text>Date</Text>
                <Text>{item.createdAt.substring(0, 10)}</Text>
              </View>
              <View style={styles.row}>
                <Text>Total</Text>
                <Text>{item.totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.row}>
                <Text>Paid</Text>
                <Text>{item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</Text>
              </View>
              <View style={styles.row}>
                <Text>Delivered</Text>
                <Text>
                  {item.isDelivered ? item.deliveredAt.substring(0, 10) : 'No'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Actions</Text>
                <Pressable
                  style={styles.detailsBtn}
                  onPress={() =>
                    navigation.navigate('OrderDetails', {id: item._id})
                  }>
                  <Text
                    style={{
                      color: '#cb11ab',
                      fontSize: 15,
                      fontWeight: '700',
                      textTransform: 'uppercase',
                    }}>
                    Details
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          onRefresh={() => dispatch(listOrderMine(page, 1000))}
          refreshing={loading}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 250,
          }}>
          <Text style={{fontSize: 20, fontWeight: '400'}}>
            No orders yet.{' '}
            <Text
              style={{fontWeight: 'bold', color: '#cb11ab'}}
              onPress={() => navigation.navigate('HomeScreen')}>
              Go shopping
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  orderContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e4e4e4',
    borderStyle: 'solid',
  },
  detailsBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#cb11ab',
    width: 100,
    height: 40,
  },
});
