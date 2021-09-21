/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, TextInput, Pressable, Text, StyleSheet, Platform, FlatList, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {listProducts} from '../../actions/productActions';

const HeaderComponent = () => {
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(listProducts({}));
  }, []);

  const update = item => {
    navigation.navigate('ProductDetails', {id: item._id});
  };

  // TODO setDisplay false when hiding the keyboard

  const submitHandler = () => {
    navigation.navigate('search', {name: `${search}`});
    setDisplay(false);
  };

  const onChangeHandler = text => {
    setSearch(text);
    let matches;
    if (products) {
      if (products.results) {
        if (search.length >= 0) {
          matches = products.results.filter(item => {
            const regex = new RegExp(`${search}`, 'gi');
            return item.name.match(regex);
          });
          if (matches.length === 0) {
            setDisplay(false);
            return;
          }
        }
      }
    }
    setOptions(matches.splice(0, 10));

    if (text === '') {
      setDisplay(false);
      return;
    }
    setDisplay(true);
  };

  const clearSearchValue = () => {
    setDisplay(false);
    setSearch('');
  };

  return (
     <SafeAreaView style={{backgroundColor: display ? '#fff' : '#cb11ab'}}>
      <View
        style={{
          margin: 10,
          padding: 5,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: display ? 0.5 : 0,
          borderRadius: 20,
          opacity: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="search" size={20} />
          <TouchableOpacity activeOpacity={0.7}>
          <TextInput
            style={{height: 40, marginLeft: 10, color: 'black'}}
            placeholder="Search..."
            placeholderTextColor="#a3a3a3"
            value={search}
            onChangeText={text => onChangeHandler(text)}
          />
          </TouchableOpacity>
        </View>
        {search.length > 0 && (
          <Pressable onPress={clearSearchValue}>
            <Feather name="x-circle" size={20} />
          </Pressable>
        )}
      </View>

      {display &&
                  <View style={display && styles.autoContainer}>
                {options &&
                  <View>
                  {search.length > 0 &&

                  <FlatList
                    data={options}
                    renderItem={({item}) => (
                      <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => update(item)}
                      style={styles.option}
                      >
                      <Text style={{fontSize: 16, color: 'black', textAlign: 'left', width: '80%'}}>{
                          item?.name?.length < 50 ?
                              item?.name
                          :
                          item.name.substring(0, 50) + ' ...'
                      }</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => `${item.name}${Date.now()}`}
                    showsVerticalScrollIndicator={false}
                  />

                        }
                    </View>
                    }
                    </View>
                    }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  autoContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 100000,
    top: 0,
    lineHeight: 10,
    padding: 5,
    height: '90%',
    marginHorizontal: 10,
    overflow: 'hidden',
    elevation: 100000,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 0.2,
    borderStyle: 'solid',
    marginBottom: 5,
  }
});

export default HeaderComponent;

