/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ImageCarousel = ({images}: {images: string[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation();

  const onFlatlistUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);

  const showImage = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <>
            <TouchableOpacity onPress={() => showImage()} activeOpacity={0.7}>
              <Image
                style={[styles.image, {width: windowWidth - 40}]}
                source={{uri: item}}
              />
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              transparent={false}
              onRequestClose={() => setModalVisible(!modalVisible)}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{padding: 25}}>
                  <AntDesign name="close" size={30} color="black" />
                </TouchableOpacity>
                <Image
                  style={[
                    styles.image,
                    {
                      width: windowWidth - 40,
                      alignSelf: 'center',
                      marginBottom: '70%',
                    },
                  ]}
                  source={{uri: item}}
                />
              </View>
            </Modal>
          </>
        )}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
      />

      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            key={image + index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 10,
    height: 250,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
    margin: 5,
  },
});

export default ImageCarousel;
