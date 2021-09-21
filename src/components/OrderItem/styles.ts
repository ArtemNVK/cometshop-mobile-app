import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 15,
    padding: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 90,
    width: 90,
    marginRight: 10,
    resizeMode: 'contain',
  },
});

export default styles;
