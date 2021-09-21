import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  placeOrderContainer: {
    padding: 25,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 7,
    marginVertical: 10,
  },
  reviewsSectionContainer: {
    marginVertical: 40,
  },
  reviewsLabel: {
    marginVertical: 10,
  },
  reviewsTitle: {
    fontSize: 17, 
    fontWeight: '400', 
    textAlign: 'center', 
    marginBottom: 10,
  },
  comment: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  attributesContainer: {
    width: '100%',
  },
  dl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  dt: {
    color: '#8b8b8b',
    width: '50%',
  },
  dd: {
    width: '50%',
    alignItems: 'flex-end',
  },
  dtSpan: {
    paddingRight: 5,
    alignItems: 'flex-start',
  }
});

export default styles;