import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Rating from '../Rating';

interface ProductItemProps {
  item: {
    _id: string;
    name: string;
    countInStock: number;
    category: string;
    brand: string;
    image: string;
    previewImgs?: string[];
    rating: number;
    numReviews: number;
    price: number;
    oldPrice?: number;
    description: string;
    reviews?: {
      _id: string;
      name: string;
      rating: number;
      comment: string;
    }[];
  };
}

const ProductItem = ({item}: ProductItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ProductDetails', {id: item._id});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={`${item.name}${Date.now()}`}
      onPress={onPress}
      style={styles.root}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {item.name}
        </Text>
        <View style={styles.ratingsContainer}>
          <Rating rating={item.rating} numReviews={item.numReviews} />
        </View>
        <Text style={styles.price}>
          ${item.price.toFixed(2)}
          {item.oldPrice && (
            <Text style={styles.oldPrice}> ${item.oldPrice.toFixed(2)}</Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
