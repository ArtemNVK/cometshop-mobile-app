/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  listProductCategories,
  listSortedAndFilteredProducts,
} from '../../actions/productActions';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import Rating from '../../components/Rating';
import styles from './styles';
import ProductItem from '../../components/ProductItem';
import Button from '../../components/Button';

export default function SearchScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
  } = route?.params ?? {};
  const dispatch = useDispatch();
  const productSortedAndFiltered = useSelector(
    state => state.productSortedAndFiltered,
  );
  const {loading, error, products} = productSortedAndFiltered;
  const productCategoryList = useSelector(state => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  const [page, setPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const prices = [
    {
      name: 'Any',
      min: 0,
      max: 0,
    },
    {
      name: '$1 to $10',
      min: 1,
      max: 10,
    },
    {
      name: '$10 to $100',
      min: 10,
      max: 100,
    },
    {
      name: '$100 to $1000',
      min: 100,
      max: 1000,
    },
  ];
  const ratings = [
    {
      name: '4stars & up',
      rating: 4,
    },

    {
      name: '3stars & up',
      rating: 3,
    },

    {
      name: '2stars & up',
      rating: 2,
    },

    {
      name: '1stars & up',
      rating: 1,
    },
  ];

  useEffect(() => {
    dispatch(listProductCategories());
  }, []);

  useEffect(() => {
    dispatch(
      listSortedAndFilteredProducts({
        page,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      }),
    );
  }, [category, dispatch, max, min, name, order, rating, page]);

  const getFilterUrl = filter => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: isFiltersOpen ? '#fff' : 'transparent',
          marginHorizontal: 15,
        }}>
        <View
          style={
            isFiltersOpen ? {display: 'none'} : styles.filterBtnSortContainer
          }>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.filtersBtn}
            onPress={() => setIsFiltersOpen(true)}>
            <Feather name="filter" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Picker
              style={{width: 230}}
              selectedValue={order}
              onValueChange={itemValue =>
                navigation.navigate('Search', {order: itemValue})
              }>
              <Picker.Item
                style={{fontSize: 14.5}}
                label={'Newest Arrivals'}
                value={'newest'}
              />
              <Picker.Item
                style={{fontSize: 14.5}}
                label={'Price: Low to High'}
                value={'lowest'}
              />
              <Picker.Item
                style={{fontSize: 14.5}}
                label={'Price: High to Low'}
                value={'highest'}
              />
              <Picker.Item
                style={{fontSize: 14.5}}
                label={'Avg. Customer Reviews'}
                value={'toprated'}
              />
            </Picker>
          </View>
        </View>
        <View
          style={
            isFiltersOpen
              ? [styles.searchscreenFiltersContainerActive]
              : {display: 'none'}
          }>
          <View style={styles.searchscreenFilters}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.searchscreenFiltersClose}
              onPress={() => setIsFiltersOpen(false)}>
              <Text
                style={{
                  fontSize: 22,
                  textTransform: 'uppercase',
                  color: '#cb11ab',
                }}>
                Close
              </Text>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              Department
            </Text>
            <View>
              {categories && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate('Search', {category: 'all'})
                    }>
                    <Text
                      style={
                        category === 'all'
                          ? styles.selectedFilter
                          : {color: 'black'}
                      }>
                      All
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={categories}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{marginVertical: 3}}
                        onPress={() =>
                          navigation.navigate(
                            'Search',
                            category === item
                              ? {category: 'all'}
                              : {category: item},
                          )
                        }>
                        <Text
                          style={
                            item === category
                              ? styles.selectedFilter
                              : {color: 'black'}
                          }>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => `${item}${Date.now()}`}
                  />
                </>
              )}
            </View>

            <View>
              <Text style={{textAlign: 'center', marginVertical: 10}}>
                Price
              </Text>
              {prices.map(p => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{marginVertical: 3}}
                  onPress={() =>
                    navigation.navigate(
                      'Search',
                      `${p.min}-${p.max}` === `${min}-${max}`
                        ? {
                            min: '0',
                            max: '0',
                          }
                        : {
                            min: p.min,
                            max: p.max,
                          },
                    )
                  }>
                  <Text
                    style={
                      `${p.min}-${p.max}` === `${min}-${max}`
                        ? styles.selectedFilter
                        : {color: 'black'}
                    }>
                    {p.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View>
              <Text style={{textAlign: 'center', marginVertical: 10}}>
                Avg. Customer Review
              </Text>
              {ratings.map(r => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{marginVertical: 3}}
                  onPress={() =>
                    navigation.navigate(
                      'Search',
                      `${r.rating}` === `${rating}`
                        ? {rating: '0'}
                        : {rating: r.rating},
                    )
                  }>
                  <Rating
                    style={
                      `${r.rating}` === `${rating}` && styles.selectedFilter
                    }
                    caption={' & up'}
                    rating={r.rating}
                    isSelected={`${r.rating}` === `${rating}`}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Button
              text="Close"
              onPress={() => setIsFiltersOpen(false)}
              containerStyles={{marginTop: 20}}
            />
          </View>
        </View>

        {products && products.results && (
          <FlatList
            style={isFiltersOpen ? {display: 'none'} : {display: 'flex'}}
            data={products.results}
            renderItem={({item}) => <ProductItem item={item} />}
            keyExtractor={item => item._id}
          />
        )}
      </ScrollView>
    </>
  );
}
